const BASE_PERCENT = 100;
const SCORE_STEP = 10; // 1→−10%, 2→−5%, 3→0%, 4→+5%, 5→+10%
const VOTE_STEP = 5;   // 👍 +5%, 👎 −5%

function clampPercent(value) {
  return Math.max(0, Math.min(200, value));
}

function toResult(percent) {
  const safe = clampPercent(percent);
  return {
    percent: Math.round(safe * 10) / 10,
    stars: Math.round((safe / 100) * 5 * 100) / 100,
  };
}

/** Рейтинг поста по оценкам комментаторов (1–5), в % от базы 100%. */
export function calcPostRating(post) {
  const ratings = post?.ratings ?? [];
  let percent = BASE_PERCENT;

  for (const score of ratings) {
    const clamped = Math.min(5, Math.max(1, Number(score) || 3));
    percent += ((clamped - 3) / 2) * SCORE_STEP;
  }

  return toResult(percent);
}

/** Рейтинг комментария по 👍/👎, в % от базы 100%. */
export function calcReplyRating(reply) {
  const likes = reply?.likes ?? 0;
  const dislikes = reply?.dislikes ?? 0;
  return toResult(BASE_PERCENT + likes * VOTE_STEP - dislikes * VOTE_STEP);
}

export function formatRating(result) {
  return `★ ${result.stars.toFixed(2)} · ${result.percent}%`;
}
