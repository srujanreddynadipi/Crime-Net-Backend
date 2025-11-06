package com.crimenet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String uid;

    @NotBlank
    private String fullName;

    @NotBlank
    @Email
    private String email;

    private String phone;
    private String address;
    private String role; // CITIZEN, POLICE, or ADMIN
}
