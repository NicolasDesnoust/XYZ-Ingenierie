package io.github.nicolasdesnoust.xyzingenierie.reference.api;

import java.io.Serializable;
import java.util.Collection;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Reference")
public class ReferenceDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull
	@Schema(description = "Identifiant unique de la référence.", example = "1", required = true)
	private Long id;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Nom de la référence.", example = "Gestion de Curriculum Vitae", required = true)
	private String name;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Nom du client", example = "ATOS", required = true)
	private String clientName;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Ville dans laquelle la référence a eu lieu.", example = "Marseille", required = true)
	private String city;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Département dans lequel la référence a eu lieu.", example = "Bouches-du-Rhône (13)", required = true)
	private String department;

	@Min(1900)
	@Max(3000)
	@Schema(description = "Année de début de la référence.", example = "2019", required = true)
	private int startYear;
	
	@Min(1900)
	@Max(3000)
	@Schema(description = "Année de fin de la référence.", example = "2020", required = true)
	private int endYear;
	
	@Positive
	@Schema(description = "Motant des prestations de la référence.", example = "60000", required = true)
	private double benefitAmount;
	
	@NotNull
	@Size(min = 10, max = 5000)
	@Schema(description = "Détails des prestations de la référence", example = "...", required = true)
	private String benefitDetails;
	
	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "URL de l'image représentative de la référence", example = "https://www.url-factice.com", required = true)
	private String imageUrl;
	
	@NotEmpty
	@Valid
	@Schema(description = "Domains de la référence", required = true)
	private Collection<DomainDto> domains;

}
