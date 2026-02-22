import React, { useState, useRef, useEffect } from "react";
import Chtbot from "./componentes/Chtbot.jsx";
import Input from "./componentes/Input.jsx";
import { PR } from "./datos/PR.js";
import "./App.css";

export default function App() {
  // Usuario actual
  const [usuario, setUsuario] = useState("Usuario");
  // Modal login
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [nombreTemp, setNombreTemp] = useState("");
  // Mensajes del chat
  const [mensajes, setMensajes] = useState([
    { tipo: "bot", texto: `Hola ${usuario}, ¿Que dudas solventaremos este dia?` }]);
  const finChatRef = useRef(null);
  //Auto-scroll 
  useEffect(() => {
    finChatRef.current?.scrollIntoView({ behavior: "smooth" });}, [mensajes]);
  
    //ENCARGADO DEL ENVIO DEL MENSAJE
/*INICIO*/  

const handleSend = (usarTexto) => {
  setMensajes(prev => [
    ...prev,
    { tipo: "usuario", texto: usarTexto }]);
    const textoUsuario = usarTexto.toLowerCase();
    let r = "Lo siento. No tengo una respuesta para eso.";
    

    /*INICIO DE LA BUSQUEDA DE LAS COINCIDENCIAS DE PALABRAS CLAVE DE PR.JS*/
   for (let faq of PR) {
  const coincidencia = faq.p.some(palabra =>
    textoUsuario.includes(palabra.toLowerCase().replace(/\s+/g, ''))
  );
  if (coincidencia) {
    r = faq.r;
    break;
  }
}
    /*FIN DE LA BUSQUEDA DE LAS COINCIDENCIAS DE PALABRAS CLAVE*/

  setTimeout(() => {
    setMensajes(prev => [
      ...prev,
      { tipo: "bot", texto: r }]);},300);}; //TIEMPO DE ESPERA DE RESPUESTA DEL BOT osea 3 milisegundos
/*FIN*/  

return (
    <div className="layout">
      {/* Header */}
      <div className="header">
        <div className="title">
          <img src="./src/img/sin.png" alt="Logo" />
          <h2>Asistente Virtual</h2>
        </div>
        {/* Usuario */}
        <div className="user" onClick={() => setMostrarLogin(true)}>
          {usuario}
        </div>
      </div>
      {/* Chat */}
      <div className="chat-area">
        <Chtbot mensajes={mensajes} />
        {/*Marcador invisible al final */}
        <div ref={finChatRef}></div>
      </div>
      {/* Input */}
      <Input onSend={handleSend} />
      {/* Ingresar nombre de usuario */}
      {mostrarLogin && (
        <div className="modal-overlay">
          <div className="modal-login">
            <h3>Ingresar Usuario</h3>
            <input
              type="text" placeholder="Ingresa tu nombre" value={nombreTemp} onChange={(e) => setNombreTemp(e.target.value)}/>
              <div className="modal-botones">
              {/* Aceptar */}
              <button onClick={() => {
                if (nombreTemp.trim() !== "") {
                  const nuevoNombre = nombreTemp;
                  setUsuario(nuevoNombre);
                  // Nuevo saludo
                  setMensajes([{
                    tipo: "bot", texto: `Hola ${nuevoNombre}, ¿Que dudas solventaremos este dia?`}]);
                  setNombreTemp("");
                  setMostrarLogin(false);}}}>
                Aceptar
              </button>
              {/* Cancelar */}
              <button
                className="cancelar" onClick={() => setMostrarLogin(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
