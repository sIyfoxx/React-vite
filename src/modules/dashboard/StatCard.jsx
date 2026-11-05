import { memo } from 'react';

const StatCard = memo(function StatCard({ label, value, trend }) {
  return (
    <article className="Stat">
      <span className="Stat__label">{label}</span>
      <span className="Stat__value">{value}</span>
      <span className="Stat__trend">{trend}</span>
    </article>
  );
});

export default StatCard;
