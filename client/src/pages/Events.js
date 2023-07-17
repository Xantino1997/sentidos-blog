import React, { useState, useEffect, useRef } from "react";
import { isAfter, parseISO, formatDistance, differenceInDays } from "date-fns";

export default function Events() {
  const [events, setEvents] = useState([]);
  const eventRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:4000/getadvice")
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

    if (selectedNetwork === "twitter") {
      shareOnTwitter(shareURL);
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

  const shareOnTwitter = (url) => {
    const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(twitterURL, "_blank");
  };

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
                    <button className="events-comparte-redes-btn" data-index={index} data-network="twitter" onClick={handleShareLink}>
                      Twitter
                    </button>
                  </div>
                </div>
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
