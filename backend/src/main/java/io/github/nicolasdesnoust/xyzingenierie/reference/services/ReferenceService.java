package io.github.nicolasdesnoust.xyzingenierie.reference.services;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import io.github.nicolasdesnoust.xyzingenierie.core.errorhandling.EntityNotFoundException;
import io.github.nicolasdesnoust.xyzingenierie.reference.model.Reference;
import io.github.nicolasdesnoust.xyzingenierie.reference.repositories.ReferenceRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReferenceService {

	private final ReferenceRepository referenceRepository;

	public Page<Reference> findAll(Pageable pageable) {
		return referenceRepository.findAll(pageable);
	}

	public Reference findById(Long id) {
		return referenceRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(Reference.class, Map.of("id", id)));
	}

	public Reference save(Reference newReference) {
		return referenceRepository.findById(newReference.getId())
				.map(reference -> {
					reference.setName(newReference.getName());
					reference.setClientName(newReference.getClientName());
					reference.setCity(newReference.getCity());
					reference.setDepartment(newReference.getDepartment());
					reference.setBenefitAmount(newReference.getBenefitAmount());
					reference.setBenefitDetails(newReference.getBenefitDetails());
					reference.setDomains(newReference.getDomains());
					reference.setImageUrl(newReference.getImageUrl());
					reference.setStartYear(newReference.getStartYear());
					reference.setEndYear(newReference.getEndYear());
					return referenceRepository.save(reference);
				})
				.orElseGet(() -> referenceRepository.save(newReference));
	}

	public void deleteById(Long id) {
		referenceRepository.deleteById(id);
	}
}
