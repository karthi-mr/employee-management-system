import type { ReactElement } from "react";

function HeaderComponent(): ReactElement {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-secondary mb-4">
          <div className="container-fluid">
            <a className="navbar-brand fs-3" href="/">
              Employee Management System
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default HeaderComponent;
