import React, { useState } from "react";
import './styles.css'
import { Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import heroesImg from "../../assets/heroes.png"
import { FiLogIn } from 'react-icons/fi';
import api from '../../Services/API'

export default function Logon() {
  const [id, setID] = useState('');
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('session', { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile")
    }
    catch (error) {
      alert("Falha no login")
    }

  }



  return (
    <div className="logon-container">
      <section className="form">

        <img src={logoImg} alt="be the hero" />

        <form onSubmit={handleLogin}>

          <h1>Faça seu Logon</h1>

          <input placeholder='Sua ID'
            value={id}
            onChange={e => setID(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className=".back-link" to="./register">
            <FiLogIn size={18} color="#E02041" />
            Não tenho cadastro
          </Link>

        </form>
      </section>

      <img src={heroesImg} alt='Heroes' />

    </div>
  );
}