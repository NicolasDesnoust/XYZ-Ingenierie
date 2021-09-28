package io.github.nicolasdesnoust.xyzingenierie.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.nicolasdesnoust.xyzingenierie.user.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByCode(String code);
}
