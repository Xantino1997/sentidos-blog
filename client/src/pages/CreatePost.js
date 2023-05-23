import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { useContext } from "react";
import { UserContext } from "../UserContext";



export default function CreatePost() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content); 
    data.set("file", files[0]);
    data.set("profileAvatar", userInfo.profilePicture);
    ev.preventDefault();
<<<<<<< HEAD
    const response = await fetch("https://sentidos-back-blog.vercel.app/post", {
=======
    const response = await fetch("http://localhost:4000/post", {
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create post</button>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
    </form>
  );
}
