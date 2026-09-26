import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { getProduct, type Product } from '../data/products';
import { useSeo } from '../hooks/useSeo';

export default function Wishlist() {
  useSeo('Wishlist', 'Your saved Shaarz Cosmetics favourites.');
  const { ids } = useWishlist();
  const items = ids.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <>
      <PageHeader eyebrow="Saved for later" title="Your wishlist" />
      <div className="container-page pb-20">
        {items.length ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <Heart size={48} className="text-accent/60" aria-hidden="true" />
            <p className="mt-4 font-display text-2xl">Your wishlist is empty</p>
            <p className="mt-2 text-ink-soft">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="btn-primary mt-8">
              Discover products
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
