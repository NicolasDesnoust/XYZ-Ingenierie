package io.github.nicolasdesnoust.xyzingenierie.user.services;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.nicolasdesnoust.xyzingenierie.core.errorhandling.EntityNotFoundException;
import io.github.nicolasdesnoust.xyzingenierie.user.model.User;
import io.github.nicolasdesnoust.xyzingenierie.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private static final String EMAIL_ALREADY_EXISTS = "There is already an account with that email adress: %s";
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	public User registerNewUserAccount(User account) throws EmailAlreadyExistsException {
		if (userRepository.existsByEmail(account.getEmail())) {
			throw new EmailAlreadyExistsException(
					String.format(EMAIL_ALREADY_EXISTS, account.getEmail()));
		}
		encodePassword(account);

		return userRepository.save(account);
	}

	private void encodePassword(User account) {
		account.setPassword(passwordEncoder.encode(account.getPassword()));
	}

	public Page<User> findAll(Pageable pageable) {
		return userRepository.findAll(pageable);
	}

	public User findById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(User.class, Map.of("id", id)));
	}

	public User save(User newUser) {
		return userRepository.findById(newUser.getId())
				.map(user -> {
					user.setFirstname(newUser.getFirstname());
					user.setLastname(newUser.getLastname());
					user.setEmail(newUser.getEmail());
					return userRepository.save(user);
				})
				.orElseGet(() -> userRepository.save(newUser));
	}

	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	public static class EmailAlreadyExistsException extends Exception {
		private static final long serialVersionUID = 1L;

		public EmailAlreadyExistsException(final String message) {
			super(message);
		}
	}

}
