import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import axios from "axios";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");

  useEffect(() => {
    axios.get(`https://backend-blog-psi.vercel.app/post/${id}`)
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  async function updatePost(ev, err) {
    try {
      ev.preventDefault();
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("id", id);
      if (files?.[0]) {
        data.set("file", files?.[0]);
      }

      const response = await axios.put(`https://backend-blog-psi.vercel.app/post/${id}`, data, {
        withCredentials: true,
      });

      console.log(response.data + " La respuesta luego del PUT");

      if (response.status === 200) {
        setRedirect(true);
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error(error + " ERROR DEL FRONT");
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  }

  // redirect
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} selectedFont={selectedFont} />
      <button style={{ marginTop: "5px" }}>Update post</button>
      <br />
      <br />
      <br />
      <hr />
    </form>
  );
}
