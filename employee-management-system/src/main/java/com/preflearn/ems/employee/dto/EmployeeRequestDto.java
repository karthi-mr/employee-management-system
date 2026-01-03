package com.preflearn.ems.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EmployeeRequestDto(
        @NotBlank(message = "Firstname should not be blank")
        String firstname,

        @NotBlank(message = "Lastname should not be blank")
        String lastname,


        @NotBlank(message = "Email should not be blank")
        @Email(message = "Invalid email")
        String email
) {
}
