import React, { useEffect, useState } from "react";
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi"
import "./styles.css"
import api from '../../Services/API'


export default function Profile() {

 const history = useHistory();
 const [Incident, setIncident] = useState([]);
 const ongId = localStorage.getItem("ongId")
 const ongName = localStorage.getItem("ongName");

 useEffect(() => {
  api.get('profile', {
   headers: {
    Authorization: ongId,
   }
  }).then(response => {
   setIncident(response.data);
  })
 }, [ongId]);


 async function handleDeleteIncident(id) {
  try {
   await api.delete(`incident/${id}`, {
    headers: {
     Authorization: ongId,
    }
   });
   setIncident(Incident.filter(incident => incident.id !== id));
  } catch (error) {
   alert("erro ao deletar caso, por favor tente novamente.")
  }
 }
 function handleLogout() {
  localStorage.clear();
  history.push('/');
 };

 return (
  <div className="profile-container">
   <header>
    <img src={logoImg} alt="be the hero" />
    <span>Bem vinda, {ongName} </span>

    <Link className="button" to="/incident/new">Cadastrar Novo Caso</Link>
    <button onClick={handleLogout} type="button">
     <FiPower size={18} color="#E02041" />
    </button>

   </header>

   <h1>Casos Cadastrados</h1>
   <ul>
    {Incident.map(incident => (
     <li key={Incident.id}>
      <strong>CASO:</strong>
      <p>{incident.title}</p>

      <strong>DESCRIÇÃO:</strong>
      <p>{incident.description}</p>

      <strong>VALOR:</strong>
      <p>{Intl.NumberFormat("pt-BR", { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

      <button onClick={() => handleDeleteIncident(incident.id)} type="button">
       <FiTrash2 size={20} color="#A8A8B3" />
      </button>
     </li>
    ))}
   </ul>
  </div >
 );
}
