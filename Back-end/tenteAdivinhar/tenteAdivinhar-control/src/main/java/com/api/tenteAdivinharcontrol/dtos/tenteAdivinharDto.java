package com.api.tenteAdivinharcontrol.dtos;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/* Aqui são verificações de validação para ter certeza que os dados que vem do frontend corretos*/
public class tenteAdivinharDto{

    @NotBlank
    private String username;
    @NotBlank
    private String email;

    @NotBlank
    @Size(max = 10)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTenteAdivinharpassword() {return password;}
}
