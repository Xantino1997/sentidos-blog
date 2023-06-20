import React, { useEffect, useState } from "react";
import Post from "../Post";
import NextPage from "../NextPage";
// import FindPost from "../FindPost";
import right from "../assets/derecha.png";
import left from "../assets/izquierda.png";
// import sentidos1 from "../assets/sentidos1.png";
import sentidos2 from "../assets/sentidos2.png";
import sentidos3 from "../assets/sentidos3.png";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [btnLitlePostIndex, setBtnLitlePostIndex] = useState(0);
  const postsPerPage = 3;

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

  const startIndex = currentPostIndex * postsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + postsPerPage);

  const startIndexLitle = btnLitlePostIndex;
  const visiblePostsLitle = posts.slice(startIndexLitle, startIndexLitle + 1);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPage = Math.floor(currentPostIndex + 1);

  return (
    <>
      {/* <FindPost/> */}
      <div className="post-large">
        <div className="img-move">
          <img className="img-min2" src={sentidos2} alt="sentidos" />
          <div className="sentidos-move">
            <h1>Sentidos</h1>
            <p className="sentidos-move-sub">Asociación Chicos con Flap</p>
          </div>
          <img className="img-min3" src={sentidos3} alt="sentidos" />
        </div>
        <br></br>
        {visiblePosts.map((post) => (
          <Post className="content-post" key={post._id} {...post} />
        ))}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
        <div className="btnLitlePost">

          <button className="litle-left" onClick={handlePrevioushandleNextLitle}>
            <img className="img-left-mini" src={left} alt="Left" />
          </button>

          <button className="litle-right" onClick={handleNextLitle}>
            <img className="img-right-mini" src={right} alt="Right" />
          </button>
        </div>
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
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />
    </>
  );
}
