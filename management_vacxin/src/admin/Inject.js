import React, { useState, useEffect } from "react";
import "../asets/css/listInject.css";
import axios from "axios";
import "./assets/Inject.css";
import Inject_item from "./Inject_item";

function Inject() {
  const [listInject, setListInject] = useState([]);
  const api = "http://localhost:6969";
  const [search, setSearch] = useState("");
  const [inject_nb, setInject_nb] = useState("all");

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

  const _handleUpdate = async (id, value = {}) => {
    const data = await axios
      .put(`${api}/inject/update/${id}`, {
        name: value.name,
        inject: value.inject,
        sex: value.sex,
        phone: value.phone,
        email: value.email,
        adress: value.adress,
        city: value.city,
        date_inject: value.date_inject,
        shift: value.shift,
        vaccine: value.vaccine,
      })
      .then((res) => res.data);
    const newListInject = listInject.map((item) => {
      if (item._id !== data._id) return item;
      return {
        ...item,
        name: value.name,
        inject: value.inject,
        sex: value.sex,
        phone: value.phone,
        email: value.email,
        adress: value.adress,
        city: value.city,
        date_inject: value.date_inject,
        shift: value.shift,
        vaccine: value.vaccine,
      };
    });
    setListInject(newListInject);
  };

  const filterInject = (number, list) => {
    switch (number) {
      case "all":
        return list.filter((item) => item);
      case "mui1":
        return list.filter((item) => item.inject === "1");
      case "mui2":
        return list.filter((item) => item.inject === "2");
      default:
        return;
    }
  };
  return (
    <>
      <div className="list_inject">
        <center className="mb-3">Quản lý người tiêm</center>
        <div className="searchs w-50">
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Search..."
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setInject_nb(e.target.value)}
          >
            <option value="all">All</option>
            <option value="mui1">Mũi 1</option>
            <option value="mui2">Mũi 2</option>
          </select>
        </div>
        <table className="table listItemTable">
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
              <th scope="col">Trạng Thái</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(listInject) &&
              filterInject(inject_nb, listInject)
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((inject, index) => {
                  return (
                    <Inject_item
                      index={index}
                      injects={inject}
                      _handleDelete={_handleDelete}
                      _handleUpdate={_handleUpdate}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Inject;
