import { memo } from 'react';
import PostCard from './PostCard.jsx';

const PostsList = memo(function PostsList({ posts }) {
  if (posts.length === 0) {
    return <p className="Home__empty">Лента пуста — напишите первую запись</p>;
  }

  return (
    <div className="Home__grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
});

export default PostsList;
