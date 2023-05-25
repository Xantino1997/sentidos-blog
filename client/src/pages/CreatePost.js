import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Editor from "../Editor";
import { UserContext } from "../UserContext";

export default function CreatePost() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("profileAvatar", userInfo.profilePicture);

    try {
      const response = await axios.post(
        "https://backend-blog-psi.vercel.app/post",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      // Manejar errores aquí
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
      <button style={{ marginTop: "5px" }}>Crea tu post</button>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
    </form>
  );
}
