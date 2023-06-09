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

    try {
      const response = await fetch("https://backend-blog-psi.vercel.app/register", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        alert("Registration successful");
        console.log("User document:", data.user);
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred during registration");
    }
  }

  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.files[0]);
  }

  function handleChooseFile() {
    document.getElementById("fileInput").click();
  }

  function handleFocus(ev) {
    ev.target.classList.add("slide-up");
  }

  function handleBlur(ev) {
    if (ev.target.value === "") {
      ev.target.classList.remove("slide-up");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        className="register-username"
        onChange={(ev) => setUsername(ev.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="register-password"
        onChange={(ev) => setPassword(ev.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
