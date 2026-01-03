package com.preflearn.ems.employee.dto;

import lombok.Builder;

@Builder
public record EmployeeResponseDto(
        Long id,

        String firstname,

        String lastname,

        String email
) {
}
