import { createContext, useContext, useState } from "react";
import initialPosts from "./datePost.jsx";

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  // Лайк посту
  function likePost(postId) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: (p.likes ?? 0) + 1 } : p
      )
    );
  }

  // 👍/👎 под комментарием
  function voteReply(postId, replyId, type) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: (p.replies ?? []).map((r) => {
            if (r.id !== replyId) return r;
            if (type === "like") return { ...r, likes: (r.likes ?? 0) + 1 };
            return { ...r, dislikes: (r.dislikes ?? 0) + 1 };
          }),
        };
      })
    );
  }

  // Новый комментарий + оценка посту от комментатора
  function addComment(postId, reply) {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [...(p.replies ?? []), reply],
          ratings: [...(p.ratings ?? []), reply.postRating ?? 5],
        };
      })
    );
  }

  return (
    <PostsContext.Provider value={{ posts, likePost, voteReply, addComment }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);