import React, { useState, useEffect } from "react";
import "../asets/css/listInject.css";
import axios from "axios";
import "./assets/Inject.css";
import ReactPaginate from "react-paginate";
import Inject_item from "./Inject_item";

function Inject() {
  const [listInject, setListInject] = useState([]);
  const api = "http://localhost:6969";
  const [search, setSearch] = useState("");
  const [inject_nb, setInject_nb] = useState("all");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = listInject.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  );
  const pageCount = Math.ceil(listInject.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
        <center className="mb-3">Danh s??ch ????ng k?? ti??m</center>
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
            <option value="mui1">M??i 1</option>
            <option value="mui2">M??i 2</option>
          </select>
        </div>
        <table className="table listItemTable">
          <thead>
            <tr>
              <th scope="col">H??? v?? t??n</th>
              <th scope="col">Ng??y sinh</th>
              <th scope="col">Gi???i t??nh</th>
              <th scope="col">S??T</th>
              <th scope="col">Email</th>
              <th scope="col">?????a ch???</th>
              <th scope="col">Th??nh ph???</th>
              <th scope="col">M??i th???</th>
              <th scope="col">Ng??y ti??m</th>
              <th scope="col">Bu???i ti??m</th>
              <th scope="col">Vaccine</th>
              <th scope="col">Tr???ng Th??i</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Tr???ng th??i
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(displayUsers) &&
              filterInject(inject_nb, displayUsers)
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
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttnss"}
          previousLinkClassName={"previousBttns"}
          nextLinkClassName={"nextBttns"}
          disabledClassName={"paginationDisableds"}
          activeClassName={"paginationActives"}
        />
      </div>
    </>
  );
}

export default Inject;
