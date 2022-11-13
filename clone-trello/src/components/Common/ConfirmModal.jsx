import React, { useState } from "react";
import Swal from "sweetalert2";

const ConfirmModal = (props) => {
  const { title, content, show, onAction, onUpdateColumn } = props;
  const modalShowConfirm = () => {
    Swal.fire({
      title: title,
      text: content,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdateColumn();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        onAction();
      }
    });
  };

  return show && <div>{modalShowConfirm()}</div>;
};

export default ConfirmModal;
