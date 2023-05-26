import React, { useState } from "react";
import Editor from "./Editor";

export default function LikeToPost() {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comment, setComment] = useState("");

    const handleLike = async () => {
        try {
            const response = await fetch("http://localhost:4000/like", {
                method: "POST",
                body: JSON.stringify({ action: "like" }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                setLikes(likes + 1);
            } else {
                // Manejar el error de la solicitud
            }
        } catch (error) {
            console.error(error);
            // Manejar el error de la solicitud
        }
    };

    const handleDislike = async () => {
        try {
            const response = await fetch("http://localhost:4000/like", {
                method: "POST",
                body: JSON.stringify({ action: "dislike" }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                setDislikes(dislikes + 1);
            } else {
                // Manejar el error de la solicitud
            }
        } catch (error) {
            console.error(error);
            // Manejar el error de la solicitud
        }
    };

    const handleCommentSubmit = async (text) => {
        try {
            const response = await fetch("http://localhost:4000/comment", {
                method: "POST",
                body: JSON.stringify({ comment: text }),
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                // Actualizar el estado local con el nuevo comentario
            } else {
                // Manejar el error de la solicitud
            }
        } catch (error) {
            console.error(error);
            // Manejar el error de la solicitud
        }
    };

    return (
        <div>

           
            <div>
                <Editor
                    onChange={(value) => setComment(value)}
                    value={comment}
                    placeholder="Escribe un comentario..."
                    onEnter={handleCommentSubmit}
                />
            </div>
            <div>Likes: {likes}</div>
            <div>Dislikes: {dislikes}</div>
            <div className="">
                <button className="btnLike" onClick={handleLike}>Like</button>
                <button onClick={handleDislike}>Dislike</button>
            </div>
        </div>
    );
}
