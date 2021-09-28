package io.github.nicolasdesnoust.xyzingenierie.reference.services;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.nicolasdesnoust.xyzingenierie.reference.model.Domain;
import io.github.nicolasdesnoust.xyzingenierie.reference.repositories.DomainRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DomainService {

	private final DomainRepository domainRepository;

	public Page<Domain> findAll(Pageable pageable) {
		return domainRepository.findAll(pageable);
	}

}
