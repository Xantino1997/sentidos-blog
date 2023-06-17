import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import NoticiaRapida from "./pages/NoticiaRapida";
import About from "./pages/About";
import EditPost from "./pages/EditPost";
import PostNext from './PostNext';
import ErrorPage from './pages/404';
import CreateEvent from './pages/Events';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post" element={<PostNext />} />
          <Route path="/notice" element={<NoticiaRapida />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<CreateEvent />} />
          <Route path="*" element={<ErrorPage />} /> {/* Ruta comodín para rutas desconocidas */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
