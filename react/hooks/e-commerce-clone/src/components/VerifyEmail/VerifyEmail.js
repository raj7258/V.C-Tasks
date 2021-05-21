import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VERIFY_USER_URL } from "../../Api/ApiRoutes";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios
      .post(VERIFY_USER_URL, { id })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  }, [id]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
