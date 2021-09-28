package io.github.nicolasdesnoust.xyzingenierie.user.api;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;
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
@Schema(name = "User")
public class UserDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull
	@Schema(description = "Identifiant unique de l'utilisateur.", example = "1", required = true)
	private Long id;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "E-mail de l'utilisateur.", example = "desnoust.nicolas451@gmail.com", required = true)
	private String email;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Prénom de l'utilisateur.", example = "Nicolas", required = true)
	private String firstname;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Nom de l'utilisateur.", example = "Desnoust", required = true)
	private String lastname;

	@NotNull
	@NotEmpty
	private List<RoleDto> roles;

}
