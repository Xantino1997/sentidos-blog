import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [category, setCategory] = useState(""); // Agregada la categoría

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend-blog-psi.vercel.app/post/${id}`);
        if (response.ok) {
          const postInfo = await response.json();
          setTitle(postInfo.title);
          setSummary(postInfo.summary);
          setContent(postInfo.content);
          setCategory(postInfo.category);
        }
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("category", category); // Agregada la categoría al FormData
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await fetch(`https://backend-blog-psi.vercel.app/post/`+id, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      }
    } catch (error) {
      console.log("Error updating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
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
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
