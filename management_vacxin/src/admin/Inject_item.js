import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button } from "reactstrap";

function Inject_item(props) {
  const { index, injects, _handleDelete, _handleUpdate } = props;
  const [edit, setEdit] = useState(false);
  const [birthday, setBirthday] = useState(
    moment(injects.birthday).format("DD/MM/YYYY")
  );
  const [nameVaccine, setNameVaccine] = useState(injects.vaccine);
  const [sex, setSex] = useState(injects.sex);
  const [city, setCity] = useState(injects.city);
  const [name, setName] = useState(injects.name);
  const [phone, setPhone] = useState(`0${injects.phone}`);
  const [dateInject, setDateInject] = useState(
    moment(injects.date_inject).format("DD/MM/YYYY")
  );
  const [shift, setShift] = useState(injects.shift);
  const [email, setEmail] = useState(injects.email);
  const [adress, setAdress] = useState(injects.adress);
  const values = {
    name,
    birthday,
    nameVaccine,
    sex,
    city,
    phone,
    dateInject,
    shift,
    email,
    adress,
  };
  const onRemove = () => {
    _handleDelete(injects._id);
  };

  const handleFocus = () => {
    setEdit(true);
  };

  const handleEdit = (id) => {
    _handleUpdate(id, values);
    setEdit(false);
  };

  useEffect(
    (prev) => {
      if (prev !== injects.name) {
        setName(injects.name);
      }
    },
    [injects.name]
  );
  return (
    <>
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          <input
            type="text"
            value={name}
            className="border-0 bg-white"
            style={{ textAlign: "center" }}
            disabled={!edit}
            onBlur={() => handleEdit(injects._id)}
            onChange={(e) => setName(e.target.value)}
          />
        </td>
        <td>{birthday}</td>
        <td>{sex}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{adress}</td>
        <td>{city}</td>
        <td>{injects.inject}</td>
        <td>{dateInject}</td>
        <td>{shift}</td>
        <td>{nameVaccine}</td>
        <td>
          <Button
            color="primary"
            className="mx-2"
            outline
            onClick={handleFocus}
          >
            Sửa
          </Button>
          <Button color="danger" outline onClick={onRemove}>
            Xoá
          </Button>
        </td>
      </tr>
    </>
  );
}

export default Inject_item;
