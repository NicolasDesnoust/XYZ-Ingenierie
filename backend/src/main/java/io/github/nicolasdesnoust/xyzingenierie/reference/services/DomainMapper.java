package io.github.nicolasdesnoust.xyzingenierie.reference.services;

import org.mapstruct.Builder;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import io.github.nicolasdesnoust.xyzingenierie.reference.api.DomainDto;
import io.github.nicolasdesnoust.xyzingenierie.reference.model.Domain;

@Mapper( //
		componentModel = "spring", //
		injectionStrategy = InjectionStrategy.CONSTRUCTOR, //
		builder = @Builder(disableBuilder = true) //
)
public interface DomainMapper {

	public DomainDto toDto(Domain domain);

	public Domain toDomain(DomainDto domainDTO);
}