package io.github.nicolasdesnoust.xyzingenierie.user.api;

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

import io.github.nicolasdesnoust.xyzingenierie.user.model.User;
import io.github.nicolasdesnoust.xyzingenierie.user.services.UserMapper;
import io.github.nicolasdesnoust.xyzingenierie.user.services.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/users", produces = "application/json")
public class UserController implements UserControllerSpecification {

	private final UserService userService;
	private final UserMapper userMapper;

	@Override
	@GetMapping
	@PageableAsQueryParam
    @PreAuthorize("hasRole('READ_USERS')")
	public ResponseEntity<List<UserDto>> findAll(@Parameter(hidden = true) Pageable pageable) {
		Page<UserDto> userPage = userService.findAll(pageable)
				.map(userMapper::toDto);

		return ResponseEntity.ok()
				.header("X-Total-Count", String.valueOf(userPage.getTotalElements()))
				.body(userPage.getContent());
	}

	@Override
	@GetMapping("{id}")
	@PreAuthorize("hasRole('READ_USERS')")
	public ResponseEntity<UserDto> findById(@PathVariable Long id) {
		UserDto user = userMapper.toDto(userService.findById(id));
		return ResponseEntity.ok(user);
	}

	@Override
	@DeleteMapping("{id}")
	@PreAuthorize("hasRole('DELETE_USERS')")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		userService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@Override
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('CREATE_USERS')")
	public ResponseEntity<UserDto> save(@RequestBody @Valid UserDto userDto, @PathVariable Long id) {
		userDto.setId(id);
		User savedUser = userService.save(userMapper.toDomain(userDto));

		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(savedUser.getId())
				.toUri();

		UserDto savedUserDTO = userMapper.toDto(savedUser);
		return ResponseEntity.created(location).body(savedUserDTO);
	}
}
