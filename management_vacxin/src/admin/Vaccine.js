import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [nameVaccine, setNameVaccine] = useState("");
  const [quantily, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const api = "http://localhost:6969";
  const _handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios.post(`${api}/vaccine/new`, {
      nameVaccine,
      quantily,
    });
    setNameVaccine("");
    setQuantity("");
    setLoading(false);
  };
  useEffect(() => {
    axios.get(`${api}/vaccine`).then((res) => setVaccine(res.data));
  }, [loading]);

  const _handleDelete = async (id) => {
    const data = await axios
      .delete(`${api}/vaccine/delete/${id}`)
      .then((res) => res.data);
    const newVaccine = vaccine.filter((item) => item._id !== data._id);
    setVaccine(newVaccine);
  };

  return (
    <div>
      {!loading && (
        <div className="list_inject">
          <center className="mb-3">Quản lý Vaccine</center>
          <div className="d-flex">
            <div className="col-3 mx-2">
              <form onSubmit={_handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
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
                    <th scope="col">Action</th>
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
                          <td>
                            <Button
                              color="danger"
                              outline
                              onClick={() => _handleDelete(item._id)}
                            >
                              Xoá
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vaccine;
