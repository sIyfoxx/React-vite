import { memo, useCallback, useState } from 'react';
import './Home.css';
import { usePosts } from '../../context';

import PostsList from './PostsList.jsx';

const HomePage = memo(function HomePage() {
  const { posts, addPost } = usePosts();
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleAuthorChange = useCallback((e) => {
    setAuthor(e.target.value);
  }, []);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleAddPost = useCallback((e) => {
    e.preventDefault();
    setError('');
    const created = addPost({ author, text });
    if (!created) {
      setError('Текст отклонён: пусто или обнаружен XSS-паттерн');
      return;
    }
    setAuthor('');
    setText('');
  }, [addPost, author, text]);

  return (
    <div className="Home">
      <section className="Home__composer">
        <h2 className="Home__posts-title">Новая запись</h2>
        <form className="Home__form" onSubmit={handleAddPost}>
          <span className="starburst starburst--sm" style={{ top: 12, right: 14 }} aria-hidden="true" />
          <input
            className="Home__input"
            type="text"
            placeholder="Ваше имя"
            value={author}
            onChange={handleAuthorChange}
          />
          <textarea
            className="Home__textarea"
            placeholder="Что на уме?"
            value={text}
            onChange={handleTextChange}
            rows={3}
          />
          {error && <div className="Home__error">{error}</div>}
          <button className="Home__btn Home__btn--primary" type="submit">
            Опубликовать
          </button>
        </form>
      </section>

      <section className="Home__posts">
        <h2 className="Home__posts-title">Лента</h2>
        <PostsList posts={posts} />
      </section>
    </div>
  );
});

export default HomePage;
