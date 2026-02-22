import React from "react";

export default function Chtbot({ mensajes }) {
// función para enviar mensaje del chatbot

  return (
    <div className="chat-container">
      {mensajes.map((mensaje, indice) => (
        // Clase cambia según si es BOT o USUARIO
        <div key={indice} className={ mensaje.tipo === "usuario" ? "mensaje-wrapper usuario" : "mensaje-wrapper bot"}>
          {/* Avatar SOLO para el bot */}
          {mensaje.tipo === "bot" && (
            <img src="./src/img/comentario.png" alt="Bot" className="bot-avatar"/>
          )}
          {/* Burbuja donde se muestra el mensaje */}
          <div className={ mensaje.tipo === "usuario" ? "mensaje usuario": "mensaje bot"}>
            <span>{mensaje.texto}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
