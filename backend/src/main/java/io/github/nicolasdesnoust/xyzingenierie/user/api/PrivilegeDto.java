package io.github.nicolasdesnoust.xyzingenierie.user.api;

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
@Schema(name = "Privilege")
public class PrivilegeDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull
	@Schema(description = "Identifiant unique du privilège.", example = "1", required = true)
	private Long id;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Code unique du privilège.", example = "ROLE_CREATE_USERS", required = true)
	private String code;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Nom du privilège.", example = "Création d'utilisateurs", required = true)
	private String name;
}