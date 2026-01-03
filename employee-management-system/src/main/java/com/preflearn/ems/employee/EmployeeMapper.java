package com.preflearn.ems.employee;

import com.preflearn.ems.employee.dto.EmployeeRequestDto;
import com.preflearn.ems.employee.dto.EmployeeResponseDto;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public EmployeeResponseDto employeeToEmployeeResponseDto(Employee employee) {
        return EmployeeResponseDto.builder()
                .id(employee.getId())
                .firstname(employee.getFirstname())
                .lastname(employee.getLastname())
                .email(employee.getEmail())
                .build();
    }

    public Employee employeeRequestDtoToEmployee(EmployeeRequestDto employeeRequestDto) {
        return Employee.builder()
                .firstname(employeeRequestDto.firstname())
                .lastname(employeeRequestDto.lastname())
                .email(employeeRequestDto.email())
                .build();
    }
}
