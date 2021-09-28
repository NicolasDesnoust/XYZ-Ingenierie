package io.github.nicolasdesnoust.xyzingenierie.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.nicolasdesnoust.xyzingenierie.user.model.Privilege;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
	Optional<Privilege> findByCode(String code);
}
