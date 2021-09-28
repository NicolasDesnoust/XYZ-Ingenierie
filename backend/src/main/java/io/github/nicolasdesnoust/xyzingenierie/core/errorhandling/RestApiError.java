package io.github.nicolasdesnoust.xyzingenierie.core.errorhandling;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * <p>
 * Cette classe représente le format uniforme de toutes les réponses assimilées
 * à des erreurs ou bugs envoyées par l'API.
 * </p>
 * <p>
 * Le format de réponse est assez similaire à la norme
 * <a href="https://tools.ietf.org/html/rfc7807" target="_top">RFC7807</a>. Le
 * type a été retiré et un timestamp a été ajouté.
 * </p>
 * 
 * @author Nicolas DESNOUST
 */
@Data
public class RestApiError {

	/**
	 * La date exacte à laquelle l'erreur / le bug est survenu(e).
	 * 
	 * @return la valeur courante de la date exacte à laquelle l'erreur / le bug est
	 *         survenu(e).
	 */
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	@Schema(description = "Date à laquelle l'erreur est survenue.", example = "2021-07-09 13:16:52", required = true)
	private final LocalDateTime timestamp;
	/**
	 * Le titre traduit de l'erreur / du bug.
	 * 
	 * @param titre la nouvelle valeur du titre de l'erreur / du bug.
	 * @return la valeur courante du titre de l'erreur / du bug.
	 */
	@Schema(description = "Titre de l'erreur (traduit).", example = "Un titre décrivant l'erreur manière sommaire", required = true)
	private String title;
	/**
	 * Les détails de l'erreur / du bug.
	 * 
	 * @param detail la nouvelle valeur des détails de l'erreur / du bug.
	 * @return la valeur courante des détails de l'erreur / du bug.
	 */
	@Schema(description = "Détails de l'erreur (en anglais uniquement).", example = "Error details giving more informations than the title.", required = false)
	private String detail;
	/**
	 * Le statut sous forme de code de l'erreur / du bug.
	 * 
	 * @param detail la nouvelle valeur du statut de l'erreur / du bug.
	 * @return la valeur courante du statut de l'erreur / du bug.
	 */
	@Schema(description = "Statut HTTP de l'erreur.", example = "500", required = true)
	private int status;
	/**
	 * Le chemin ayant déclenché l'erreur / le bug.
	 * 
	 * @param detail la nouvelle valeur du chemin ayant déclenché l'erreur / le bug.
	 * @return la valeur courante du chemin ayant déclenché l'erreur / le bug.
	 */
	@Schema(description = "URI à partir de laquelle l'erreur est survenue.", example = "http://localhost:8080/api/references/atos-gcv", required = true)
	private String path;

	@JsonInclude(Include.NON_NULL)
	@Schema(implementation = RestApiValidationError.class)
	private List<RestApiSubError> subErrors;

	/**
	 * Construit une réponse sur une erreur ou un bug de l'API.
	 * 
	 * @param status le statut de l'erreur / du bug.
	 * @param title  le titre traduit de l'erreur / du bug.
	 * @param detail le détail de l'erreur / du bug.
	 * @param path   le chemin ayant déclenché l'erreur / le bug.
	 */
	public RestApiError(HttpStatus status, String title, String detail, String path) {
		this.timestamp = LocalDateTime.now();
		this.title = title;
		this.status = status.value();
		this.detail = detail;
		this.path = path;
	}

	public RestApiError(HttpStatus status, String title, String detail, String path, List<RestApiSubError> subErrors) {
		this(status, title, detail, path);
		this.subErrors = subErrors;
	}
}
