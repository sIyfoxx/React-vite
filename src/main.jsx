import UserForm from './UserForm.jsx';
import HomeForm from './Home.jsx'
import PostForm from './Post.jsx'
import Layout from './Layout.jsx';
import DashboardForm from './Dashboard.jsx'
import LoginForm from './Login.jsx'
import NotFound from './NotFound.jsx'
import { TimerProvider } from './timer/TimerContext.jsx';
import { AuthProvider } from './auth/AuthContext';
import { PostsProvider } from './post/PostsContext';
import { BrowserRouter, Routes, Route } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <TimerProvider>
        <AuthProvider>
          <PostsProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>  
                  <Route path="/" element={<HomeForm />} />
                  <Route path="/dashboard" element={<DashboardForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/user" element={<UserForm />} />
                  <Route path="/post/:id" element={<PostForm />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PostsProvider>
        </AuthProvider>
      </TimerProvider>
    </StrictMode>
)
