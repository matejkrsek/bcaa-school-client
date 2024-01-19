import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import ClassroomDetail from "./routes/ClassroomDetail";
import Home from "./routes/Home";
import SubjectList from "./routes/SubjectList";
import StudentList from "./routes/StudentList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="classroomDetail" element={<ClassroomDetail />} />
          <Route path="studentList" element={<StudentList />} />
          <Route path="subjectList" element={<SubjectList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
