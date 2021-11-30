import { useState } from "react";
import "./styles.css";

const DEFAULT_LIST_STUDENT = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe"
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe"
  }
];

export default function App() {
  const [studentsList, setStudentList] = useState(DEFAULT_LIST_STUDENT);
  const [isEdit, setIsEdit] = useState(false);
  const [updateStudent, setUpdateStudent] = useState({
    id: "",
    firstName: "",
    lastName: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("here");
    const [firstName, lastName] = e.target;
    let newUser = {
      id: studentsList.length + 1,
      firstName: firstName.value,
      lastName: lastName.value
    };

    setStudentList([...studentsList, newUser]);
  };
  const onDelete = (id) => {
    const deleteStudent = studentsList.filter((student) => student.id !== id);
    setStudentList(deleteStudent);
  };
  const onUpdate = (studentId) => {
    setIsEdit(true);
    const editStudent = studentsList.find(
      (student) => student.id === studentId
    );
    setUpdateStudent({
      id: editStudent.id,
      firstName: editStudent.firstName,
      lastName: editStudent.lastName
    });
  };

  const handleUpdateStudent = (index) => (e) => {
    e.preventDefault();
    const [firstName, lastName] = e.target;

    setStudentList((prevState) => {
      const list = [...prevState];
      list[index] = {
        ...updateStudent,
        firstName: firstName.value,
        lastName: lastName.value
      };
      return list;
    });
  };

  return (
    <div className="App">
      <h1>Students List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="firstName" />
        <input type="text" placeholder="lastName" />
        <button type="submit"> add </button>
      </form>
      <div className="students-list">
        {studentsList.map((student, idx) => (
          <div key={idx} className="student">
            <div> {student.id} </div>
            <div> {student.firstName} </div>
            <div> {student.lastName} </div>
            {isEdit && updateStudent.id === student.id && (
              <form onSubmit={handleUpdateStudent(idx)}>
                <input
                  type="text"
                  placeholder="firstName"
                  defaultValue={updateStudent.firstName}
                />
                <input
                  type="text"
                  placeholder="lastName"
                  defaultValue={updateStudent.lastName}
                />
                <button type="submit"> add </button>
              </form>
            )}

            <button onClick={() => onDelete(student.id)}> X </button>
            <button onClick={() => onUpdate(student.id)}> update </button>
          </div>
        ))}
      </div>
    </div>
  );
}
