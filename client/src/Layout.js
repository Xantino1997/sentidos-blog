import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import { NoticeAlert } from "./NoticeAlert";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Header />
      <>  
        <br /> {/* Etiqueta <br> para salto de línea */}
        <br />
        <br />
        <br /> {/* Etiqueta <hr> para una línea horizontal */}</>
      <NoticeAlert />
      <Outlet />
      <Form />
      <Footer />
    </main>
  );
}
