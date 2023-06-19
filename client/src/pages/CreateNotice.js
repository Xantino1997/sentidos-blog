import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { addDays, formatISO, isAfter, parseISO, formatDistance, differenceInDays } from "date-fns";
import Swal from "sweetalert2";


export default function CreateNotice() {
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState({
    title: "",
    image: null,
    imageUrl: "",
    description: "",
    eventDate: ""
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

    const data = new FormData();
    data.append("title", eventInfo.title);
    data.append("image", eventInfo.image);
    data.append("description", eventInfo.description);
    data.append("eventDate", eventInfo.eventDate);

    // Envía los datos del evento al backend utilizando fetch con credenciales obtenidas de cookies
    fetch("https://backend-blog-psi.vercel.app/createadvice", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${userInfo.token}` // Agrega el token de autenticación en los headers
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        // Agrega el evento creado a la lista de eventos
        setEvents((prevEvents) => [...prevEvents, data]);

        // Limpia el formulario después de enviar
        setEventInfo({
          title: "",
          image: null,
          imageUrl: "",
          description: "",
          eventDate: ""
        });

        // Muestra un mensaje de éxito
        Swal.fire({
          title: "Éxito",
          text: "Se ha creado el evento",
          icon: "success"
        });
      })
      .catch(error => {
        console.error("Error al crear el evento:", error);
        // Muestra un mensaje de error
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el evento",
          icon: "error"
        });
      });
  };

  const handleDelete = (index, eventId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El evento será eliminado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el evento del backend
        fetch(`https://backend-blog-psi.vercel.app/deleteadvice/${eventId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${userInfo.token}` // Agrega el token de autenticación en los headers
          }
        })
          .then(response => response.json())
          .then(data => {
            // Eliminar el evento de la lista de eventos en el frontend
            setEvents((prevEvents) => {
              const updatedEvents = [...prevEvents];
              updatedEvents.splice(index, 1);
              return updatedEvents;
            });
            Swal.fire("Eliminado", "El evento ha sido eliminado", "success");
          })
          .catch(error => {
            console.error("Error al eliminar el evento:", error);
            // Manejar el error de alguna forma (mostrar mensaje de error, etc.)
          });
      }
    });
  };

  useEffect(() => {
    // Obtener los eventos guardados desde el backend
    fetch("https://backend-blog-psi.vercel.app/getadvice", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${userInfo.token}` // Agrega el token de autenticación en los headers
      }
    })
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error("Error al obtener los eventos:", error);
        // Manejar el error de alguna forma (mostrar mensaje de error, etc.)
      });
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <hr />
      <div className="create-event">
        <h1>Nuevos eventos</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <b>Título del evento:</b>
            <input
              type="text"
              name="title"
              value={eventInfo.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <b>Imagen del evento:</b>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {eventInfo.imageUrl && (
              <div className="image-preview">
                <img
                  className="preview-image"
                  src={eventInfo.imageUrl}
                  alt="Preview"
                />
              </div>
            )}
          </label>
          <label>
            <b>Descripción del evento:</b>
            <textarea
              name="description"
              value={eventInfo.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <b>Fecha del evento:</b>
            <input
              type="date"
              name="eventDate"
              value={eventInfo.eventDate}
              onChange={handleInputChange}
            />
          </label>
          <button className="evento-nuevo" type="submit">
            <b>Agregar evento</b>
          </button>
        </form>
        <div className="event-list">
          {events.map((event, index) => {
            const eventDate = parseISO(event.eventDate);
            const currentDate = new Date();
            const distance = isAfter(currentDate, eventDate)
              ? <b>Evento ya pasado</b>
              : formatDistance(currentDate, eventDate, { addSuffix: true });

            const daysRemaining = differenceInDays(eventDate, currentDate);

            return (
              <div className="event" key={index}>
                <span
                  className="delete-button"
                  onClick={() => handleDelete(index, event._id)}
                >
                  X
                </span>
                <div className="image-container">
                  <img className="event-image" src={event.image} alt="" />
                </div>
                <h2 className="title-info-event">{event.title}</h2>
                <p>{event.description}</p>
                <p><b>Este evento tendrá lugar la fecha: {event.eventDate}</b></p>
                <p>{distance}</p>
                {!isAfter(currentDate, eventDate) && (
                  <p style={{ color: "red" }}><b>Días restantes: {daysRemaining}</b></p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <hr />
      <br />
      <br />
    </>
  );
}
