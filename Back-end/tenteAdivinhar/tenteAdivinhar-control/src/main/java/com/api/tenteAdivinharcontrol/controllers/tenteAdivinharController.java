package com.api.tenteAdivinharcontrol.controllers;


import com.api.tenteAdivinharcontrol.dtos.loginDto;
import com.api.tenteAdivinharcontrol.dtos.tenteAdivinharDto;
import com.api.tenteAdivinharcontrol.models.tenteAdivinharModel;
import com.api.tenteAdivinharcontrol.services.tenteAdivinharService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;


@RestController
@CrossOrigin(origins ="*", maxAge =3600)
@RequestMapping("/tenteAdivinhar")/**/

/*Rotas e suas funções*/
public class tenteAdivinharController {

    final tenteAdivinharService tenteAdivinharService;

    public tenteAdivinharController(tenteAdivinharService tenteAdivinharService) {
        this.tenteAdivinharService = tenteAdivinharService;
    }

    @PostMapping("gravar-user")/*Salvar o cadastro de cada pessoa*/
    public ResponseEntity<Object> savetenteAdivinhar(@RequestBody @Valid tenteAdivinharDto tenteAdivinharDto){

        if(tenteAdivinharService.existsByusername(tenteAdivinharDto.getUsername())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: This username is already in use");
        }

        var tenteAdivinharModel = new tenteAdivinharModel();
        BeanUtils.copyProperties(tenteAdivinharDto,tenteAdivinharModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(tenteAdivinharService.save(tenteAdivinharModel));
    }

    @GetMapping("/listar-users")/*listar os cadastros*/
    public ResponseEntity<Page<tenteAdivinharModel>> getAllTenteAdivinhar(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(tenteAdivinharService.findAll(pageable));
    }

    @GetMapping("/{id}")/*mostrar um cadastro expecífico*/
    public ResponseEntity<Object> getOneTenteAdivinhar(@PathVariable(value = "id") UUID id){
        Optional<tenteAdivinharModel> tenteAdivinharModelOptional = tenteAdivinharService.findById(id);
        if (!tenteAdivinharModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username/password not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(tenteAdivinharModelOptional.get());
    }


    @DeleteMapping("/{id}")/*deletar um cadastro*/
    public ResponseEntity<Object> deleteTenteAdivinhar(@PathVariable(value = "id") UUID id){
        Optional<tenteAdivinharModel> tenteAdivinharModelOptional = tenteAdivinharService.findById(id);
        if (!tenteAdivinharModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username/password not found.");
        }
        tenteAdivinharService.delete(tenteAdivinharModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Deleted successfully.");
    }

    @PutMapping("/{id}")/*Atualizar um cadastro*/
    public ResponseEntity<Object> updateTenteAdivinhar(@PathVariable(value = "id") UUID id,
                                                    @RequestBody @Valid tenteAdivinharDto tenteAdivinharDto){
        Optional<tenteAdivinharModel> tenteAdivinharModelOptional = tenteAdivinharService.findById(id);
        if (!tenteAdivinharModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found.");
        }
        var tenteAdivinharModel=  tenteAdivinharModelOptional.get();
        tenteAdivinharModel.setUsername(tenteAdivinharDto.getUsername());
        tenteAdivinharModel.setPassword(tenteAdivinharDto.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(tenteAdivinharService.save(tenteAdivinharModel));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> logar(@RequestBody @Valid loginDto loginDto){
        var usuario = tenteAdivinharService.findByEmail(loginDto.getEmail());
        if (usuario.isPresent()) {
            System.out.println(loginDto.getPassword());
            System.out.println(usuario.get().getPassword());
           if (Objects.equals(loginDto.getPassword(), usuario.get().getPassword())){
               return ResponseEntity.status(HttpStatus.OK).body("Logado, " + usuario.get().getUsername()) ;
           }
           else{
               return ResponseEntity.status(HttpStatus.OK).body("Senha Incorreta!") ;
           }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Usuário não encontrado!") ;

    }
}
