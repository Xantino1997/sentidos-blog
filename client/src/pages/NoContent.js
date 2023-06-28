import React from 'react';

export default function NotContent() {
  return (
    <div className="container-not-content">
         <h1 style={{ textAlign: "center" , color:"red"}}>Todavía no se han creado posts</h1>
      <img
        className="post-image"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sEFdzVed37zqfIAX1kEryGtcwAuxFo8xdpuuOkpdA4avqeHdulJXGvSrfgKSFtruAuY&usqp=CAU"
        alt="No se han creado posts"
      />
     
    </div>
  );
}
