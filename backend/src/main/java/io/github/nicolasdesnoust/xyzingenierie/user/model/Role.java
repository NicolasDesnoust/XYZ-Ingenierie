package io.github.nicolasdesnoust.xyzingenierie.user.model;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Role implements GrantedAuthority {

	private static final long serialVersionUID = 1L;
	private static final String ROLE_PREFIX = "ROLE_";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@EqualsAndHashCode.Include
	@Column(length = 128, nullable = false)
	private String code;

	@Column(length = 255, nullable = false)
	private String name;

	@ManyToMany
	@JoinTable( //
			name = "role_privileges", //
			joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"), //
			inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id") //
	)
	private Collection<Privilege> privileges;

	@Override
	public String getAuthority() {
		return name.startsWith(ROLE_PREFIX) ? code : ROLE_PREFIX.concat(code);
	}
}
