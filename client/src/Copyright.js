import React from 'react';

function Copyright() {
  const year = new Date().getFullYear();
  const organizationTitle = 'Sentidos';

  
  return (
    <div className="container-copyright ">
      <h1>Derechos de autor</h1>
      <h2>{organizationTitle}</h2>
      <p>&copy; {year} - Todos los derechos reservados.</p>
      <p>
        El contenido, diseño y gráficos de este sitio web están protegidos por las leyes de derechos de autor y propiedad intelectual. Queda estrictamente prohibida cualquier copia, reproducción, distribución o uso no autorizado sin el consentimiento expreso y por escrito del propietario de los derechos de autor.
      </p>
      <h3>Uso del contenido</h3>
      <p>
        El contenido de este sitio web es exclusivamente para uso informativo y promocional. No se permite la reproducción, modificación, distribución, transmisión, exhibición o realización pública del contenido sin la autorización previa y por escrito del propietario de los derechos de autor.
      </p>
      <h3>Enlaces a terceros</h3>
      <p>
        Este sitio web puede contener enlaces a sitios web de terceros. No nos hacemos responsables de la exactitud, legalidad o contenido de estos sitios web enlazados. El acceso y uso de los sitios web enlazados están sujetos a los términos y condiciones de dichos sitios.
      </p>
      <h3>Contacto</h3>
      <p>
        Si tienes alguna pregunta sobre los derechos de autor o el uso del contenido de este sitio web, por favor contáctanos a través de los canales de comunicación proporcionados.
      </p>
    </div>
  );
}

export default Copyright;
