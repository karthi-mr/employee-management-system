package com.preflearn.ems.employee;

import com.preflearn.ems.employee.dto.EmployeeRequestDto;
import com.preflearn.ems.employee.dto.EmployeeResponseDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeMapper employeeMapper;
    private final EmployeeRepository employeeRepository;

    public List<EmployeeResponseDto> findAllEmployees() {
        List<Employee> employees = this.employeeRepository.findAll();
        return employees.stream()
                .map(this.employeeMapper::employeeToEmployeeResponseDto)
                .collect(Collectors.toList());
    }

    public EmployeeResponseDto findEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found for id: " + employeeId));
        return this.employeeMapper.employeeToEmployeeResponseDto(employee);
    }

    public EmployeeResponseDto createEmployee(EmployeeRequestDto employeeRequestDto) {
        Employee employee = this.employeeMapper.employeeRequestDtoToEmployee(employeeRequestDto);
        var savedEmployee = this.employeeRepository.save(employee);
        return this.employeeMapper.employeeToEmployeeResponseDto(savedEmployee);
    }

    public EmployeeResponseDto updateEmployee(Long employeeId, EmployeeRequestDto employeeRequestDto) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found for id: " + employeeId));
        employee.setFirstname(employeeRequestDto.firstname());
        employee.setLastname(employeeRequestDto.lastname());
        employee.setEmail(employeeRequestDto.email());
        var savedEmployee = this.employeeRepository.save(employee);
        return this.employeeMapper.employeeToEmployeeResponseDto(savedEmployee);
    }

    public void deleteEmployee(Long employeeId) {
        employeeRepository.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found for id: " + employeeId));
        this.employeeRepository.deleteById(employeeId);
    }
}
