import {
  IconFacebook,
  IconInstagram,
  IconMessenger,
  IconShare,
  IconTiktok,
  IconWhatsapp,
  IconYoutube,
} from './Icons';

export default function SocialGlyph({ channel, ...rest }) {
  if (channel === 'whatsapp') return <IconWhatsapp {...rest} />;
  if (channel === 'messenger') return <IconMessenger {...rest} />;
  if (channel === 'facebook') return <IconFacebook {...rest} />;
  if (channel === 'instagram') return <IconInstagram {...rest} />;
  if (channel === 'tiktok') return <IconTiktok {...rest} />;
  if (channel === 'youtube') return <IconYoutube {...rest} />;
  return <IconShare {...rest} />;
}
