import React, { useState, useEffect } from "react";
import { isAfter, parseISO, formatDistance, differenceInDays } from "date-fns";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Obtener los eventos desde el backend
    fetch("https://backend-blog-psi.vercel.app/getadvice")
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
              
              <div className="image-container">
                  <img className="event-image" src={event.image} alt="" />
                </div>
                <h2 className="title-info-event">{event.title}</h2>
                <p>{event.description}</p>
                <p><b>El evento tendrá lugar la fecha: {event.eventDate.split('T')[0]}.</b></p>
                <p>{distance}</p>
                {!isAfter(currentDate, eventDate) && (
                  <p style={{ color: "white" }}><b>Días restantes: {daysRemaining}</b></p>
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

