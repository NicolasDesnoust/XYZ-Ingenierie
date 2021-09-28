package io.github.nicolasdesnoust.xyzingenierie.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "privileges")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Privilege implements GrantedAuthority {

	private static final long serialVersionUID = 1L;
	/**
	 * Spring ne supporte que la notion de "rôle", et ils doivent être préfixés par
	 * "ROLE_". Ici, nos privilèges sont considérés comme des rôles par Spring.
	 */
	private static final String PRIVILEGE_PREFIX = "ROLE_";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@EqualsAndHashCode.Include
	@Column(length = 128, nullable = false)
	private String code;

	@Column(length = 255, nullable = false)
	private String name;

	@Override
	public String getAuthority() {
		return name.startsWith(PRIVILEGE_PREFIX) ? code : PRIVILEGE_PREFIX.concat(code);
	}
}
