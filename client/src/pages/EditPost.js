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
  const [selectedFont, setSelectedFont] = useState("Arial");
  useEffect(() => {
<<<<<<< HEAD
    fetch(`https://sentidos-back-blog.vercel.app/post/` + id,)
=======
    fetch(`http://localhost:4000/post/` + id,)
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

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
<<<<<<< HEAD
    const response = await fetch('https://sentidos-back-blog.vercel.app/post', {
=======
    const response = await fetch('http://localhost:4000/post', {
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  // redirect
  if (redirect) {
    return <Navigate to={'/post/' + id} />
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
      <Editor onChange={setContent} value={content}
        selectedFont={selectedFont} />
      <button style={{ marginTop: '5px' }}>Update post</button>
      <br></br><br></br><br></br><hr></hr>
    </form>
  );
}