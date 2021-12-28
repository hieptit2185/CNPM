import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function Complete() {
  const [listComplete, setListComplete] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:6969/inject/?inject=2")
      .then((res) => setListComplete(res.data));
  }, []);
  return (
    <>
      <center className="mb-3">Danh sách người tiêm(đủ 2 mũi)</center>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Họ và tên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
            <th scope="col">SĐT</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Thành phố</th>
            <th scope="col">Vaccine</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Completed
            </th>
          </tr>
        </thead>
        <tbody>
          {listComplete.length > 0 &&
            listComplete
              .filter((item) => new Date(item.date_inject) <= new Date())
              .map((item, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{item.name}</td>
                    <td>{moment(item.birthday).format("DD/MM/YYYY")}</td>
                    <td>{item.sex}</td>
                    <td>{`0${item.phone}`}</td>
                    <td>{item.adress}</td>
                    <td>{item.city}</td>
                    <td>{item.vaccine}</td>
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="green"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
}

export default Complete;
