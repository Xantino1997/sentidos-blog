import React from "react";

export default function ErrorPage() {
  return (
    <div className="error-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd8Ocn7JnRUVP1TkLXNOwQyoMJyEcmE0HZ3A&usqp=CAU"
        alt="Error"
        className="error-image"
      />
      <h1 className="error-title">Error</h1>
      <p className="error-message">
        Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.
      </p>
    </div>
  );
}
