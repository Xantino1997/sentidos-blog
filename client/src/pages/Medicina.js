
import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { Link } from "react-router-dom";


export default function LifePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://backend-blog-psi.vercel.app/post')
      .then(response => response.json())
      .then(data => {
        const medicinaPosts = data.filter(post => post.category === 'Medicina');
        setPosts(medicinaPosts);
      })
      .catch(error => {
        console.log('Error fetching posts:', error);
      });
  }, []);

  if (posts.length > 0) {
    return (
        <div style={{ textAlign: "center" , color:"red"}}>
          <h1>Posts de Medicina</h1>
          {posts.map(post => (
            <div key={post._id}>
              <div className="post">
                <div className="image">
                  <br></br>
                  <br></br>
                  <img className="post-picture" src={post.cover} alt="" />
                </div>
                <div className="texts">
                  <hr></hr>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h2>{post.title}</h2>
                  <p className="summary">{post.summary}</p>
                  <Link to={`/post/${post._id}`}>
                    <button className='ver-completo' >Ver completo</button>
                  </Link>
    
                  <br></br>
                  <hr></hr>
                  <img className="profile-picture" src={post.profilePicture} alt="" />
                  <h6 className="author">
                    <p>Autor: {post.author.username}</p>
                    <p>Categoría: {post.category}</p>
                    <time className="time-post-page">{format(new Date(post.createdAt), "PPpp")}</time>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
  }

  return (
    <div className="container-not-content">
      <h1 style={{ textAlign: "center" , color:"red"}}>No se han creado posts en Medicina</h1>
      <img
        className="post-image"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sEFdzVed37zqfIAX1kEryGtcwAuxFo8xdpuuOkpdA4avqeHdulJXGvSrfgKSFtruAuY&usqp=CAU"
        alt="No se han creado posts"
      />
    </div>
  );
}
