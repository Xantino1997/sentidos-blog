import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';
import LikeToPost from "../LikeToPost";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://backend-blog-psi.vercel.app/post/` + id)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  if (!postInfo) return '';

  const handleShare = (network) => {
    const shareURL = window.location.href;

    if (network === "facebook") {
      shareOnFacebook(shareURL);
    }

    if (network === "whatsapp") {
      shareOnWhatsApp(shareURL);
    }

    if (network === "twitter") {
      shareOnTwitter(shareURL);
    }
  };

  const shareOnFacebook = (url) => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookURL, "_blank");
  };

  const shareOnWhatsApp = (url) => {
    const whatsappURL = `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(whatsappURL, "_blank");
  };

  const shareOnTwitter = (url) => {
    const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(twitterURL, "_blank");
  };

  return (
    <div className="post-page">
      <h1 className="title-post-page">{postInfo.title}</h1>
      <time className="time-post-page">{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <button className="edit-post-btn">
            <Link to={`/edit/${postInfo._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit this post
            </Link>
          </button>
        </div>
      )}
      <div className="image">
        <img className="post-final" src={`https://backend-blog-psi.vercel.app/${postInfo.cover}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

      <div className="events-comparte-redes-post">
        <button className="events-comparte-redes-btn" onClick={() => handleShare("facebook")}>
          Comparte en Facebook
        </button>
        <button className="events-comparte-redes-btn" onClick={() => handleShare("whatsapp")}>
          Comparte en WhatsApp
        </button>
        <button className="events-comparte-redes-btn" onClick={() => handleShare("twitter")}>
          Comparte en Twitter
        </button>
      </div>

      <br />
      <br />
      <br />
      {/* <LikeToPost /> */}
      <br />
      <br />
      <br />
    </div>
  );
}
