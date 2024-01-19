import React, { useState, useMemo } from "react";
import StudentGridList from "./StudentGridList";
import StudentTableList from "./StudentTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js";
import styles from "../App.css";

function StudentList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";
  const [searchBy, setSearchBy] = useState("");

  const filteredStudentList = useMemo(() => {
    return props.classroom.studentList.filter((item) => {
      return (
        item.firstname
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) ||
        item.surname.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
    });
  }, [searchBy, props.classroom.studentList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam studentů</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "right" }}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
            </Form>
            <Button
              className={"d-none d-md-block"} // znamená... d = display, d-none znamená že default je button nezobrazit, avšak pro displeje velikosti medium a vštší zobrazí display: block, block ,tedy od sebe(?)
              variant="outline-primary"
              onClick={() =>
                setViewType((currentState) => {
                  if (currentState === "grid") return "table";
                  else return "grid";
                })
              }
            >
              <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
              {isGrid ? "Tabulka" : "Grid"}
            </Button>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className={styles.studentList}>
        {filteredStudentList.length ? ( // defaultní zobraní block, od větších jak medium displejů none...
          <div className="container">
            <div className={"d-block d-md-none"}>
              <StudentGridList studentList={filteredStudentList} />
            </div>
            <div className={"d-none d-md-block"}>
              {isGrid ? (
                <StudentGridList studentList={filteredStudentList} />
              ) : (
                <StudentTableList studentList={filteredStudentList} />
              )}
            </div>
          </div>
        ) : (
          <div style={{ margin: "16px auto", textAlign: "center" }}>
            Nejsou žádní studenti ke zobrazení
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
