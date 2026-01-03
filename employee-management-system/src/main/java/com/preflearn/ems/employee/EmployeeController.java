package com.preflearn.ems.employee;

import com.preflearn.ems.employee.dto.EmployeeRequestDto;
import com.preflearn.ems.employee.dto.EmployeeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDto>> findAll() {
        return ResponseEntity.ok(this.employeeService.findAllEmployees());
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDto> createEmployee(
            @RequestBody EmployeeRequestDto employeeRequestDto
            ) {
        return ResponseEntity
                .status(CREATED)
                .body(employeeService.createEmployee(employeeRequestDto));
    }

    @GetMapping("{employee-id}")
    public ResponseEntity<EmployeeResponseDto> findEmployeeById(
            @PathVariable(value = "employee-id") Long employeeId
    ) {
        return ResponseEntity.ok(this.employeeService.findEmployeeById(employeeId));
    }

    @PutMapping("{employee-id}")
    public ResponseEntity<EmployeeResponseDto> updateEmployee(
            @PathVariable(value = "employee-id") Long employeeId,
            @RequestBody EmployeeRequestDto employeeRequestDto
    ) {
        return ResponseEntity.ok(this.employeeService.updateEmployee(employeeId, employeeRequestDto));
    }


    @DeleteMapping("{employee-id}")
    public ResponseEntity<?> deleteEmployee(
            @PathVariable(value = "employee-id") Long employeeId
    ) {
        this.employeeService.deleteEmployee(employeeId);
        return ResponseEntity
                .status(NO_CONTENT)
                .build();
    }
}
