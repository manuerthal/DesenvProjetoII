package com.api.tenteAdivinharcontrol.services;

import com.api.tenteAdivinharcontrol.models.tenteAdivinharModel;
import com.api.tenteAdivinharcontrol.repositories.tenteAdivinharRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/*Meio termo entre o controller e o repository, onde são aplicados as regras*/
@Service
public class tenteAdivinharService {

    final tenteAdivinharRepository tenteAdivinharRepository;

    public tenteAdivinharService(tenteAdivinharRepository tenteAdivinharRepository) {
        this.tenteAdivinharRepository = tenteAdivinharRepository;
    }

    @Transactional
    public tenteAdivinharModel save(tenteAdivinharModel tenteAdivinharModel) {
        return tenteAdivinharRepository.save(tenteAdivinharModel);
    }

    public boolean existsByusername(String username){
        return tenteAdivinharRepository.existsByusername(username);
    }

    public Page<tenteAdivinharModel> findAll(Pageable pageable){
        return  tenteAdivinharRepository.findAll(pageable);
    }

    public Optional<tenteAdivinharModel> findById(UUID id){
        return tenteAdivinharRepository.findById(id);
    }

    public Optional<tenteAdivinharModel> findByUsername(UUID id){
        return tenteAdivinharRepository.findById(id);
    }

    @Transactional
    public void delete(tenteAdivinharModel tenteAdivinharModel) {
        tenteAdivinharRepository.delete(tenteAdivinharModel);
    }

    public Optional<tenteAdivinharModel> findByEmail(String email){
        return tenteAdivinharRepository.findByEmail(email);
    }
}