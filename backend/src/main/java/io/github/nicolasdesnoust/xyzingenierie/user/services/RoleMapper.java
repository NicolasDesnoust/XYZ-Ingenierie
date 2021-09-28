package io.github.nicolasdesnoust.xyzingenierie.user.services;

import org.mapstruct.Builder;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import io.github.nicolasdesnoust.xyzingenierie.user.api.RoleDto;
import io.github.nicolasdesnoust.xyzingenierie.user.model.Role;

@Mapper( //
		componentModel = "spring", //
		injectionStrategy = InjectionStrategy.CONSTRUCTOR, //
		builder = @Builder(disableBuilder = true) //
)
public interface RoleMapper {

	public RoleDto toDto(Role role);

	public Role toRole(RoleDto roleDTO);
}