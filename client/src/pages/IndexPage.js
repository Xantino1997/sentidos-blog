import React, { useEffect, useState } from "react";
import Post from "../Post";
import NextPage from "../NextPage";
// import FindPost from "../FindPost";
import right from "../assets/derecha.png";
import left from "../assets/izquierda.png";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const postsPerPage = 3;

  useEffect(() => {
    fetch("https://sentidos-back-blog.vercel.app/post")
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

  const startIndex = currentPostIndex * postsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + postsPerPage);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPage = currentPostIndex + 1;

  const handleNextLitle = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex < Math.ceil(posts.length / postsPerPage) - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevioushandleNextLitle = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const startIndexLitle = currentPostIndex * postsPerPage;
  const visiblePostsLitle = posts.slice(startIndexLitle, startIndexLitle + postsPerPage);

  return (
    <>
      {/* <FindPost/> */}
      <div>
        <h1 style={{ textAlign: "center",fontFamily:"Permanent Marker" }}>BIENVENIDO AL BLOG DE SENTIDOS</h1>
        <br></br>
        <br></br>
        <h2 style={{ textAlign: "center" }}>
          PAGINA {currentPage} DE {totalPages}
        </h2>
        <br></br>
        {visiblePosts.map((post) => (
          <Post className="content-post" key={post._id} {...post} />
        ))}
      </div>
      <br></br>
      <br></br>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="left" onClick={handlePrevious}>
          <img src={left} alt="Left" />
        </button>
        <h2 style={{ marginLeft: "250px" }}>
          PAGINA {currentPage} DE {totalPages}
        </h2>
        <button className="right" onClick={handleNext}>
          <img src={right} alt="Right" />
        </button>
      </div>
      <hr />
      <br />
      <br />
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
        <button className="left" onClick={handlePrevioushandleNextLitle}>
          <img src={left} alt="Left" />
        </button>
        <button className="right" onClick={handleNextLitle}>
          <img src={right} alt="Right" />
        </button>
      </div>
      <hr />
      <br />
      <br />
      <br />
    </>
  );
}
