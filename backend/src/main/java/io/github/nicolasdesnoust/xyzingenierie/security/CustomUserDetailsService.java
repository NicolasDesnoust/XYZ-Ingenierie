package io.github.nicolasdesnoust.xyzingenierie.security;

import java.util.ArrayList;
import java.util.Collection;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.github.nicolasdesnoust.xyzingenierie.user.model.Role;
import io.github.nicolasdesnoust.xyzingenierie.user.model.User;
import io.github.nicolasdesnoust.xyzingenierie.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(email));

		Collection<Role> roles = user.getRoles();

		Collection<GrantedAuthority> authorities = new ArrayList<>();
		roles.forEach(role -> CollectionUtils.addAll(authorities, role.getPrivileges()));
		CollectionUtils.addAll(authorities, roles);

		log.info("{}", authorities);
		return new CustomUserPrincipal(user, authorities);
	}

}