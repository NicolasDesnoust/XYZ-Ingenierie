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
@Schema(name = "Role")
public class RoleDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull
	@Schema(description = "Identifiant unique du rôle.", example = "1", required = true)
	private Long id;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Code unique du rôle.", example = "ROLE_ADMIN", required = true)
	private String code;

	@NotNull
	@Size(min = 3, max = 255)
	@Schema(description = "Nom du rôle.", example = "Administrateur", required = true)
	private String name;
	
	@NotNull @NotEmpty
	private List<PrivilegeDto> privileges;
}
