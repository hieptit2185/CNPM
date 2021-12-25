import React, { useEffect, useState } from "react";
import axios from "axios";
import Doctor_item from "./Doctor_item";

function Doctor() {
  const api = "http://localhost:6969";
  const [doctor, setDoctor] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get(`${api}/user`).then((res) => setDoctor(res.data));
  }, [doctor]);

  const _handleDelete = async (id) => {
    const data = await axios
      .delete(`${api}/user/delete/${id}`)
      .then((res) => res.data);
    const newDoctor = doctor.filter((item) => item._id !== data._id);
    setDoctor(newDoctor);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/user/new`, {
      username,
      password,
    });
    setUserName("");
    setPassword("");
  };

  const _handleEdit = async (id, pass) => {
    const data = await axios
      .put(`${api}/user/update/${id}`, {
        password: pass,
      })
      .then((res) => res.data);
    console.log(data);
    const newDoctor = doctor.map((item) => {
      if (item._id !== data._id) return item;

      return { ...item, content: pass };
    });
    setDoctor(newDoctor);
  };

  return (
    <div>
      <div className="list_inject">
        <center className="mb-3">Quản lý Bác sĩ</center>
        <div className="d-flex">
          <div className="col-3 mx-2">
            <form onSubmit={_handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
          <div className="col-8 mx-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Username</th>
                  <th scope="col">Password</th>
                  <th scope="col">Create_at</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {doctor.length > 0 &&
                  doctor.map((item, index) => {
                    return (
                      <Doctor_item
                        index={index}
                        item={item}
                        _handleDelete={_handleDelete}
                        _handleEdit={_handleEdit}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
