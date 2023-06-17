import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function CreateEvent() {
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState({
    title: "",
    image: null,
    imageUrl: "",
    description: ""
  });

  const { userInfo } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setEventInfo((prevEventInfo) => ({
      ...prevEventInfo,
      image: file,
      imageUrl: imageUrl
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: eventInfo.title,
      image: eventInfo.image,
      imageUrl: eventInfo.imageUrl,
      description: eventInfo.description
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    // Limpia el formulario después de enviar
    setEventInfo({
      title: "",
      image: null,
      imageUrl: "",
      description: ""
    });
  };

  return (
    <div className="create-event">
      <h1>Nuevos eventos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título del evento:
          <input
            type="text"
            name="title"
            value={eventInfo.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Imagen del evento:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {eventInfo.imageUrl && (
            <div className="image-preview">
              <img src={eventInfo.imageUrl} alt="Preview" />
            </div>
          )}
        </label>
        <label>
          Descripción del evento:
          <textarea
            name="description"
            value={eventInfo.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Agregar evento</button>
      </form>
      <div className="event-list">
        {events.map((event, index) => (
          <div className="event" key={index}>
            <img src={event.imageUrl} alt="" />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}