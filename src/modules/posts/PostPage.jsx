import { memo, useCallback, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import './Post.css';
import { usePosts } from './PostsContext';
import { calcPostRating, formatRating } from './rating.js';
import CommentItem from './CommentItem.jsx';

const PostPage = memo(function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, likePost, voteReply, addComment } = usePosts();

  const post = useMemo(
    () => posts.find((p) => String(p.id) === String(id)),
    [posts, id]
  );

  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentPostRating, setCommentPostRating] = useState(5);
  const [error, setError] = useState('');

  const ratingLabel = useMemo(
    () => (post ? formatRating(calcPostRating(post)) : ''),
    [post]
  );

  const replies = post?.replies ?? [];

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleLikePost = useCallback(() => {
    if (post) likePost(post.id);
  }, [likePost, post]);

  const handleAuthorChange = useCallback((e) => {
    setCommentAuthor(e.target.value);
  }, []);

  const handleTextChange = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const handleRatingChange = useCallback((e) => {
    setCommentPostRating(e.target.value);
  }, []);

  const handleAddComment = useCallback((e) => {
    e.preventDefault();
    if (!post) return;

    setError('');
    const created = addComment(post.id, {
      author: commentAuthor,
      text: commentText,
      postRating: commentPostRating,
    });
    if (!created) {
      setError('Комментарий отклонён: пусто или обнаружен XSS-паттерн');
      return;
    }

    setCommentAuthor('');
    setCommentText('');
    setCommentPostRating(5);
  }, [addComment, post, commentAuthor, commentText, commentPostRating]);

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

  return (
    <div className="PostPage">
      <div className="PostPage__card">
        <button type="button" className="PostPage__back" onClick={handleBack}>
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
          <button type="button" className="PostPage__likes" onClick={handleLikePost}>
            лайк {post.likes ?? 0}
          </button>
          <span className="PostPage__rating">{ratingLabel}</span>
          <span className="PostPage__id">#{post.id}</span>
        </div>

        <p className="PostPage__hint">
          Оценка 1–5 меняет рейтинг поста на −10% … +10% от базы 100%.
          У комментария: 👍 +5%, 👎 −5%.
        </p>

        <section className="PostPage__comments">
          <h2 className="PostPage__comments-title">Комментарии ({replies.length})</h2>

          {replies.length === 0 && <p className="PostPage__empty">Пока нет комментариев</p>}

          <ul className="PostPage__replies">
            {replies.map((r) => (
              <CommentItem
                key={r.id}
                postId={post.id}
                reply={r}
                onVote={voteReply}
              />
            ))}
          </ul>

          <form className="PostPage__form" onSubmit={handleAddComment}>
            <h3 className="PostPage__form-title">Новый комментарий</h3>
            <input
              className="PostPage__input"
              type="text"
              placeholder="Ваше имя"
              value={commentAuthor}
              onChange={handleAuthorChange}
            />
            <textarea
              className="PostPage__textarea"
              placeholder="Текст комментария"
              value={commentText}
              onChange={handleTextChange}
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
                onChange={handleRatingChange}
              />
            </label>
            {error && <div className="PostPage__error">{error}</div>}
            <button className="PostPage__btn" type="submit">Добавить комментарий</button>
          </form>
        </section>
      </div>
    </div>
  );
});

export default PostPage;
