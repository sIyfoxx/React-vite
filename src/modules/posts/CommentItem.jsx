import { memo, useCallback } from 'react';
import { calcReplyRating, formatRating } from './rating.js';

const CommentItem = memo(function CommentItem({ postId, reply, onVote }) {
  const handleLike = useCallback(() => {
    onVote(postId, reply.id, 'like');
  }, [onVote, postId, reply.id]);

  const handleDislike = useCallback(() => {
    onVote(postId, reply.id, 'dislike');
  }, [onVote, postId, reply.id]);

  return (
    <li className="PostPage__reply">
      <div className="PostPage__avatar PostPage__avatar--sm">{reply.initials}</div>
      <div className="PostPage__reply-body">
        <div className="PostPage__head">
          <span className="PostPage__author">{reply.author}</span>
          <span className="PostPage__time">{reply.time}</span>
        </div>
        <p className="PostPage__text">{reply.text}</p>
        <div className="PostPage__meta">
          <span className="PostPage__rating">{formatRating(calcReplyRating(reply))}</span>
          <button
            type="button"
            className="PostPage__likes PostPage__likes--sm"
            onClick={handleLike}
          >
            за {reply.likes ?? 0}
          </button>
          <button
            type="button"
            className="PostPage__likes PostPage__likes--sm"
            onClick={handleDislike}
          >
            против {reply.dislikes ?? 0}
          </button>
          <span className="PostPage__score">оценка посту: {reply.postRating ?? 5}</span>
        </div>
      </div>
    </li>
  );
});

export default CommentItem;
