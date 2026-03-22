// Entity.jsx
import React from "react";

function Entity({ title, health }) {
  return (
    <section className="container">
      <h2>{title}</h2>
      <div className="healthbar">
        <div
          className="healthbar__value"
          style={{ width: `${health}%` }}
        ></div>
      </div>
    </section>
  );
}

export default Entity;