import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import { NoticeAlert } from "./NoticeAlert";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Header />
      <NoticeAlert />
      <Outlet />
      <Form />
      <Footer />
    </main>
  );
}