import React, { useState, useEffect } from "react";
import axios from "axios";

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [nameVaccine, setNameVaccine] = useState("");
  const [quantily, setQuantity] = useState(0);
  const api = "http://localhost:6969";
  const _handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/vaccine/new`, {
      nameVaccine,
      quantily,
    });
    setNameVaccine("");
    setQuantity("");
  };
  useEffect(() => {
    axios.get(`${api}/vaccine`).then((res) => setVaccine(res.data));
  }, [vaccine]);
  return (
    <div>
      <div className="row">
        <center className="mb-3">Quản lý Vaccine</center>
        <div className="col-3 mx-2">
          <form onSubmit={_handleSubmit}>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Vaccine
              </label>
              <input
                type="text"
                value={nameVaccine}
                onChange={(e) => setNameVaccine(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Quality
              </label>
              <input
                value={quantily}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
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
                <th scope="col">Loại Vaccine</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Ngày nhập</th>
              </tr>
            </thead>
            <tbody>
              {vaccine.length > 0 &&
                vaccine.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nameVaccine}</td>
                      <td>{item.quantily}</td>
                      <td>{item.create_at}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Vaccine;
