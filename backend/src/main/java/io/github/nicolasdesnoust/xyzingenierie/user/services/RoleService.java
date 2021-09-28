package io.github.nicolasdesnoust.xyzingenierie.user.services;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.nicolasdesnoust.xyzingenierie.user.model.Role;
import io.github.nicolasdesnoust.xyzingenierie.user.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleService {

	private final RoleRepository roleRepository;

	public Page<Role> findAll(Pageable pageable) {
		return roleRepository.findAll(pageable);
	}

}
