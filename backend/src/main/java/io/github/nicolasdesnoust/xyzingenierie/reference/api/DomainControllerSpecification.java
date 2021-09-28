package io.github.nicolasdesnoust.xyzingenierie.reference.api;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Domain management")
public interface DomainControllerSpecification {

	@Operation( //
			summary = "Récupère un ensemble de domaines", //
			description = "Permet la pagination et le tri.", //
			tags = { "domains" } //
	)
	@ApiResponse( //
			responseCode = "200", //
			headers = { //
					@Header(name = "X-Total-Count", description = "Nombre total de domaines") //
			} //
	)
	ResponseEntity<List<DomainDto>> findAll(Pageable pageable);

}
