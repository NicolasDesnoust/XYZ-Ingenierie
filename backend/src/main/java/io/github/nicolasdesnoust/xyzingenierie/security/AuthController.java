package io.github.nicolasdesnoust.xyzingenierie.security;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/auth", produces = "application/json")
public class AuthController implements AuthControllerSpecification {
	@GetMapping("/user")
	public Principal user(Principal user) {
		return user;
	}
}
