import React, { useEffect, useState } from "react";
import Post from "../Post";
import NextPage from "../NextPage";
import right from "../assets/derecha.png";
import left from "../assets/izquierda.png";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [btnLitlePostIndex, setBtnLitlePostIndex] = useState(0);
  const postsPerPage = 3;
  const phrases = [
    <p className="phrase">&ldquo;El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.&rdquo; - Albert Schweitzer</p>,
    <p className="phrase">&ldquo;El único límite para nuestros logros de mañana está en nuestras dudas de hoy.&rdquo; - Franklin D. Roosevelt</p>,
    <p className="phrase">&ldquo;No importa lo que te haya pasado, lo importante es lo que vas a hacer al respecto.&rdquo; - W. Mitchell</p>,
    <p className="phrase">&ldquo;No busques culpables, busca soluciones.&rdquo; - Henry Ford</p>,
    <p className="phrase">&ldquo;El momento en el que realmente te comprometes a algo, la providencia también se pone en movimiento.&rdquo; - Johann Wolfgang von Goethe</p>,
    <p className="phrase">&ldquo;El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar.&rdquo; - Winston Churchill</p>,
    <p className="phrase">&ldquo;El único lugar donde los sueños son imposibles es en tu mente.&rdquo; - Emilio Duró</p>,
    <p className="phrase">&ldquo;No te desanimes. A veces es la última llave del llavero la que abre la puerta.&rdquo; - Paulo Coelho</p>,
    <p className="phrase">&ldquo;El fracaso no es una opción. Todo el mundo tiene que triunfar.&rdquo; - Arnold Schwarzenegger</p>,
    <p className="phrase">&ldquo;El verdadero éxito no se trata solo de hacerlo bien en lo que amas, sino de amar lo que haces.&rdquo; - Maya Angelou</p>
  ];
  
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    fetch("https://backend-blog-psi.vercel.app/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  const handleNext = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex < Math.ceil(posts.length / postsPerPage) - 1 ? prevIndex + 1 : prevIndex
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextLitle = () => {
    setBtnLitlePostIndex((prevIndex) => (prevIndex < posts.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevioushandleNextLitle = () => {
    setBtnLitlePostIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 86,4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const startIndex = currentPostIndex * postsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + postsPerPage);

  const startIndexLitle = btnLitlePostIndex;
  const visiblePostsLitle = posts.slice(startIndexLitle, startIndexLitle + 1);

  return (
    <>
      <div className="post-large">
        <div className="img-about-container-index">
          <p className="phrase">{phrases[currentPhraseIndex]}</p>
        </div>
        <br />
        {visiblePosts.map((post) => (
          <Post className="content-post" key={post._id} {...post} />
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="content-little-post">
        <button className="left" onClick={handlePrevious}>
          <img className="img-left-mini" src={left} alt="Left" />
        </button>
        <button className="right" onClick={handleNext}>
          <img className="img-right-mini" src={right} alt="Right" />
        </button>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div className="litlePost">
        {visiblePostsLitle.map((post) => (
          <NextPage key={post._id} {...post} />
        ))}
        <br />
        <br />
        <br />
      </div>
      <div className="btnLitlePost">
        <button className="litle-left" onClick={handlePrevioushandleNextLitle}>
          <img className="img-left-mini" src={left} alt="Left" />
        </button>
        <button className="litle-right" onClick={handleNextLitle}>
          <img className="img-right-mini" src={right} alt="Right" />
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h2 className="content-little-h2">
        Post {Math.floor(btnLitlePostIndex / 1) + 1} DE {Math.ceil(posts.length / 1)}
      </h2>
      <br />
      <br />
      <br />
    </>
  );
}
