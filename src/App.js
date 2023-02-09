import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Student from "./Components/Student";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Dashboard";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Paypal from "./Components/Payment/Paypal";
import Stripe from "./Components/Payment/Stripe";
import Authorize from "./Components/Payment/Authorize";
import TransectionList from "./Components/TransectionList";
function App() {
  const logout = () => {
    localStorage.removeItem("id");
    window.location.reload();
  };
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar bg='primary' variant='dark'>
          <Container>
           <Navbar.Brand as={Link} to='/dasboard'>Student Report</Navbar.Brand>
            <Nav className='me-auto'>
              {localStorage.getItem("id") ? (
                <>
                <Nav.Link as={Link} to='/list'>Home</Nav.Link>
                  <NavDropdown title='Payment methods' id='basic-nav-dropdown'>
                    <NavDropdown.Item as={Link} to='/paypal'>
                      Paypal
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/stripe'>
                      Stripe
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='net'>
                      Authorize.net
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to='/transections'>Transections list</Nav.Link>
                  <Nav.Link as={Link} to='/login' onClick={logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                  <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='list' element={<Student />} />
          <Route path='dasboard' element={<Dashboard />} />
          <Route path='paypal' element={<Paypal />} />
          <Route path='stripe' element={<Stripe />} />
          <Route path='net' element={<Authorize />} />
          <Route path='transections' element={<TransectionList />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
