package io.github.nicolasdesnoust.xyzingenierie;

import java.util.Collections;

import javax.transaction.Transactional;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import io.github.nicolasdesnoust.xyzingenierie.user.model.Role;
import io.github.nicolasdesnoust.xyzingenierie.user.model.User;
import io.github.nicolasdesnoust.xyzingenierie.user.repositories.RoleRepository;
import io.github.nicolasdesnoust.xyzingenierie.user.repositories.UserRepository;
import io.github.nicolasdesnoust.xyzingenierie.user.services.UserService;
import io.github.nicolasdesnoust.xyzingenierie.user.services.UserService.EmailAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultAdminCreator implements ApplicationListener<ContextRefreshedEvent> {

	private static final String ADMIN_ROLE_CODE = "ADMIN";
	private static final String EMPLOYEE_ROLE_CODE = "EMPLOYEE";
	private static final String MANAGER_ROLE_CODE = "MANAGER";

	private final UserRepository userRepository;
	private final UserService userService;
	private final RoleRepository roleRepository;

	@Override
	@Transactional
	public void onApplicationEvent(ContextRefreshedEvent event) {
		if (userRepository.count() == 0) {
			persistDefaultAdministrator();
			persistDefaultManager();
			persistDefaultEmployee();
		}
	}

	private void persistDefaultAdministrator() {
		Role adminRole = roleRepository.findByCode(ADMIN_ROLE_CODE)
				.orElseThrow(() -> new RuntimeException(
						"Cannot create default administrator: no role found with code '" + ADMIN_ROLE_CODE + "'"));

		User admin = User.builder()
				.email("admin@xyz-ingenierie.fr")
				.firstname("admin")
				.lastname("admin")
				.password("password")
				.roles(Collections.singletonList(adminRole))
				.build();

		try {
			userService.registerNewUserAccount(admin);
		} catch (EmailAlreadyExistsException e) {
			log.warn(e.getMessage());
		}
	}

	private void persistDefaultManager() {
	}

	private void persistDefaultEmployee() {
	}
}
