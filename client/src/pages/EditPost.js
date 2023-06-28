import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [category, setCategory] = useState(""); // Agregada la categoría


  useEffect(() => {
    const storedToken = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("token="));


    if (storedToken) {
      const [, tokenValue] = storedToken.split("=");
      fetch(`/post/` + id, {
        headers: {
          Authorization: `Bearer ${tokenValue}`, // Utilizar el token obtenido de la cookie
        },
        credentials: "include"
      })
        .then(response => {
          response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
          });
        });
    }
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set("category", category); // Agregada la categoría al FormData
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const storedToken = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("token="));

    if (storedToken) {
      const [, tokenValue] = storedToken.split("=");
      const response = await fetch('https://backend-blog-psi.vercel.app/post', {
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${tokenValue}`, // Utilizar el token obtenido de la cookie
        },
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
        onChange={ev => setFiles(ev.target.files)} />
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
      >
        <option value="">Select a category</option>
        <option value="Medicina">Medicina</option>
        <option value="Psicologia">Psicologia</option>
        <option value="Life">Vida Cotidiana</option>
        <option value="Bullying">Bullying</option>
        <option value="Asesoramiento">Asesoramiento</option>
      </select>
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update post</button>
      <br /><br /><br /><hr />
    </form>
  );
}
