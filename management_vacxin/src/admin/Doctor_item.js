import React, { useState, useRef, useEffect } from "react";
import { Button } from "reactstrap";

function Doctor_item(props) {
  const { item, _handleDelete, _handleEdit, index } = props;
  const [newpass, setNewpass] = useState(item.password);
  const [edit, setEdit] = useState(false);

  const _toggleEditInput = (e) => {
    setEdit(true);
  };

  const inputRef = useRef();

  const EditPass = () => {
    setEdit(false);
    _handleEdit(item._id, newpass);
  };

  const removeDoctor = () => {
    _handleDelete(item._id);
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(
    (prev) => {
      if (prev !== item.password) {
        setNewpass(item.password);
      }
    },
    [item.password]
  );
  return (
    <>
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.username}</td>
        <td>
          <input
            type="text"
            className="border-0 bg-white"
            style={{ textAlign: "center" }}
            value={newpass}
            onChange={(e) => setNewpass(e.target.value)}
            disabled={!edit}
            onBlur={EditPass}
            ref={inputRef}
          />
        </td>
        <td>{item.create_at}</td>
        <td>
          <Button
            className="mx-2"
            color="primary"
            outline
            onClick={_toggleEditInput}
          >
            Đổi mật khẩu
          </Button>
          <Button color="danger" outline onClick={removeDoctor}>
            Xoá
          </Button>
        </td>
      </tr>
    </>
  );
}

export default Doctor_item;
