import React, { useState } from "react";
import "../asets/css/login.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const anyName = useNavigate();
  const { onRegister, setPatient } = props;
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      setPatient("admin");
      anyName("/admin");
    } else {
      onRegister(user, pass);
    }
    setUser("");
    setPass("");
  };
  return (
    <div className="container login">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Đăng nhập
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="rememberPasswordCheck"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberPasswordCheck"
                  >
                    Nhớ mật khẩu
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button
                    className="btn btn-google btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    <i className="fab fa-google me-2"></i> Đăng nhập bằng Google
                  </button>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-facebook btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i> Đăng nhập bằng
                    Facebook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
