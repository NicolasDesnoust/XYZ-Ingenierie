package io.github.nicolasdesnoust.xyzingenierie.user.api;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Role management")
public interface RoleControllerSpecification {

	@Operation( //
			summary = "Récupère un ensemble de rôles", //
			description = "Permet la pagination et le tri.", //
			tags = { "roles" } //
	)
	@ApiResponse( //
			responseCode = "200", //
			headers = { //
					@Header(name = "X-Total-Count", description = "Nombre total de rôles") //
			} //
	)
	ResponseEntity<List<RoleDto>> findAll(Pageable pageable);

}
