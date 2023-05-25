import { useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Crear objeto con los datos del formulario
    const formData = {
      name,
      email,
    };

    // Enviar datos a la base de datos utilizando fetch
    fetch("https://backend-blog-psi.vercel.app/api/suscriptores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          // Mostrar ventana emergente de éxito
          Swal.fire({
            icon: "success",
            title: "¡Gracias por suscribirte a nuestro post!",
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            // Limpiar los campos name y email
            setName("");
            setEmail("");
          });
        } else {
          // Mostrar ventana emergente de error
          Swal.fire({
            icon: "error",
            title: "Oops... Ha ocurrido un error",
            text: "Parece que el correo ya existe, intenta otro por favor."
          });
        }
      })
      .catch((error) => {
        // Mostrar ventana emergente de error
        Swal.fire({
          icon: "error",
          title: "Oops... Ha ocurrido un error",
          text: "Por favor, inténtalo de nuevo más tarde."
        });
      });

      setName("");
      setEmail("");
  };

  return (
    <div className="conteiner-form">
      <form className="footer-form" onSubmit={handleSubmit}>
        <br />
        <br />
        <hr />
        <hr />
        <h3 className="titulo-form">Suscribe</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Enviar</button>
        <br />
        <br />
        <hr />
        <br />
        <hr />
      </form>
    </div>
  );
}
