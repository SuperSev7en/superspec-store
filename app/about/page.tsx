import type { Metadata } from 'next';
import { StaticPageLayout } from '@/components/store/StaticPageLayout';

export const metadata: Metadata = {
  title: 'About us',
  description: 'About SUPER Spec. — love, diversity, and individuality through light and color.',
};

export default function AboutPage() {
  return (
    <div className="Page">
      <StaticPageLayout title="About us">
        <p>
          At SUPER Spec. we are dedicated to celebrating love, diversity, and individuality through the transformative power
          of light and color. Our mission is to unite a global family of SUPER humans by fostering knowledge,
          understanding, and appreciation for all aspects of life.
        </p>
        <p>Our company comprises three distinct divisions, each catering to unique facets of creativity and innovation:</p>
        <ol>
          <li>
            <strong>SUPER Speck:</strong> This division focuses on clothing and accessories—the small yet significant pieces
            that define our uniqueness. With a palette inspired by the full spectrum of the rainbow, including pink, we offer
            a myriad of options to express individuality or coordinate with friends.
          </li>
          <li>
            <strong>SUPER Spectrum:</strong> Dedicated to the arts, SUPER Spectrum aims to expand perceptions beyond the
            visible spectrum, unveiling the mystical and exploring the unknown.
          </li>
          <li>
            <strong>SUPER Specification:</strong> This division is committed to engineering high-quality products designed to
            enhance everyday life through thoughtful and innovative solutions.
          </li>
        </ol>
        <p>
          Under the umbrella of SUPER Spec., we strive to transcend limits by offering durable, high-quality items at fair
          prices. We believe that every action, no matter how small, has an impact on the world and the universe. Therefore,
          we are committed to ensuring that our influence is a positive one.
        </p>
        <p>
          Our goal is to build a brand that promotes diversity and individuality while uniting a collective force to make us
          all SUPER. We are dedicated to supporting artists, engineers, and thinkers whose aspirations align with ours,
          fostering a new culture of quality and affordability.
        </p>
      </StaticPageLayout>
    </div>
  );
}
