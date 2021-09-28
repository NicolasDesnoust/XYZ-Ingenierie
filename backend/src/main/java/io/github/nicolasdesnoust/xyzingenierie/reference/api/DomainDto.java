package io.github.nicolasdesnoust.xyzingenierie.reference.api;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
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
@Schema(name = "Domain")
public class DomainDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull
	@Schema(description = "Identifiant unique du domaine.", example = "1", required = true)
	private Long id;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Code unique du domaine.", example = "building", required = true)
	private String code;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Nom du domaine.", example = "Bâtiment", required = true)
	private String name;
}
