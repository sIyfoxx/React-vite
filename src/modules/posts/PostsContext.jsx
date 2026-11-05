import { createContext, useCallback, useContext, useMemo, useState } from "react";
import initialPosts from "./data.jsx";
import { hasXssPayload, sanitizeName, sanitizeText } from "../../shared/sanitize.js";

const PostsContext = createContext(null);

function nowTime() {
  return new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function makeInitials(name) {
  return (name.trim()[0] || "Г").toUpperCase();
}

function guardUserText(raw, { maxLength, asName = false } = {}) {
  if (typeof raw !== "string") return "";
  if (hasXssPayload(raw)) return null;

  return asName
    ? sanitizeName(raw, { maxLength })
    : sanitizeText(raw, { maxLength });
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const likePost = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: (p.likes ?? 0) + 1 } : p
      )
    );
  }, []);

  const voteReply = useCallback((postId, replyId, type) => {
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
  }, []);

  const addPost = useCallback(({ author, text }) => {
    const nameClean = guardUserText(author ?? "", { maxLength: 40, asName: true });
    const bodyClean = guardUserText(text ?? "", { maxLength: 2000 });

    if (nameClean === null || bodyClean === null) return null;

    const name = nameClean || "Гость";
    if (!bodyClean) return null;

    const post = {
      id: Date.now(),
      author: name,
      initials: makeInitials(name),
      time: nowTime(),
      text: bodyClean,
      likes: 0,
      ratings: [],
      replies: [],
    };

    setPosts((prev) => [post, ...prev]);
    return post;
  }, []);

  const addComment = useCallback((postId, { author, text, postRating }) => {
    const nameClean = guardUserText(author ?? "", { maxLength: 40, asName: true });
    const bodyClean = guardUserText(text ?? "", { maxLength: 1000 });

    if (nameClean === null || bodyClean === null) return null;

    const name = nameClean || "Гость";
    if (!bodyClean) return null;

    const score = Math.min(5, Math.max(1, Number(postRating) || 5));
    const reply = {
      id: Date.now(),
      author: name,
      initials: makeInitials(name),
      time: nowTime(),
      text: bodyClean,
      likes: 0,
      dislikes: 0,
      postRating: score,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [...(p.replies ?? []), reply],
          ratings: [...(p.ratings ?? []), score],
        };
      })
    );

    return reply;
  }, []);

  const value = useMemo(
    () => ({ posts, likePost, voteReply, addPost, addComment }),
    [posts, likePost, voteReply, addPost, addComment]
  );

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);
