package io.github.nicolasdesnoust.xyzingenierie.security;

import java.security.Principal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Authentification")
public interface AuthControllerSpecification {

	@Operation( //
			summary = "Récupère l'utilisateur actuellement authentifié", //
			description = "Permet également à un utilisateur de s'authentifier s'il fournit ses identifiants en en-tête.", //
			tags = { "authentification" } //
	)
	public Principal user(Principal user);

}