import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import { TokenContext } from "../TokenProvider";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  // Obtener el token del contexto
  const token = useContext(TokenContext);
console.log(token + 'el token de EDITPOST')

useEffect(() => {
  console.log("Valor actualizado del token:", token);
}, [token]);

  useEffect(() => {
    fetch(`https://backend-blog-psi.vercel.app/post/` + id, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
      },
    })
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, [id, token]); // Agregar 'token' como dependencia del efecto

  async function updatePost(ev, err) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(`https://backend-blog-psi.vercel.app/post`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
      },
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Imprimir el token en la consola
  console.log('Este es el token del login:', token);

  // Redireccionar
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
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update post</button>
      <br /><br /><br /><hr />
    </form>
  );
}
