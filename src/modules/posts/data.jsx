const posts = [
  {
    id: 1,
    author: "Карим",
    initials: "К",
    time: "12:40",
    text: "Пост Карима",
    likes: 0,
    // Оценка 1 → −10% от базы 100% → 90% (★ 4.50)
    ratings: [1],
    replies: [
      {
        id: 1,
        author: "Олег",
        initials: "О",
        time: "12:45",
        text: "Комментарий Олега",
        likes: 0,
        dislikes: 0,
        postRating: 1,
      },
    ],
  },
];

export default posts;
