import type { ReactElement } from "react";
import ListEmployeeComponent from "./component/ListEmployeeComponent.tsx";
import HeaderComponent from "./component/HeaderComponent.tsx";
import FooterComponent from "./component/FooterComponent.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployeeComponent from "./component/EmployeeComponent.tsx";
import DeleteEmployeeComponent from "./component/DeleteEmployeeComponent.tsx";

function App(): ReactElement {
  return (
    <div className="app">
      <HeaderComponent />
      <main className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/employees" replace />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/update-employee/:id" element={<EmployeeComponent />} />
            <Route path="/delete-employee/:id" element={<DeleteEmployeeComponent />} />
          </Routes>
        </BrowserRouter>
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
