import { memo } from 'react';

const ActivityRow = memo(function ActivityRow({ time, text, tag }) {
  return (
    <li className="Activity__row">
      <span className={`Activity__dot Activity__dot--${tag}`} />
      <span className="Activity__time">{time}</span>
      <span className="Activity__text">{text}</span>
    </li>
  );
});

export default ActivityRow;
