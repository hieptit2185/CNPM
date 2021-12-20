import React, { useState, useEffect } from "react";
import "../asets/css/listInject.css";
import axios from "axios";
import moment from "moment";

function ListInject() {
  const [listInject, setListInject] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:6969/inject")
      .then((res) => setListInject(res.data));
  }, []);
  return (
    <div className="list_inject">
      <center className="mb-3">Danh sách người tiêm</center>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
            <th scope="col">SĐT</th>
            <th scope="col">Thành phố</th>
            <th scope="col">Mũi thứ</th>
            <th scope="col">Ngày tiêm</th>
            <th scope="col">Buổi tiêm</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(listInject) &&
            listInject.map((inject, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{inject.name}</td>
                  <td>{moment(inject.birthday).format("DD/MM/YYYY")}</td>
                  <td>{inject.sex}</td>
                  <td>{`0${String(inject.phone).slice(1, 3)}*******`}</td>
                  <td>{inject.city}</td>
                  <td>{inject.inject}</td>
                  <td>{moment(inject.date_inject).format("DD/MM/YYYY")}</td>
                  <td>{inject.shift}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ListInject;
