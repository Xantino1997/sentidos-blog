
import { useState } from "react";
import right from "./assets/derecha.png";
import left from "./assets/izquierda.png";
import NextPage from "./NextPage";

export default function PostNext() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = []; // Agrega las imágenes necesarias aquí
    const imagesPerPage = 3; // Número de imágenes a mostrar por página
  
    const handleNext = () => {
      setCurrentImage((prevImage) =>
        prevImage < Math.ceil(images.length / imagesPerPage) - 1
          ? prevImage + 1
          : prevImage
      );
    };
  
    const handlePrevious = () => {
      setCurrentImage((prevImage) => (prevImage > 0 ? prevImage - 1 : prevImage));
    };
  
    return (
      <div>
        <NextPage currentImage={currentImage} images={images}  />
  
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <button
            className="left"
            onClick={handlePrevious}
            disabled={currentImage === 0}
          >
            <img src={left} alt="Previous Page" />
          </button>
  
          <button
            className="right"
            onClick={handleNext}
            disabled={
              currentImage === Math.ceil(images.length / imagesPerPage) - 1
            }
          >
            <img src={right} alt="Next Page" />
          </button>
        </div>
      </div>
    );
  }

  