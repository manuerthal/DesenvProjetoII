package com.api.tenteAdivinharcontrol.repositories;

import com.api.tenteAdivinharcontrol.models.tenteAdivinharModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/*funções de contato com banco de dados, neste caso usamos o JPA repository, que é modelo
com algumas funções ja prontas */
@Repository
public interface tenteAdivinharRepository extends JpaRepository<tenteAdivinharModel, UUID> {
     boolean existsByusername(String username);
     Optional<tenteAdivinharModel> findByUsername(String username);
     Optional<tenteAdivinharModel> findByEmail(String email);
}
