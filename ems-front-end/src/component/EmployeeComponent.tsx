import { type ChangeEvent, type ReactElement, useEffect, useState } from "react";
import { addNewEmployee, getEmployeeById, updateEmployeeById } from "../service/EmployeeService.ts";
import type { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { EmployeeResponse } from "../model/EmployeeResponse.ts";

export type EmployeeRequest = {
  firstname: string;
  lastname: string;
  email: string;
}

// @ts-ignore
enum MessageType {
  SUCCESS_MESSAGE,
  FAILURE_MESSAGE
}

type Message = {
    message: string;
    message_type: MessageType
};

function EmployeeComponent(): ReactElement {
  const [employeeForm, setEmployeeForm] = useState<EmployeeRequest>({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [message, setMessage] = useState<Message | null>(null);
  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("Populating data");
      populateEmployeeData(Number(id));
    }
  }, [id]);

  let isEdit: boolean = id !== undefined;
  let pageTitle: ReactElement = <h2 className="text-center">Add Employee</h2>;

  if (isEdit) {
    pageTitle = <h2 className="text-center">Update Employee</h2>;
  }

  function populateEmployeeData(employeeId: number) {
    getEmployeeById(employeeId)
      .then((data: AxiosResponse<EmployeeResponse>) => setEmployeeForm({
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        email: data.data.email
      }))
      .catch((error: AxiosError) => {
        let errorMessage = "Unknown error";
        const response: AxiosResponse | undefined = error.response;
        console.log(error);
        if (response !== undefined && response !== null) {
          const data = response.data;
          if (data !== undefined && data !== null) {
            errorMessage = data.message;
          }
        }
        setMessage({
          message: errorMessage,
          message_type: MessageType.FAILURE_MESSAGE
        })
      });
  }

  function handleFormInputChange(key: string, value: string): void {
    setEmployeeForm({
      ...employeeForm,
      [key]: value
    });
  }

  function onSaveEmployee(e: any): void {
    e.preventDefault();

    const isValid: boolean = validateEmployeeForm();

    if (isValid) {
      if (!isEdit) {
        addNewEmployee(employeeForm)
          .then(() => {
            setMessage({
              message: "Employee created successfully",
              message_type: MessageType.SUCCESS_MESSAGE
            });
            setEmployeeForm({
              firstname: "",
              lastname: "",
              email: ""
            })
          })
          .catch((error: AxiosError) => {
            console.log(error);
            let errorMessage = "Unknown error";
            const response: AxiosResponse | undefined = error.response;
            if (response !== undefined && response !== null) {
              const data = response.data;
              if (data !== undefined && data !== null) {
                errorMessage = data.message;
              }
            }
            setMessage({
              message: errorMessage,
              message_type: MessageType.FAILURE_MESSAGE
            })
          });
      } else {
        updateEmployeeById(Number(id), employeeForm)
          .then(() => {
            setMessage({
              message: "Employee created successfully",
              message_type: MessageType.SUCCESS_MESSAGE
            });
            setEmployeeForm({
              firstname: "",
              lastname: "",
              email: ""
            })
          })
          .catch((error: AxiosError) => {
            let errorMessage = "Unknown error";
            console.log(error);
            const response: AxiosResponse | undefined = error.response;
            if (response !== undefined && response !== null) {
              const data = response.data;
              if (data !== undefined && data !== null) {
                errorMessage = data.message;
              }
            }
            setMessage({
              message: errorMessage,
              message_type: MessageType.FAILURE_MESSAGE
            })
          });
      }
    }
  }

  function validateEmployeeForm() {
    if (employeeForm.firstname.trim() === "") {
      setMessage({
        message: "Firstname should not be empty",
        message_type: MessageType.FAILURE_MESSAGE
      });
      return false;
    }
    if (employeeForm.lastname.trim() === "") {
      setMessage({
        message: "Lastname should not be empty",
        message_type: MessageType.FAILURE_MESSAGE
      });
      return false;
    }
    if (employeeForm.email.trim() === "") {
      setMessage({
        message: "Email should not be empty",
        message_type: MessageType.FAILURE_MESSAGE
      });
      return false;
    }
    return true;
  }

  function onGoToEmployeeList(): void {
    navigator("/employees");
  }

  let topMessage: ReactElement | null = null;
  if (message !== null) {
    if (message.message_type === MessageType.SUCCESS_MESSAGE) {
      topMessage = (
        <div className="alert alert-success" role="alert">
          <span className="d-block mb-2 fw-bold fs-4">{message.message}</span>
          <button className="btn btn-warning" onClick={onGoToEmployeeList}>Go to Employee List</button>
        </div>
      );
    } else {
      topMessage = (
        <div className="alert alert-danger" role="alert">
          <span>{message.message}</span>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="container">
        {topMessage && topMessage}
        <div className="card">
          {pageTitle}
          <div className="card-body">
            <form>
              {/* firstname */}
              <div className="mb-3">
                <label className="form-label" htmlFor="firstname">Firstname</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  value={employeeForm.firstname}
                  placeholder="Enter firstname"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormInputChange("firstname", e.target.value)}
                />
              </div>
              {/* lastname */}
              <div className="mb-3">
                <label className="form-label" htmlFor="lastname">Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  value={employeeForm.lastname}
                  placeholder="Enter lastname"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormInputChange("lastname", e.target.value)}
                />
              </div>
              {/* email */}
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Lastname</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={employeeForm.email}
                  placeholder="Enter email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFormInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <button
                  className="btn btn-success"
                  onClick={(e) => onSaveEmployee(e)}>
                  {/*onClick={(e) => onSaveEmployee(e)}>*/}
                  {`${isEdit ? "Update" : "Create"} Employee`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent;
