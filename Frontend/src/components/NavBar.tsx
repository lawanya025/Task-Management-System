import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Task Manager
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/task-list">
                Task List
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/add-task">
                Add Task
              </Link>
            </li>

           

            {/* <li className="nav-item">
              <Link className="nav-link" to="/settings">
                Settings
              </Link>
            </li> */}

            <li className="nav-item">
              <button className="btn btn-dark" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
