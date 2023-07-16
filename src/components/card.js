import React from "react";

import "../styles/card.css";

function Card({ emoji }) {
  return (
    <div className="card">
      <p
        dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
        className="emoji-symbol"
      ></p>
      <h3 className="emoji-name">{emoji.name}</h3>
      <div className="emoji-category">{emoji.category}</div>
      <div className="emoji-group">{emoji.group}</div>
      <p className="emoji-code">HTML: {emoji.htmlCode[0]}</p>
      <p className="emoji-code">Unicode: {emoji.unicode[0]}</p>
    </div>
  );
}

export default Card;
