package io.github.nicolasdesnoust.xyzingenierie.reference.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.nicolasdesnoust.xyzingenierie.reference.model.Reference;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference, Long> {
}
