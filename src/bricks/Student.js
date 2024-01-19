import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiAccountSchoolOutline, mdiIdentifier } from "@mdi/js";
import StudentSubjectGradeList from "./StudentSubjectGradeList";

function Student(props) {
  return (
    <Card>
      <Card.Body>
        <div>
          <Icon path={mdiAccountSchoolOutline} size={1} color="grey" />{" "}
          {props.student.firstname} {props.student.surname}
        </div>
        <div>
          <Icon path={mdiIdentifier} size={1} color="grey" />{" "}
          {props.student.nationalId}
        </div>

        <div style={{ marginTop: "20px" }}>
          {props.student.subjectList.map((subject) => {
            let average = subject.averageGrade;
            if (average) average = average.toFixed(1);
            else average = "N";
            return (
              <div
                key={subject.id}
                className={"d-flex justify-content-between"}
              >
                <div>{subject.name}</div>
                <div>
                  <b>{average}</b>{" "}
                  <StudentSubjectGradeList
                    student={props.student}
                    subject={subject}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Student;
