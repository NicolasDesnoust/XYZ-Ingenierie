package io.github.nicolasdesnoust.xyzingenierie.core.errorhandling;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;

/**
 * <p>
 * Exception renvoyée lorsqu'une entité désirée par un client de l'API n'a pas
 * été trouvée.
 * </p>
 * <p>
 * Le message de l'exception contient les paramètres de la requête n'ayant pas
 * abouti.
 * </p>
 * 
 * @author Nicolas DESNOUST
 *
 */
public class EntityNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	/**
	 * Construit une exception renvoyée lorsqu'une entité désirée par un client de
	 * l'API n'a pas été trouvée.
	 * 
	 * @param <T>          le type de l'entité recherchée.
	 * @param clazz        la classe de l'entité recherchée.
	 * @param searchParams les paramètres de la requête n'ayant pas abouti.
	 */
	public <T> EntityNotFoundException(Class<T> clazz, Map<String, Object> searchParams) {
		super(generateMessage(clazz.getSimpleName(), searchParams));
	}

	/**
	 * Fonction utilitaire permettant de construire le message de l'exception à
	 * partir du type de l'entité recherchée et des paramètres de la requête.
	 * 
	 * @param entity       le type de l'entité recherchée.
	 * @param searchParams les paramètres de la requête n'ayant pas abouti.
	 * @return le message de l'exception.
	 */
	private static String generateMessage(String entity, Map<String, Object> searchParams) {
		return StringUtils.capitalize(entity) + " was not found for parameters " + searchParams + ".";
	}
}
