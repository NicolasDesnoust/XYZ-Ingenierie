package io.github.nicolasdesnoust.xyzingenierie.reference.api;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Reference management")
public interface ReferenceControllerSpecification {

	@Operation( //
			summary = "Recherche une référence par id", //
			description = "", //
			tags = { "references" } //
	)
	ResponseEntity<ReferenceDto> findById(Long id);

	@Operation( //
			summary = "Supprime une référence par id", //
			description = "", //
			tags = { "references" } //
	)
	ResponseEntity<Void> deleteById(Long id);

	@Operation( //
			summary = "Récupère un ensemble de réferences", //
			description = "Permet la pagination et le tri.", //
			tags = { "references" } //
	)
	@ApiResponse( //
			responseCode = "200", //
			headers = { //
					@Header(name = "X-Total-Count", description = "Nombre total de références") //
			} //
	)
	ResponseEntity<List<ReferenceDto>> findAll(Pageable pageable);

	@Operation( //
			summary = "Sauvegarde une réference par id", //
			description = "", //
			tags = { "references" } //
	)
	ResponseEntity<ReferenceDto> save(ReferenceDto referenceDto, Long id);

}
