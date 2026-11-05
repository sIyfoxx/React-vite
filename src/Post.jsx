import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import './css/Post.css';
import { usePosts } from './post/PostsContext';

function postRating(post) {
  const ratings = post.ratings ?? [];
  const penalties = ratings.filter((r) => r < 5).length;
  return Math.max(0, 5 - penalties * 0.1).toFixed(2);
}

function replyRating(reply) {
  return Math.max(0, 5 + (reply.likes ?? 0) - (reply.dislikes ?? 0));
}

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, likePost, voteReply, addComment } = usePosts();

  const post = posts.find((p) => String(p.id) === String(id));

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentPostRating, setCommentPostRating] = useState(5);

  if (!post) {
    return (
      <div className="PostPage">
        <div className="PostPage__card PostPage__card--empty">
          <div className="PostPage__title">Пост не найден</div>
          <p className="PostPage__subtitle">ID: {id}</p>
          <Link className="PostPage__btn" to="/">На главную</Link>
        </div>
      </div>
    );
  }

  const replies = post.replies ?? [];

  function handleAddComment(e) {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;

    const author = commentAuthor.trim() || 'Гость';
    const score = Math.min(5, Math.max(1, Number(commentPostRating) || 5));

    addComment(post.id, {
      id: Date.now(),
      author,
      initials: author[0].toUpperCase(),
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      text,
      likes: 0,
      dislikes: 0,
      postRating: score,
    });

    setCommentAuthor('');
    setCommentText('');
    setCommentPostRating(5);
  }

  return (
    <div className="PostPage">
      <div className="PostPage__card">
        <button type="button" className="PostPage__back" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        <div className="PostPage__head">
          <div className="PostPage__avatar">{post.initials}</div>
          <div>
            <div className="PostPage__author">{post.author}</div>
            <div className="PostPage__time">{post.time}</div>
          </div>
        </div>

        <p className="PostPage__text">{post.text}</p>

        <div className="PostPage__meta">
          <button type="button" className="PostPage__likes" onClick={() => likePost(post.id)}>
            ♥ {post.likes ?? 0}
          </button>
          <span className="PostPage__rating">★ {postRating(post)}</span>
          <span className="PostPage__id">#{post.id}</span>
        </div>

        <section className="PostPage__comments">
          <h2 className="PostPage__comments-title">Комментарии ({replies.length})</h2>

          {replies.length === 0 && <p className="PostPage__empty">Пока нет комментариев</p>}

          <ul className="PostPage__replies">
            {replies.map((r) => (
              <li className="PostPage__reply" key={r.id}>
                <div className="PostPage__avatar PostPage__avatar--sm">{r.initials}</div>
                <div className="PostPage__reply-body">
                  <div className="PostPage__head">
                    <span className="PostPage__author">{r.author}</span>
                    <span className="PostPage__time">{r.time}</span>
                  </div>
                  <p className="PostPage__text">{r.text}</p>
                  <div className="PostPage__meta">
                    <span className="PostPage__rating">★ {replyRating(r)}</span>
                    <button
                      type="button"
                      className="PostPage__likes PostPage__likes--sm"
                      onClick={() => voteReply(post.id, r.id, 'like')}
                    >
                      👍 {r.likes ?? 0}
                    </button>
                    <button
                      type="button"
                      className="PostPage__likes PostPage__likes--sm"
                      onClick={() => voteReply(post.id, r.id, 'dislike')}
                    >
                      👎 {r.dislikes ?? 0}
                    </button>
                    <span className="PostPage__score">Оценка посту: {r.postRating ?? 5}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <form className="PostPage__form" onSubmit={handleAddComment}>
            <input
              className="PostPage__input"
              type="text"
              placeholder="Ваше имя"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
            />
            <textarea
              className="PostPage__textarea"
              placeholder="Текст комментария"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />
            <label className="PostPage__score-field">
              Оценка посту (1–5):
              <input
                className="PostPage__input PostPage__input--score"
                type="number"
                min="1"
                max="5"
                step="1"
                value={commentPostRating}
                onChange={(e) => setCommentPostRating(e.target.value)}
              />
            </label>
            <button className="PostPage__btn" type="submit">Добавить комментарий</button>
          </form>
        </section>
      </div>
    </div>
  );
}