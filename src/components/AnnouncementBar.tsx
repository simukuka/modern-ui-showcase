import { Link } from 'react-router-dom';
import { announcement } from '../data/site';

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream-50">
      <p className="container-page py-2 text-center text-xs tracking-wide sm:text-sm">
        {announcement.text}
        {announcement.link && (
          <>
            {' · '}
            <Link to={announcement.link.to} className="font-medium underline underline-offset-4 hover:text-blush-200">
              {announcement.link.label}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
