import axios, { type AxiosResponse } from "axios";
import type { EmployeeRequest } from "../component/EmployeeComponent.tsx";

const EMPLOYEES_REST_API_BASE_URL: string = "http://localhost:8088/api/v1/employees";

export function getAllEmployees(): Promise<AxiosResponse<any, any>> {
    return axios.get(EMPLOYEES_REST_API_BASE_URL);
}

export function addNewEmployee(employeeRequest: EmployeeRequest): Promise<AxiosResponse<any, any>> {
    return axios.post(EMPLOYEES_REST_API_BASE_URL, employeeRequest);
}

export function getEmployeeById(employeeId: number): Promise<AxiosResponse<any, any>> {
    return axios.get(`${EMPLOYEES_REST_API_BASE_URL}/${employeeId}`);
}

export function updateEmployeeById(employeeId: number, employeeRequest: EmployeeRequest): Promise<AxiosResponse<any, any>> {
    return axios.put(`${EMPLOYEES_REST_API_BASE_URL}/${employeeId}`, employeeRequest);
}

export function deleteEmployeeById(employeeId: number): Promise<AxiosResponse<any, any>> {
    return axios.delete(`${EMPLOYEES_REST_API_BASE_URL}/${employeeId}`);
}
