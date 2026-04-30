'use client';

import { useState } from 'react';
import { toast } from 'sonner';

type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export function ProductReviews({ productHandle }: { productHandle: string }) {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Verified Buyer',
      rating: 5,
      title: 'Exceeded Expectations',
      body: 'The quality of this product is unmatched. I was hesitant at first but the details are incredible.',
      date: 'Oct 12, 2025'
    },
    {
      id: '2',
      author: 'Alex M.',
      rating: 4,
      title: 'Solid build, great design',
      body: 'Really happy with this purchase. Shipping was fast. Only docked a star because the packaging was slightly dented, but the item was perfect.',
      date: 'Sep 28, 2025'
    }
  ]);
  const [form, setForm] = useState({ name: '', email: '', rating: 5, title: '', body: '' });

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! Your review has been submitted for approval.');
    setReviews([{
      id: Date.now().toString(),
      author: form.name,
      rating: form.rating,
      title: form.title,
      body: form.body,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }, ...reviews]);
    setShowForm(false);
    setForm({ name: '', email: '', rating: 5, title: '', body: '' });
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div style={{ color: '#ffb300', fontSize: 18, letterSpacing: 2 }}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </div>
  );

  return (
    <div className="ProductReviews" style={{ marginTop: 60, borderTop: '1px solid var(--border-color)', paddingTop: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h2 className="Heading u-h3">Customer Reviews</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <StarRating rating={Math.round(avgRating)} />
            <span className="Text--subdued">{avgRating.toFixed(1)} based on {reviews.length} reviews</span>
          </div>
        </div>
        <button className="Button Button--primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="Form Form--spacingTight" style={{ background: 'var(--secondary-elements-background)', padding: 30, marginBottom: 40, borderRadius: 4 }}>
          <h3 className="Heading u-h4" style={{ marginBottom: 20 }}>Write a Review</h3>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label className="Form__Label">Name</label>
              <input type="text" className="Form__Input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label className="Form__Label">Email</label>
              <input type="email" className="Form__Input" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="Form__Label">Rating</label>
            <select className="Form__Input" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="Form__Label">Review Title</label>
            <input type="text" className="Form__Input" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="Form__Label">Review Body</label>
            <textarea className="Form__Input" rows={4} required value={form.body} onChange={e => setForm({...form, body: e.target.value})}></textarea>
          </div>
          <button type="submit" className="Button Button--primary">Submit Review</button>
        </form>
      )}

      <div className="ReviewList" style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {reviews.map(review => (
          <div key={review.id} className="ReviewCard" style={{ paddingBottom: 30, borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <StarRating rating={review.rating} />
              <span className="Text--subdued" style={{ fontSize: 13 }}>{review.date}</span>
            </div>
            <h4 className="Heading u-h6" style={{ marginBottom: 8 }}>{review.title}</h4>
            <p className="Text--subdued" style={{ marginBottom: 12 }}>{review.body}</p>
            <span className="Heading u-h7 Text--subdued">{review.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
