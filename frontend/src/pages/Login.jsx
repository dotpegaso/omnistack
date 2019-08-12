import React, { useState } from "react";
import logo from "../assets/logo.svg";
import style from "./Login.module.scss";
import api from "../services/api";

function Login({ history }) {
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post("/devs", { username });
    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário do Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Login;
