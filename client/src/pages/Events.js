import React, { useState, useEffect, useRef } from "react";
import { isAfter, parseISO, formatDistance, differenceInDays } from "date-fns";

export default function Events() {
  const [events, setEvents] = useState([]);
  const eventRef = useRef(null);

  useEffect(() => {
    fetch("https://backend-blog-psi.vercel.app/getadvice")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error al obtener los eventos:", error);
      });
  }, []);

  const handleShareLink = (event) => {
    const eventIndex = parseInt(event.target.getAttribute("data-index"));
    const eventToShare = events[eventIndex];

    const shareURL = `https://sentidos.vercel.app/events`;
    const selectedNetwork = event.target.getAttribute("data-network");

    if (selectedNetwork === "facebook") {
      shareOnFacebook(shareURL);
    }

    if (selectedNetwork === "whatsapp") {
      shareOnWhatsApp(shareURL);
    }

    if (selectedNetwork === "instagram") {
      shareOnInstagram(shareURL);
    }
  };

  const shareOnFacebook = (url) => {
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookURL, "_blank");
  };

  const shareOnWhatsApp = (url) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let whatsappURL;

    if (isMobile) {
      whatsappURL = `https://api.whatsapp://send?text=${encodeURIComponent(url)}`;
    } else {
      whatsappURL = `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    }

    window.open(whatsappURL, "_blank");
  };

  const shareOnInstagram = (url) => {
    const instagramURL = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
    window.open(instagramURL, "_blank");
  };

  return (
    <>
      <br />
      <br />
      <br />
      <hr />
      <div className="create-event">
        <h1>Nuevos eventos</h1>
        {events.length === 0 ? (
          <div className="no-events">
            <img src="data:image/jpeg;base64,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" alt="Sin eventos" />
            <p>Gracias por visitarnos,no hay eventos recientes pronto publicaremos</p>
          </div>
        ) : (
          <div className="event-list">
            {events.map((event, index) => {
              const eventDate = parseISO(event.eventDate);
              const currentDate = new Date();
              const distance = isAfter(currentDate, eventDate) ? (
                <b>Evento ya pasado</b>
              ) : (
                formatDistance(currentDate, eventDate, { addSuffix: true })
              );
              const daysRemaining = differenceInDays(eventDate, currentDate);

              return (
                <div className="event" key={index} ref={eventRef}>
                  <div className="image-container">
                    <img className="event-image" src={event.image} alt="" />
                  </div>
                  <h2 className="title-info-event">{event.title}</h2>
                  <p>{event.description}</p>
                  <p>
                    <b>El evento tendrá lugar la fecha: {event.eventDate.split("T")[0]}.</b>
                  </p>
                  <p>{distance}</p>
                  {!isAfter(currentDate, eventDate) && (
                    <p style={{ color: "white" }}>
                      <b>Días restantes: {daysRemaining}</b>
                    </p>
                  )}
                  <div className="events-comparte">
                    <h1>Comparte</h1>
                    <div className="events-comparte-redes">
                      <button className="events-comparte-redes-btn" data-index={index} data-network="facebook" onClick={handleShareLink}>
                        Facebook
                      </button>
                      <button className="events-comparte-redes-btn" data-index={index} data-network="whatsapp" onClick={handleShareLink}>
                        WhatsApp
                      </button>
                      <button className="events-comparte-redes-btn" data-index={index} data-network="instagram" onClick={handleShareLink}>
                        Instagram
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <br />
      <hr />
      <br />
      <br />
    </>
  );
}
