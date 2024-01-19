import React from "react";
import Student from "./Student";

function StudentGridList(props) {
  return (
    <div className="row">
      {props.studentList.map((student) => {
        return (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
            style={{ paddingBottom: "16px" }}
          >
            <Student key={student.id} student={student} />
          </div>
        );
      })}
    </div>
  );
}

export default StudentGridList;
