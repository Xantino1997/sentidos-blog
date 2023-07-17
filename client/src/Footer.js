import fb from './assets/facebook.png';
import wts from './assets/whatsapp.png';
import inst from './assets/instagram.png';
import youtube from './assets/youtube.png';

export default function Footer() {
  const year = new Date().getFullYear();

  function handleWhatsAppClick(event) {
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);
    const phoneNumber = '5493413353744';
    const message = 'Hola%20me%20encontré%20con%20esta%20página%20y%20quería%20recibir%20información%20sobre%20Sentidos';
    let link;

    if (isMobile) {
      link = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    } else {
      link = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }

    window.open(link, '_blank');
    event.preventDefault();
  }

  return (
    <footer>
      <div className="footer-content">
        <div>
          <h2 className="titulo-footer">Sentidos</h2>
        </div>
        <div className="footer-social">
          <h4>Nuestras Redes</h4>
          <a className="footer-whatsapp" href="#" onClick={handleWhatsAppClick}>
            <img className="img-footer-whatsapp" src={wts} alt="WhatsApp" />
          </a>
          <a className="footer-instagram" href="https://www.instagram.com/sentidos_padres_ong/" target="_blank">
            <img className="img-footer-instagram" src={inst} alt="Instagram" />
          </a>
          <a className="footer-facebook" href="https://www.facebook.com/SentidosAsociacion/" target="_blank">
            <img className="img-footer-facebook" src={fb} alt="Facebook" />
          </a>
          <a className="footer-youtube" href="https://www.youtube.com/watch?v=XRYLY4qlipE&t=18s" target="_blank">
            <img className="img-footer-youtube" src={youtube} alt="Facebook" />
          </a>
        </div>
      </div>
       <Link to="/copyright" className="copy" style={{ color: 'white' }}>
                &copy; {year} <b>Sentidos</b>
        </Link>
    </footer>
  );
}
