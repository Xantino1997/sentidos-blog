import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Desuscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUnsubscribe = async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario y la recarga de la página

    try {
      // Cambiar el valor de email por "desuscripto"
      setEmail(email);

      // Enviar solicitud para desuscribirse al backend utilizando fetch
      const response = await fetch("https://backend-blog-psi.vercel.app/desuscribir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        // Mostrar ventana emergente de éxito
        Swal.fire({
          icon: "success",
          title: "¡Te has desuscrito correctamente!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Mostrar ventana emergente de error
        Swal.fire({
          icon: "error",
          title: "Oops... Ocurrió un error",
          text:
            "No se pudo procesar la solicitud de desuscripción. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    } catch (error) {
      // Mostrar ventana emergente de error
      Swal.fire({
        icon: "error",
        title: "Oops... Ha ocurrido un error",
        text: "Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <div style={{ width: "100%", padding: "25px", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
      <h1>Desuscripción</h1>
      <form className="footer-form" onSubmit={handleUnsubscribe}>
        <br />
        <br />
        <hr />
        <hr />
        <h3 className="titulo-form">Desuscribirse</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {/* <span style={{ marginLeft: "10px" }}>- desuscripto</span> */}
        </div>

        <button className="btn-form-suscribe" type="submit">
          Enviar
        </button>
        <br />
        <br />
        <br />
        <hr />
        <br />

        <div className="terminos">
          <input
            type="checkbox"
            checked
            disabled
            style={{ fontSize: "10px", color: "#fff", textDecoration: "underline" }}
          />
          <Link to="/term" style={{ fontSize: "15px", color: "#fff", textDecoration: "underline" }}>
            Acepto los términos y condiciones
          </Link>
        </div>

        <Link to="/" className="ver-completo">
          Regresar a Sentidos Ong
        </Link>
      </form>
    </div>
  );
}
