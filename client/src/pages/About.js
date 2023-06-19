import React, { useState, useEffect } from "react";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import about3 from "../assets/sentidos.png";
// import "../styles/About.css"; // Archivo CSS para los estilos adicionales

export default function About() {
  const images = [about1, about3, about2]; // Array de imágenes con el orden cambiado
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la imagen actual

  useEffect(() => {
    // Función para avanzar al siguiente índice de imagen
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Avanzar al siguiente índice cada 2 segundos
    const interval = setInterval(nextImage, 6000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="about">
      <div className="video-container">
        <iframe className="video-player"
          src="https://www.youtube.com/embed/dHdwp_uPdXw"
          title="Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-container">
        <h2>About us</h2>
        <p>
          Asociación Sentidos es una ONG dedicada a apoyar a niños con flap. Nos
          enfocamos en brindarles el apoyo necesario para su desarrollo y
          bienestar. Nuestro objetivo es mejorar la calidad de vida de estos
          niños y sus familias, proporcionando recursos, terapias y actividades
          adaptadas a sus necesidades.
        </p>
      </div>
      <div className="img-about-container">
        {images.map((image, index) => (
          <img
            key={index}
            className={`img-about-inside ${
              index === currentIndex ? "active" : ""
            }`}
            src={image}
            alt={`Imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
  ;
}
