import user from './assets/user.png';
import { format } from "date-fns";
import { Link } from "react-router-dom";
// 
import selectedFont from './Editor';

export default function Post({ _id, title, summary, cover, content, author, createdAt, profilePicture }) {
  // alert('estas conectado a Post')
  const profileAvatar = profilePicture ? profilePicture : user;
  const titleStyle = {
    fontFamily: selectedFont,
  };
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img className="post-picture" src={cover} alt="" />

        </Link>
      </div>
      <div className="texts">
        <hr></hr>
        <br></br>
        <h2 style={titleStyle}>{title}</h2>
        <p className="summary">{summary}</p>
        <Link to={`/post/${_id}`}>
          <button >Ver completo</button>
        </Link>
        <br></br>
        <br></br>
        <br></br>
        <hr></hr>
        <img className="profile-picture" src={ profileAvatar} alt="" />
        <h6 className="author">
          <p>Author: {author.username}</p>
          <time className="time-post-page">{format(new Date(createdAt), "PPpp")}</time>
        </h6>
        <h3 className="sentidos">Sentidos</h3>
      </div>
    </div>

  );
}
