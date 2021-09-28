package io.github.nicolasdesnoust.xyzingenierie.user.services;

import org.mapstruct.Builder;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import io.github.nicolasdesnoust.xyzingenierie.user.api.UserDto;
import io.github.nicolasdesnoust.xyzingenierie.user.model.User;

@Mapper( //
		componentModel = "spring", //
		uses = { RoleMapper.class }, //
		injectionStrategy = InjectionStrategy.CONSTRUCTOR, //
		builder = @Builder(disableBuilder = true) //
)
public interface UserMapper {

	UserDto toDto(User user);

	User toDomain(UserDto userDto);
}