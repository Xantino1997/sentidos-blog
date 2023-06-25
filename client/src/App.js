import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import CreateNotice from './pages/CreateNotice';
import About from './pages/About';
import EditPost from './pages/EditPost';
import PostNext from './PostNext';
import ErrorPage from './pages/404';
import CreateEvent from './pages/Events';
import Cargando from './pages/PagesWait';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Tiempo de espera simulado (2 segundos)
  }, []);

  return (
    <UserContextProvider>
      {isLoading ? (
        <Cargando />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post" element={<PostNext />} />
            <Route path="/createadvice" element={<CreateNotice />} />
            <Route path="/updateadvice/:id" element={<CreateNotice />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<CreateEvent />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      )}
    </UserContextProvider>
  );
}

export default App;

