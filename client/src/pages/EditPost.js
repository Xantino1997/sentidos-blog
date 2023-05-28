import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
const { v4: uuidv4 } = require('uuid');

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");
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

  async function updatePost(ev, err) {
    try {
      ev.preventDefault();
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id', id);
      if (files?.[0]) {
        data.set('file', files?.[0]);
      }
      console.log(id, title, content, summary, data);

      const response = await fetch('https://backend-blog-psi.vercel.app/post', {
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': `multipart/form-data`,
        },
        credentials: 'include',
      });
      const responseData = await response.json();
      console.log(responseData);

      console.log(response + ' La respuesta luego del FETCH DEL PUT')
      if (response.ok) {
        setRedirect(true);
      } else {
        console.log(err + 'AQUIE ESTA EL ERROR DEL PUT LUEGO DE LA RESPUESTA')
        throw new Error('Failed to update post');

      }
    } catch (error) {
      console.log(error + 'ERROR DEL FRONT');
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
  }


  // redirect
  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input type="file" onChange={ev => setFiles(ev.target.files)} />
      <Editor
        onChange={setContent}
        value={content}
        selectedFont={selectedFont}
      />
      <button style={{ marginTop: '5px' }}>Update post</button>
      <br />
      <br />
      <br />
      <hr />
    </form>
  );
}
