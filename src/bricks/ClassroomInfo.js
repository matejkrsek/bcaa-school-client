import React from "react";

function ClassroomInfo(props) {
  return (
    <h1>
      Classroom{" "}
      <span className="classroomNameHeader"> {props.classroom.name}</span>
    </h1>
  );
}

export default ClassroomInfo;
