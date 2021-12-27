import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const anyName = useNavigate();
  const handleOut = () => {
    props.setPatient("");
    localStorage.removeItem("patient");
    anyName("/login");
  };
  return (
    <div>
      {props.patient === "admin" ? (
        <ul className="nav justify-content-center p-4 navbar-dark bg-dark position-relative ">
          <li className="nav-item ">
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/admin"
            >
              Home
            </Link>
          </li>
          <li
            className="nav-item "
            style={{ pointerEvents: props.patient ? "auto" : "none" }}
          >
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/admin/inject"
            >
              Inject
            </Link>
          </li>
          <li
            className="nav-item text-white font-weight-bold"
            style={{ pointerEvents: props.patient ? "auto" : "none" }}
          >
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/admin/vaccine"
            >
              Vaccine
            </Link>
          </li>
          <li
            className="nav-item text-white font-weight-bold"
            style={{ pointerEvents: props.patient ? "auto" : "none" }}
          >
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/admin/doctor"
            >
              Doctor
            </Link>
          </li>
          {props.patient !== "" && (
            <h6
              style={{
                color: "red",
                right: "20px",
                position: "absolute",
                top: "33px",
              }}
            >
              Xin chào {props.patient}
              <Button className="mx-2" onClick={handleOut}>
                Đăng xuất
              </Button>
            </h6>
          )}
        </ul>
      ) : (
        <ul className="nav justify-content-center p-4 navbar-dark bg-dark position-relative ">
          <li className="nav-item ">
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/"
            >
              Trang chủ
            </Link>
          </li>
          <li
            className="nav-item "
            style={{ pointerEvents: props.patient ? "auto" : "none" }}
          >
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/danhsachtiem"
            >
              Danh sách người tiêm
            </Link>
          </li>
          <li
            className="nav-item text-white font-weight-bold"
            style={{ pointerEvents: props.patient ? "auto" : "none" }}
          >
            <Link
              className="nav-link active text-white font-weight-bold"
              aria-current="page"
              to="/register_inject"
            >
              Đăng ký tiêm
            </Link>
          </li>
          <li
            className="nav-item text-white font-weight-bold "
            style={{ pointerEvents: props.patient ? "none" : "auto" }}
          >
            <Link className="nav-link active" aria-current="page" to="/login">
              Đăng nhập
            </Link>
          </li>
          <li
            className="nav-item text-white font-weight-bold"
            style={{ pointerEvents: props.patient ? "none" : "auto" }}
          >
            <Link
              className="nav-link active"
              aria-current="page"
              to="/register"
            >
              Đăng ký
            </Link>
          </li>
          {props.patient !== "" && (
            <div className="d-flex flex-column" style={{position: "absolute",right: "10px",top:'10px'}}>
            <h6 style={{color: "red"}}>
              Xin chào {props.patient}
            </h6>
              <Button className="mx-2" onClick={handleOut}>
                Đăng xuất
              </Button>
            </div> 
          )}
        </ul>
      )}
    </div>
  );
}

export default Header;
