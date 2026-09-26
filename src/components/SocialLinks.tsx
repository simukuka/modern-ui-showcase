import { socials } from '../data/site';
import { cn } from '../lib/utils';
import SocialIcon from './SocialIcon';

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socials.map((s) => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${s.label} (opens in a new tab)`}>
            <SocialIcon name={s.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
