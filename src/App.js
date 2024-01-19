import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "@mdi/react";
import { mdiAlertOctagonOutline, mdiLoading } from "@mdi/js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
  const [listClassroomsCall, setListClassroomsCall] = useState({
    state: "pending",
  });
  let navigate = useNavigate();
  // seznam tříd ve škole: (funguje jen při spuštení serveru...)
  function getSchoolListDropdown() {
    switch (listClassroomsCall.state) {
      case "pending":
        return (
          <Nav.Link disabled={true}>
            <Icon size={1} path={mdiLoading} spin={true} /> Classroom List
          </Nav.Link>
        );
      case "success":
        return (
          <NavDropdown title="Select Classroom" id="navbarScrollingDropdown">
            {listClassroomsCall.data.map((classroom) => {
              return (
                <NavDropdown.Item
                  onClick={() =>
                    navigate("/classroomDetail?id=" + classroom.id)
                  }
                >
                  {classroom.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        );
      case "error":
        return (
          <div>
            <Icon size={1} path={mdiAlertOctagonOutline} /> Error
          </div>
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    fetch(
      `https://bcaa-school-server-53cb238be4b6.herokuapp.com/classroom/list`,
      {
        method: "GET",
      }
    ).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setListClassroomsCall({ state: "error", error: responseJson });
      } else {
        setListClassroomsCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            Simple School
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Simple School
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {getSchoolListDropdown()}
                <Nav.Link onClick={() => navigate("/studentList")}>
                  Studenti
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/subjectList")}>
                  Předměty
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;
