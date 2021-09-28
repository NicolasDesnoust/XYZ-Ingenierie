package io.github.nicolasdesnoust.xyzingenierie.reference.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.nicolasdesnoust.xyzingenierie.reference.model.Domain;

@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {

}
