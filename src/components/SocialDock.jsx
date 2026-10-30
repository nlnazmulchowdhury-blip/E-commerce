import { useSocial } from '../context/SocialContext';
import SocialGlyph from './SocialGlyph';

export default function SocialDock({ hidden = false }) {
  const { activeChannels } = useSocial();
  if (hidden || activeChannels.length === 0) return null;

  const ordered = [...activeChannels].reverse();

  return (
    <div className="social-dock" role="complementary" aria-label="সোশ্যাল যোগাযোগ">
      {ordered.map((channel) => (
        <a
          key={channel.key}
          className={`social-dock-item ${channel.key}`}
          href={channel.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${channel.label}-এ যোগাযোগ করুন`}
        >
          <span className="social-dock-label">{channel.label}</span>
          <span className="social-dock-ic">
            <SocialGlyph channel={channel.key} />
          </span>
        </a>
      ))}
    </div>
  );
}
