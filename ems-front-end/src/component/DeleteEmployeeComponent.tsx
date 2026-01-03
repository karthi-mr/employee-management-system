import { type ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams, type NavigateFunction } from "react-router-dom";
import type { EmployeeResponse } from "../model/EmployeeResponse.ts";
import { deleteEmployeeById, getEmployeeById } from "../service/EmployeeService.ts";
import type { AxiosError, AxiosResponse } from "axios";

function DeleteEmployeeComponent(): ReactElement {
  const [employee, setEmployee] = useState<EmployeeResponse | undefined>(undefined);
  const { id } = useParams();
  const navigator: NavigateFunction = useNavigate();

  useEffect(() => {
    getEmployeeById(Number(id))
      .then((data: AxiosResponse<EmployeeResponse>) => setEmployee(data.data))
      .catch((error: AxiosError) => console.log(error));

    return () => {
      setEmployee(undefined);
    }
  }, [id]);


  function onDelete(): void {
    deleteEmployeeById(Number(id))
      .then(() => navigator("/employees"))
      .catch((error: AxiosError) => console.log(error));
  }

  function onCancelDelete(): void {
    navigator("/employees");
  }

  if (employee === undefined) {
    return (
      <div className="container">
        <h2 className="text-danger">No Data found for employee id: {id}</h2>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h2>Are you sure want to delete employee with email: {employee.email}</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={onCancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default DeleteEmployeeComponent;
