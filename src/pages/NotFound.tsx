import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo('Page not found', 'Sorry, the page you are looking for could not be found.');
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl text-blush-300" aria-hidden="true">404</p>
      <h1 className="mt-4 text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-soft">The page you're looking for may have moved or no longer exists.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/shop" className="btn-outline">
          Shop products
        </Link>
      </div>
    </div>
  );
}
