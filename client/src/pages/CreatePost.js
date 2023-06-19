import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from "../UserContext";


  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("profileAvatar", userInfo.profilePicture);

    try {
      const storedToken = document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));

      if (storedToken) {
        const [, tokenValue] = storedToken.split("=");

        const response = await fetch("https://backend-blog-psi.vercel.app/post", {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          setRedirect(true);
        } else {
          console.log("Error creating post:", response.status);
        }
      } else {
        console.log("Token not found.");
      }
    } catch (error) {
      console.log("Error creating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
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
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create your post</button>
      <br />
      <br />
      <br />
      <hr />
    </form>
  );
}
