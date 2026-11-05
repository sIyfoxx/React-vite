import { memo } from 'react';
import { Link } from 'react-router';
import { calcPostRating, calcReplyRating, formatRating } from './rating.js';

const ReplyPreview = memo(function ReplyPreview({ reply }) {
  return (
    <li className="Post__reply">
      <div className="Post__avatar Post__avatar--sm">{reply.initials}</div>
      <div className="Post__body">
        <div className="Post__head">
          <span className="Post__author">{reply.author}</span>
          <span className="Post__time">{reply.time}</span>
        </div>
        <p className="Post__text">{reply.text}</p>
        <div className="Post__meta">
          <span className="Post__likes">за {reply.likes ?? 0}</span>
          <span className="Post__likes">против {reply.dislikes ?? 0}</span>
          <span className="Post__rating">{formatRating(calcReplyRating(reply))}</span>
        </div>
      </div>
    </li>
  );
});

const PostCard = memo(function PostCard({ post }) {
  const { id, author, initials, time, text, likes, replies = [] } = post;

  return (
    <article className="Post">
      <Link className="Post__main" to={`/post/${id}`}>
        <div className="Post__avatar">{initials}</div>

        <div className="Post__body">
          <div className="Post__head">
            <span className="Post__author">{author}</span>
            <span className="Post__time">{time}</span>
          </div>
          <p className="Post__text">{text}</p>

          <div className="Post__meta">
            <span className="Post__likes">лайк {likes ?? 0}</span>
            <span className="Post__rating">{formatRating(calcPostRating(post))}</span>
            <span className="Post__comments">{replies.length} комм.</span>
          </div>
        </div>
      </Link>

      {replies.length > 0 && (
        <ul className="Post__replies">
          {replies.map((r) => (
            <ReplyPreview key={r.id} reply={r} />
          ))}
        </ul>
      )}

      <Link className="Post__open" to={`/post/${id}`}>
        Открыть карточку
      </Link>
    </article>
  );
});

export default PostCard;
