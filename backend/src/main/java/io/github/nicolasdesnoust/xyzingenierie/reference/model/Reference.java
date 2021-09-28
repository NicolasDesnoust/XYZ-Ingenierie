package io.github.nicolasdesnoust.xyzingenierie.reference.model;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder(toBuilder = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "references")
public class Reference implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String clientName;
	private String city;
	private String department;
	private int startYear;
	private int endYear;
	private double benefitAmount;
	private String benefitDetails;
	private String imageUrl;

	@ManyToMany
	@JoinTable( //
			name = "reference_domains", //
			joinColumns = @JoinColumn(name = "reference_id"), //
			inverseJoinColumns = @JoinColumn(name = "domain_id") //
	)
	private Collection<Domain> domains;

}
