package io.github.nicolasdesnoust.xyzingenierie.user.api;

import java.util.List;

import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.nicolasdesnoust.xyzingenierie.user.services.RoleMapper;
import io.github.nicolasdesnoust.xyzingenierie.user.services.RoleService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/roles", produces = "application/json")
public class RoleController implements RoleControllerSpecification {

	private final RoleService roleService;
	private final RoleMapper roleMapper;

	@Override
	@GetMapping
	@PageableAsQueryParam
	@PreAuthorize("hasRole('READ_USERS')")
	public ResponseEntity<List<RoleDto>> findAll(@Parameter(hidden = true) Pageable pageable) {
		Page<RoleDto> rolePage = roleService.findAll(pageable)
				.map(roleMapper::toDto);

		return ResponseEntity.ok()
				.header("X-Total-Count", String.valueOf(rolePage.getTotalElements()))
				.body(rolePage.getContent());
	}
}
