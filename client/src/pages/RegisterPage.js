import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  async function register(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append(
      "profilePicture",
      profilePicture ? profilePicture : await fetch("/user.png").then((r) => r.blob())
    );
<<<<<<< HEAD
    const response = await fetch(`https://sentidos-back-blog.vercel.app/register`, {
=======
    const response = await fetch(`http://localhost:4000/register`, {
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      method: "POST",
      body: formData,
    });
    console.log(response);
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  }

  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.files[0]);
  }

  function handleChooseFile() {
    document.getElementById("fileInput").click();
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="button" onClick={handleChooseFile}>
        Choose Profile Picture
      </button>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleProfilePictureChange}
      />
      <img
        src={profilePicture ? URL.createObjectURL(profilePicture) : "/user.png"}
        alt="Profile"
        className="userDefault"
      />
      <button>Register</button>
      <br />
      <br />
      <br />
    </form>
  );
}
