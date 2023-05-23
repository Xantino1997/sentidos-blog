import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Form />
      <Footer />
    </main>
  );
}