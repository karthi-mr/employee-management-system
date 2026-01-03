import { type ReactElement, useEffect, useState } from "react";
import type { EmployeeResponse } from "../model/EmployeeResponse.ts";
import { getAllEmployees } from "../service/EmployeeService.ts";
import type { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";



/*const employees: Array<EmployeeResponse> = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john@mail.com"
  },
  {
    id: 2,
    firstname: "Kiran",
    lastname: "Doe",
    email: "kiran@mail.com"
  }
];*/

function ListEmployeeComponent(): ReactElement {
  const [employees, setEmployees] = useState<Array<EmployeeResponse>>([]);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees()
      .then(
        (data: AxiosResponse<Array<EmployeeResponse>>) => setEmployees(data.data)
      )
      .catch((err: AxiosError) => setError(err.message))

    return () => {
      setEmployees([]);
      setError(null);
    }
  }, []);

  function handleRefresh() {
    getAllEmployees()
      .then(
        (data: AxiosResponse<Array<EmployeeResponse>>) => setEmployees(data.data)
      )
      .catch((err: AxiosError) => setError(err.message))
  }

  function handleAddNewEmployee() {
    navigator("/add-employee");
  }

  function onClickUpdateEmployee(employeeId: number): void {
    navigator(`/update-employee/${employeeId}`);
  }

  function onDeleteEmployee(employeeId: number): void {
    navigator(`/delete-employee/${employeeId}`);
  }

  return (
    <div className="container">
      <div className="mb-4 d-flex justify-content-between">
        <h2 className="">List of Employees</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={handleAddNewEmployee}>Add Employee</button>
          <button className="btn btn-primary" onClick={handleRefresh}>Refresh</button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <span>{error}</span>
        </div>
      )}
      <table className="table table-striped table-hover table-bordered text-center">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length == 0 && (
            <tr className="text-center">
              <td colSpan={10}>
                <h3 className="text-danger">No Employees Data found</h3>
              </td>
            </tr>
          )}
          {employees.map(employee => (
            <tr key={employee.id}>
              <th scope="row">{employee.id}</th>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onClickUpdateEmployee(employee.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDeleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent;
