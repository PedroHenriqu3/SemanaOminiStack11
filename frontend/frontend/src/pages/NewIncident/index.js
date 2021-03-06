import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../Services/API";

export default function New() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory()

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("incident", data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile');
    } catch (err) {
      alert("Erro ao cadastrar novo caso")
    };
  }
  return (
    <div className="new-incident-container">
      <div className="content">

        <section>
          <img src={logoImg} alt="be the hero" />
          <h1>Cadastrar novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className=".back-link" to="/profile">
            <FiArrowLeft size={18} color="#E02041" />
        Voltar para Home
      </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder=" Descrição do Caso"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />


          <button className="button" type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}