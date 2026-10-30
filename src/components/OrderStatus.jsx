import { ORDER_FLOW, isCancelled, statusHint, statusTone } from '../data/orders';
import { IconCheck } from './Icons';

const BN_DIGITS = ['১', '২', '৩', '৪', '৫'];

export function StatusChip({ status }) {
  return <span className={`status tone-${statusTone(status)}`}>{status}</span>;
}

export default function OrderStatus({ status }) {
  if (isCancelled(status)) {
    return (
      <div className="ostatus is-cancelled">
        <p className="ohint">{statusHint(status)}</p>
      </div>
    );
  }

  const current = Math.max(0, ORDER_FLOW.indexOf(status));

  return (
    <div className="ostatus">
      <ol className="osteps" aria-label={`অর্ডারের অবস্থা: ${status}`}>
        {ORDER_FLOW.map((step, i) => {
          const state = i < current ? 'done' : i === current ? 'now' : '';
          return (
            <li key={step} className={state} aria-current={i === current ? 'step' : undefined}>
              <span className="odot">{i < current ? <IconCheck /> : BN_DIGITS[i]}</span>
              <span className="olabel">{step}</span>
            </li>
          );
        })}
      </ol>
      <p className="ohint">{statusHint(status)}</p>
    </div>
  );
}
