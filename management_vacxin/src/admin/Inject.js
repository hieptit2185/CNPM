import React, { useState, useEffect } from "react";
import "../asets/css/listInject.css";
import axios from "axios";
import moment from "moment";
import { Button } from "reactstrap";
import "./assets/Inject.css";
import DatePicker from "react-datepicker";

function Inject() {
  const [listInject, setListInject] = useState([]);
  const [inject_item, setInject_item] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const api = "http://localhost:6969";

  useEffect(() => {
    axios.get(`${api}/inject`).then((res) => setListInject(res.data));
  }, []);

  const _handleDelete = async (id) => {
    const data = await axios
      .delete(`${api}/inject/delete/${id}`)
      .then((res) => res.data);
    const newListInject = listInject.filter((item) => item._id !== data._id);
    setListInject(newListInject);
  };

  const _handleClose = (e) => {
    setIsEdit(false);
  };

  const _handleEdit = async (id) => {
    await axios
      .get(`${api}/inject/${id}`)
      .then((res) => setInject_item(res.data));
    setIsEdit(true);
  };
  console.log(inject_item);
  return (
    <div className="list_inject">
      <center className="mb-3">Quản lý người tiêm</center>
      <div className="searchs w-50">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Giới tính</th>
            <th scope="col">SĐT</th>
            <th scope="col">Email</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Thành phố</th>
            <th scope="col">Mũi thứ</th>
            <th scope="col">Ngày tiêm</th>
            <th scope="col">Buổi tiêm</th>
            <th scope="col">Vaccine</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Action
            </th>
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
                  <td>{`0${inject.phone}`}</td>
                  <td>{inject.email}</td>
                  <td>{inject.adress}</td>
                  <td>{inject.city}</td>
                  <td>{inject.inject}</td>
                  <td>{moment(inject.date_inject).format("DD/MM/YYYY")}</td>
                  <td>{inject.shift}</td>
                  <td>{inject.vaccine}</td>
                  <td className="d-flex">
                    <Button
                      color="danger"
                      outline
                      className="mx-1"
                      onClick={() => _handleDelete(inject._id)}
                    >
                      Xoá
                    </Button>
                    <Button
                      color="info"
                      outline
                      onClick={() => _handleEdit(inject._id)}
                    >
                      Sửa
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Inject;
