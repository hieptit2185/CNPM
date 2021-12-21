import React, { useState, useEffect } from "react";
import "../asets/css/register.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function RegisterInject() {
  const [startDate, setStartDate] = useState("");
  const [vaccine, setVaccine] = useState([]);
  const [nameVaccine, setNameVaccine] = useState("");
  const [sex, setSex] = useState("");
  const [city, setCity] = useState("");
  const [citys, setCitys] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateInject, setDateInject] = useState("");
  const [shift, setShift] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [inject, setInject] = useState("");
  const [check, setCheck] = useState(false);
  const api = "http://localhost:6969";
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/").then((res) => {
      setCitys(res.data);
    });
    axios.get(`${api}/vaccine`).then((res) => {
      setVaccine(res.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inject &&
      name &&
      startDate &&
      sex &&
      phone &&
      email &&
      adress &&
      city &&
      dateInject &&
      shift &&
      nameVaccine
    ) {
      await axios.post(`${api}/inject/new`, {
        name,
        birthday: startDate,
        sex,
        phone,
        email,
        adress,
        city,
        date_inject: dateInject,
        shift,
        inject,
        vaccine: nameVaccine,
      });
      alert("Đăng ký thành công!");
    }
    if (
      !(name,
      startDate,
      sex,
      phone,
      email,
      adress,
      city,
      dateInject,
      shift,
      inject,
      nameVaccine)
    ) {
      alert(" Vui lòng nhập đủ thông tin");
    }
    setName("");
    setStartDate("");
    setSex("");
    setPhone("");
    setEmail("");
    setAdress("");
    setCity("");
    setDateInject("");
    setShift("");
    setInject("");
    setNameVaccine("");
    setCheck(false);
  };

  return (
    <div>
      <center className="mb-3">Đăng ký tiêm</center>
      <form
        className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="col-md-3">
          <label className="form-label">
            Đăng ký mũi tiêm thứ <span style={{ color: "red" }}>(*)</span>
          </label>
          <div className="input-group has-validation">
            <select
              className="form-select"
              id="validationCustom04"
              value={inject}
              onChange={(e) => setInject(e.target.value)}
            >
              <option disabled></option>
              <option value="1">Mũi tiêm thứ nhất</option>
              <option value="2">Mũi tiêm thứ hai</option>
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <h6 style={{ fontWeight: "bold" }}>
            1. Thông tin người đăng ký tiêm
          </h6>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom01" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => {
              !Number(e.target.value) && setName(e.target.value);
            }}
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom02" className="form-label">
            Ngày sinh
          </label>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={new Date()}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustomUsername" className="form-label">
            Giới tính
          </label>
          <div className="input-group has-validation">
            <select
              className="form-select"
              id="validationCustom04"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option disabled></option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustomUsername" className="form-label">
            Số điện thoại
          </label>
          <div className="input-group has-validation">
            <input
              type="number"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom05" className="form-label">
            E-mail
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">
            Địa chỉ hiện tại
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            placeholder="Địa chỉ hiện tại"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
            Tỉnh thành phố
          </label>
          <select
            className="form-select"
            id="validationCustom04"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option disabled></option>
            {citys.length > 0 &&
              citys.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-12">
          <h6 style={{ fontWeight: "bold" }}>
            2. Thông tin đăng ký tiêm chủng
          </h6>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom02" className="form-label">
            Ngày muốn được tiêm
          </label>
          <DatePicker
            className="form-control"
            selected={dateInject}
            onChange={(date) => setDateInject(date)}
            minDate={new Date()}
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustomUsername" className="form-label">
            Buổi tiêm mong muốn
          </label>
          <div className="input-group has-validation">
            <select
              className="form-select"
              id="validationCustom04"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option disabled></option>
              <option value="Sáng">Buổi sáng</option>
              <option value="Chiều">Buổi chiều</option>
              <option value="Full">Cả ngày</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
            Loại Vaccine mong muốn
          </label>
          <select
            className="form-select"
            id="validationCustom04"
            required
            value={nameVaccine}
            onChange={(e) => setNameVaccine(e.target.value)}
          >
            <option disabled></option>
            {vaccine.length > 0 &&
              vaccine.map((item, index) => (
                <option key={index} value={item.nameVaccine}>
                  {item.nameVaccine}
                </option>
              ))}
          </select>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
              id="invalidCheck"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              Bạn đã chắc chắn với các thông tin đã điền
            </label>
          </div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary "
            type="submit"
            disabled={check ? false : true}
          >
            Đăng ký tiêm
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterInject;
