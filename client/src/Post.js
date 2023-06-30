import user from './assets/user.png';
import { format } from "date-fns";
import { Link } from "react-router-dom";
// 
import selectedFont from './Editor';

export default function Post({ _id, title,category, summary, cover, content, author, createdAt, profilePicture }) {
  // alert('estas conectado a Post')
  const profileAvatar = profilePicture ? profilePicture : user;
  const titleStyle = {
    fontFamily: selectedFont,
  };
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
        <br></br>
        <br></br>
          <img className="post-picture" src={cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <hr></hr>
        <br></br>
     
        <br></br>
        <br></br>
        <h2 style={titleStyle}>{title}</h2>
        <p className="summary">{summary}</p>
        <Link to={`/post/${_id}`}>
          <button className='ver-completo' >Ver completo</button>
        </Link>
       
        <br></br>
        <hr></hr>
        <img className="profile-picture" src={ profileAvatar} alt="" />
        <h6 className="author">
          <p>Author: {author.username}</p>
          <p>Categoria: {category}</p>
          <time className="post-time-post-page">{format(new Date(createdAt), "PPpp")}</time>
        </h6>
      </div>
    </div>

  );
}
