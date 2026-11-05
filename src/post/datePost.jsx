// timer/datePost.jsx
const posts = [
  {
    id: 1,
    author: "Карим",
    initials: "К",
    time: "12:40",
    text: "Пост Карима",
    // Оценки посту от комментаторов (1–5). База — 5.0
    ratings: [1],        // одна оценка «1» → рейтинг поста 4.90
    replies: [
      {
        id: 1,
        author: "Олег",
        initials: "О",
        time: "12:45",
        text: "Комментарий Олега",
        likes: 0,        // 👍 под комментарием
        dislikes: 0,     // 👎 под комментарием
        // Оценка, которую Олег поставил ПОСТУ (1–5)
        postRating: 1,
      },
    ],
  },
];

export default posts;