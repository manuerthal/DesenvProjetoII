package com.api.tenteAdivinharcontrol.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

/*Classe modelo para criação da tabela no banco de dados e para alterações dela*/
@Entity
@Table(name = "TB_tenteAdivinhar")/*nome da tabela na base de dados*/
public class tenteAdivinharModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)/*O Id é gerado de forma automática*/
    private UUID id;
    @Column(nullable = false, unique = true, length = 13)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 10)
    private String password;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
