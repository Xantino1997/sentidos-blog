import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();



  useEffect(() => {
<<<<<<< HEAD
    fetch(`https://sentidos-back-blog.vercel.app/post/` + id)
=======
    fetch(`http://localhost:4000/post/` + id)
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);

        });
      });
  }, [id]); // agregamos id como dependencia para que se vuelva a cargar cuando cambie



  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )
      }
      <div className="image">
<<<<<<< HEAD
        <img className="post-final" src={`https://sentidos-back-blog.vercel.app/${postInfo.cover}`} alt="" />
=======
        <img className="post-final" src={`http://localhost:4000/${postInfo.cover}`} alt="" />
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      <br></br>
      <br></br>
      <br></br>
    </div >
  );
}

