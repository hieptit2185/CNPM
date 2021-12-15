import React, { useState } from "react";
import "../asets/css/login.css";
import axios from "axios";

function Login(props) {
  const api = "http://localhost:6969";
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/user/new`, {
      username: user,
      password: pass,
    });
    setUser("");
    setPass("");
    setPass1("");
    setCheck(false);
    setSuccess("Đăng ký thành công!");
  };

  const handleCheck = () => {
    if (pass1 !== pass) {
      setError("Vui lòng nhập lại mật khẩu!");
    }
    if (pass1 === pass) {
      setError("");
    }
  };
  return (
    <div className="container login">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Đăng ký
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
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password Again"
                    value={pass1}
                    onBlur={handleCheck}
                    onChange={(e) => {
                      setPass1(e.target.value);
                    }}
                  />
                  {error && <h6 style={{ color: "red" }}>{error}</h6>}
                  <label htmlFor="floatingPassword">Password Again</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                    id="rememberPasswordCheck"
                    disabled={error || user.trim() === "" ? true : false}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberPasswordCheck"
                  >
                    Bạn đã chắc muốn đăng ký?
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-login text-uppercase fw-bold"
                    type="submit"
                    disabled={check ? false : true}
                  >
                    Đăng ký
                  </button>
                </div>
                <hr className="my-4" />
                {success && alert(success)}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
