import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Student from "./Components/Student";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
function App() {
  const logout = () => {
    localStorage.removeItem("id");
    window.location.reload();
  };
  return (
    <div className='App'>
      <BrowserRouter>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <a className='navbar-brand' href='/dasboard'>
            Student Report
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              {localStorage.getItem("id") ? (
                <>
                  <li className='nav-item active'>
                    <Link to={"/list"} className='nav-link'>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/login"} className='nav-link' onClick={logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link to={"/register"} className='nav-link'>
                      Register
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to={"/login"} className='nav-link'>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='list' element={<Student />} />
          <Route path='dasboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
