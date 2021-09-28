package io.github.nicolasdesnoust.xyzingenierie.user.api;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "User management")
public interface UserControllerSpecification {

	@Operation( //
			summary = "Recherche un utilisateur par id", //
			description = "", //
			tags = { "users" } //
	)
	ResponseEntity<UserDto> findById(Long id);

	@Operation( //
			summary = "Supprime un utilisateur par id", //
			description = "", //
			tags = { "users" } //
	)
	ResponseEntity<Void> deleteById(Long id);

	@Operation( //
			summary = "Récupère un ensemble d'utilisateurs", //
			description = "Permet la pagination et le tri.", //
			tags = { "users" } //
	)
	@ApiResponse( //
			responseCode = "200", //
			headers = { //
					@Header(name = "X-Total-Count", description = "Nombre total d'utilisateurs") //
			} //
	)
	ResponseEntity<List<UserDto>> findAll(Pageable pageable);

	@Operation( //
			summary = "Sauvegarde un utilisateur par id", //
			description = "", //
			tags = { "users" } //
	)
	ResponseEntity<UserDto> save(UserDto userDto, Long id);

}
