package io.github.nicolasdesnoust.xyzingenierie.reference.services;

import org.mapstruct.Builder;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import io.github.nicolasdesnoust.xyzingenierie.reference.api.ReferenceDto;
import io.github.nicolasdesnoust.xyzingenierie.reference.model.Reference;

@Mapper( //
		componentModel = "spring", //
		uses = { DomainMapper.class }, //
		injectionStrategy = InjectionStrategy.CONSTRUCTOR, //
		builder = @Builder(disableBuilder = true) //
)
public interface ReferenceMapper {

	public ReferenceDto toDto(Reference reference);

	public Reference toDomain(ReferenceDto referenceDTO);
}