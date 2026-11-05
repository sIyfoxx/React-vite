import { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { TimerProvider, TimerPage } from '../modules/timer';
import { AuthProvider, LoginForm } from '../modules/auth';
import { PostsProvider, HomePage, PostPage } from '../modules/posts';
import { DashboardPage } from '../modules/dashboard';
import { Layout, NotFound } from '../modules/layout';
import '../styles/theme.css';


const App = memo(function App() {
  return (
    <TimerProvider>
      <AuthProvider>
        <PostsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/user" element={<TimerPage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PostsProvider>
      </AuthProvider>
    </TimerProvider>
  );
});

export default App;
