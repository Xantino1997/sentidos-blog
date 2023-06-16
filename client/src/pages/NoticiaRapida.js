import React, { useState } from "react";
import Editor from "../Editor";

export default function NoticiaRapida() {
  const [titulo, setTitulo] = useState("");
  const [parrafo, setParrafo] = useState("");
  const [foto, setFoto] = useState(null);

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleParrafoChange = (event) => {
    setParrafo(event.target.value);
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    setFoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear un objeto FormData para enviar los datos de la noticia
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("parrafo", parrafo);
    formData.append("foto", foto);

    try {
      // Realizar la solicitud POST al backend utilizando fetch
      await fetch("https://backend-blog-psi.vercel.app/notice", {
        method: "POST",
        body: formData,
      });

      // Reiniciar los valores del formulario después de enviar la noticia.
      setTitulo("");
      setParrafo("");
      setFoto(null);

      // Realizar cualquier acción adicional después de enviar la noticia
      alert("Noticia enviada correctamente");
    } catch (error) {
      // Manejar cualquier error de la solicitud
      console.error("Error al enviar la noticia:", error);
      alert("Error al enviar la noticia");
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <hr />
      <div>
        <h2>Crear Noticia</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={handleTituloChange}
            />
          </div>
          <div>
            <label htmlFor="parrafo">Párrafo:</label>
            <textarea
              id="parrafo"
              value={parrafo}
              onChange={handleParrafoChange}
            />
          </div>
          <div>
            <label htmlFor="foto">Foto:</label>
            <input
              type="file"
              id="foto"
              accept="image/*"
              onChange={handleFotoChange}
            />
          </div>

          <Editor />

          <button type="submit">Enviar Noticia</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <hr />
    </>
  );
}
