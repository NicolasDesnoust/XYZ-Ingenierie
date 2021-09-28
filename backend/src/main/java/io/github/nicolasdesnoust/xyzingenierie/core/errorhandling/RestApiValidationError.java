package io.github.nicolasdesnoust.xyzingenierie.core.errorhandling;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
public class RestApiValidationError extends RestApiSubError {

	@Schema(description = "Objet invalide.", example = "Reference", required = true)
	private String object;
	@Schema(description = "Propriété invalide de l'objet.", example = "name", required = true)
	private String field;
	@Schema(description = "Valeur de la propriété invalide.", example = "As", required = true)
	private Object rejectedValue;
	@Schema(description = "Message expliquant pourquoi la valeur de la propriété est considérée invalide.", example = "Le champ 'name' ne peut être inférieur à 3 caractères.", required = true)
	private String message;

	RestApiValidationError(String object, String message) {
		this.object = object;
		this.message = message;
	}
}
