import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ListInject from "./components/ListInject";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import RegisterInject from "./components/RegisterInject";
import Register from "./components/Register";
import RouteAdmin from "./admin/RouteAdmin.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const routers = [
  {
    path: "/",
    component: Content,
  },
  {
    path: "/danhsachtiem",
    component: ListInject,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register_inject",
    component: RegisterInject,
  },
  {
    path: "/register",
    component: Register,
  },
];

function App() {
  const anyName = useNavigate();
  const api = "http://localhost:6969";
  const [patient, setPatient] = useState("");
  const onRegister = async (user, pass) => {
    const datas = await axios.post(`${api}/user/login`, {
      username: user,
      password: pass,
    });
    const { username, password } = datas.data;
    if (username === user && password === pass) {
      alert("Đăng nhập thành công!");
      localStorage.setItem("patient", username);
      anyName("/");
      setPatient(user);
    }
  };
  return (
    <div className="App container">
      <Header patient={patient} setPatient={setPatient} />
      <div className="contenets" style={{ minHeight: "75vh" }}>
        <Routes>
          {routers.map((route, index) => {
            return (
              <Route
                path={route.path}
                exact
                element={
                  <route.component onRegister={onRegister} patient={patient} />
                }
                key={index}
              />
            );
          })}
        </Routes>
      </div>
      <RouteAdmin />
      <Footer />
    </div>
  );
}

export default App;
