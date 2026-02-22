import React, { useState } from "react";

export default function Input({ onSend }) {
  const [text, setText] = useState("");
  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };
    const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };
  return (
    <div className="input-container">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyPress} placeholder="¿Cual es tu consulta de hoy?"/>
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
