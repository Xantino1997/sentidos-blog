import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si se mostró la alerta de términos y condiciones
    if (showTermsAlert) {
      // Verificar si se aceptaron los términos y condiciones
      if (termsAccepted) {
        // Crear objeto con los datos del formulario, incluyendo el párrafo
        const formData = {
          name,
          email,
          terms: `Yo ${name} acepto los términos y condiciones y soy consciente de lo que mencionan los términos y condiciones de Sentidos. Estoy plenamente consciente de lo expuesto en ellos, los leí y los entendí.`,
        };

        // Enviar datos a la base de datos utilizando fetch
        fetch(`https://backend-blog-psi.vercel.app/suscriptors`, {
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
                setTermsAccepted(false);
              });
            } else {
              // Mostrar ventana emergente de error
              Swal.fire({
                icon: "error",
                title: "Oops... Ocurrió un error",
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
      } else {
        // Mostrar ventana emergente de error si no se aceptaron los términos y condiciones
        Swal.fire({
          icon: "error",
          title: "Oops... Ocurrió un error",
          text: "Debes aceptar los términos y condiciones para continuar."
        });
      }
    } else {
      // Mostrar ventana emergente de términos y condiciones
      Swal.fire({
        title: "Antes de continuar",
        text: "Queremos que leas y aceptes nuestros términos y condiciones.",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          setShowTermsAlert(true);
        }
      });
    }
  };

  return (
    <div className="conteiner-form">

      <form className="footer-form" onSubmit={handleSubmit}>
        <div className="unsuscribe">
          <Link to="/desuscribir" style={{ fontSize: "15px", color: "#fff", textDecoration: "underline" }}>
            Dejar de ser suscriptor
          </Link>
        </div>
        <br />
        <br />
        <hr />
        <hr />
        <h3 className="titulo-form">Suscríbete</h3>
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

        <button className="btn-form-suscribe" type="submit">Enviar</button>
        <br />
        <br />
        <br />
        <hr />
        <br />

        <div className="terminos">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            style={{ fontSize: "10px", color: "#fff", textDecoration: "underline" }}
          />
          <Link to="/term" style={{ fontSize: "15px", color: "#fff", textDecoration: "underline" }}>
            Acepto los términos y condiciones
          </Link>
        </div>
      </form>

    </div>
  );
}
