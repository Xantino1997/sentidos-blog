
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

  useEffect(() => {
    fetch(`https://backend-blog-psi.vercel.app/post/` + id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    try {
      ev.preventDefault();
      const data = new FormData();
      data.append('title', title);
      data.append('summary', summary);
      data.append('content', content);
      data.append('id', id);
      if (files?.[0]) {
        data.append('file', files[0]);
      }

      const token = sessionStorage.getItem('token');

      const response = await fetch(`https://backend-blog-psi.vercel.app/post/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.log(error);
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input type="file" onChange={ev => setFiles(ev.target.files)} />
      <Editor
        onChange={setContent}
        value={content}
      />
      <button style={{ marginTop: '5px' }}>Update post</button>
      <br />
      <br />
      <br />
      <hr />
    </form>
  );
}


