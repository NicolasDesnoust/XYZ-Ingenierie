package io.github.nicolasdesnoust.xyzingenierie.reference.api;

import java.util.List;

import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.nicolasdesnoust.xyzingenierie.reference.services.DomainMapper;
import io.github.nicolasdesnoust.xyzingenierie.reference.services.DomainService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/domains", produces = "application/json")
public class DomainController implements DomainControllerSpecification {

	private final DomainService domainService;
	private final DomainMapper domainMapper;

	@Override
	@GetMapping(consumes = "application/json", produces = "application/json")
	@PageableAsQueryParam
	@PreAuthorize("hasRole('READ_REFERENCES')")
	public ResponseEntity<List<DomainDto>> findAll(
			@Parameter(hidden = true)
			Pageable pageable) {
		Page<DomainDto> domainPage = domainService.findAll(pageable)
				.map(domainMapper::toDto);

		return ResponseEntity.ok()
				.header("X-Total-Count", String.valueOf(domainPage.getTotalElements()))
				.body(domainPage.getContent());
	}

}
