// Log.jsx
import React from "react";

function Log({ logs }) {
  return (
    <section id="log" className="container">
      <ul>
        {logs.map((log, index) => {
          const entityName = log.isPlayer ? "Player" : "Monster";
          return (
            <li key={index}>
              <span className={log.isPlayer ? "log--player" : "log--monster"}>
                {entityName}
              </span>{" "}
              <span className={log.type === "heal" ? "log--heal" : "log--damage"}>
                {log.text.replace(entityName + " ", "")}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Log;