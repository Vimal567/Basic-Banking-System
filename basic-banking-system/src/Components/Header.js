import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar className="fixed-top header" expand="lg">
      <Container>
        <Navbar.Brand
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={() => {
            window.location.reload();
          }}
        >
          <img style={{ width: "3rem" }} alt="brand" src={logo} id="brand" />
          <h2>MARCH GRIP 2023</h2>
        </Navbar.Brand>
        <div className="justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav>
                <ul>
                  <li>
                    <Link to="/" className="nav-links">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/customers" className="nav-links">
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link to="/transactions" className="nav-links">
                      Transactions
                    </Link>
                  </li>
                </ul>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
