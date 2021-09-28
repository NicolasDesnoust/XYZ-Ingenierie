package io.github.nicolasdesnoust.xyzingenierie.reference.api;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.github.nicolasdesnoust.xyzingenierie.reference.model.Reference;
import io.github.nicolasdesnoust.xyzingenierie.reference.services.ReferenceMapper;
import io.github.nicolasdesnoust.xyzingenierie.reference.services.ReferenceService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/references", produces = "application/json")
public class ReferenceController implements ReferenceControllerSpecification {

	private final ReferenceService referenceService;
	private final ReferenceMapper referenceMapper;

	@Override
	@GetMapping(consumes = "application/json", produces = "application/json")
	@PageableAsQueryParam
	@PreAuthorize("hasRole('READ_REFERENCES')")
	public ResponseEntity<List<ReferenceDto>> findAll(
			@Parameter(hidden = true)
			Pageable pageable) {
		Page<ReferenceDto> referencePage = referenceService.findAll(pageable)
				.map(referenceMapper::toDto);

		return ResponseEntity.ok()
				.header("X-Total-Count", String.valueOf(referencePage.getTotalElements()))
				.body(referencePage.getContent());
	}

	@Override
	@GetMapping("{id}")
	@PreAuthorize("hasRole('READ_REFERENCES')")
	public ResponseEntity<ReferenceDto> findById(@PathVariable
	Long id) {
		ReferenceDto reference = referenceMapper.toDto(referenceService.findById(id));
		return ResponseEntity.ok(reference);
	}

	@Override
	@DeleteMapping("{id}")
	@PreAuthorize("hasRole('DELETE_REFERENCES')")
	public ResponseEntity<Void> deleteById(@PathVariable
	Long id) {
		log.info("Deleting reference {}", id);
		referenceService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@Override
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('CREATE_REFERENCES')")
	public ResponseEntity<ReferenceDto> save(@RequestBody
	@Valid
	ReferenceDto referenceDto, @PathVariable
	Long id) {
		referenceDto.setId(id);
		Reference savedReference = referenceService.save(referenceMapper.toDomain(referenceDto));

		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(savedReference.getId())
				.toUri();

		ReferenceDto savedReferenceDTO = referenceMapper.toDto(savedReference);
		return ResponseEntity.created(location).body(savedReferenceDTO);
	}
}
