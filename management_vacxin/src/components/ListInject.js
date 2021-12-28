import React, { useState, useEffect } from "react";
import "../asets/css/listInject.css";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

function ListInject() {
  const [listInject, setListInject] = useState([]);
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
    axios
      .get("http://localhost:6969/inject")
      .then((res) => setListInject(res.data));
  }, []);
  return (
    <div className="list_inject">
      <center className="mb-3">Danh sách đăng ký tiêm</center>
      <table className="table">
        <thead>
          <tr>
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
            displayUsers.map((inject, index) => {
              return (
                <tr key={index}>
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
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default ListInject;
