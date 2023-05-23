import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { format } from "date-fns";


export default function NextPage({ _id, title, summary, cover, content, author, createdAt, profilePicture }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    cover,
  ]; // Agrega todas las imágenes aquí
  const imagesPerPage = 3; // Número de imágenes a mostrar por página

  const startIndex = currentImage * imagesPerPage;
  const visibleImages = images.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className="conteiner-post-recents">
      <h2>Post más recientes</h2>
      <div className="visibleImages">
        {visibleImages.map((cover, index) => (
          <div className="indexImage" key={index}>
            <Link to={`/post/${_id}`}>
              <div className="content-image">
                <div className="content-image__img-post">
                  <img
                    className="content-image__img-post__img-post"
                    src={`http://localhost:4000/` + cover}
                    alt="Imagen"
                  />
                </div>
                <h4 className={`h2-post ${title && 'title'}`}>
                  <b>{title}</b>
                </h4>
                <p className={`parrafo-post ${createdAt && 'fecha'}`}>
                  {format(new Date(createdAt), "PPpp")}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
