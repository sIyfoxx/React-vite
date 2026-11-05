import { Link } from 'react-router';
import './css/Home.css';
import { usePosts } from './post/PostsContext';

function postRating(post) {
  const ratings = post.ratings ?? [];
  const penalties = ratings.filter((r) => r < 5).length;
  return Math.max(0, 5 - penalties * 0.1).toFixed(2);
}

function replyRating(reply) {
  return Math.max(0, 5 + (reply.likes ?? 0) - (reply.dislikes ?? 0));
}

export default function HomeForm() {
  const { posts } = usePosts();

  return (
    <div className="Home">
      <section className="Home__posts">
        <h2 className="Home__posts-title">Обсуждение</h2>

        {posts.map((post) => {
          const { id, author, initials, time, text, likes, replies = [] } = post;
          return (
            <Link className="Post" to={`/post/${id}`} key={id}>
              <div className="Post__avatar">{initials}</div>

              <div className="Post__body">
                <div className="Post__head">
                  <span className="Post__author">{author}</span>
                  <span className="Post__time">{time}</span>
                </div>
                <p className="Post__text">{text}</p>

                <div className="Post__meta">
                  <span className="Post__likes">♥ {likes ?? 0}</span>
                  <span className="Post__rating">★ {postRating(post)}</span>
                </div>

                {replies.length > 0 && (
                  <ul className="Post__replies">
                    {replies.map((r) => (
                      <li className="Post__reply" key={r.id}>
                        <div className="Post__avatar Post__avatar--sm">{r.initials}</div>
                        <div className="Post__body">
                          <div className="Post__head">
                            <span className="Post__author">{r.author}</span>
                            <span className="Post__time">{r.time}</span>
                          </div>
                          <p className="Post__text">{r.text}</p>
                          <div className="Post__meta">
                            <span className="Post__likes">♥ {r.likes ?? 0}</span>
                            <span className="Post__rating">★ {replyRating(r)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}