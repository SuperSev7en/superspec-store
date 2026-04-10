import type { Metadata } from 'next';
import { StaticPageLayout } from '@/components/store/StaticPageLayout';

export const metadata: Metadata = {
  title: 'Mission & Sustainability',
  description: 'SUPER Spec. commitment to sustainable operations and positive impact.',
};

export default function MissionAndSustainabilityPage() {
  return (
    <div className="Page">
      <StaticPageLayout title="Mission & Sustainability">
        <p>
          At SUPER Spec. we are committed to conducting all our operations sustainably, minimizing environmental impact. We
          actively reduce plastic usage in our daily activities, opting for 100% compostable materials in most of our
          packaging.
        </p>
        <p>
          Our mission extends beyond commerce. We pledge to give back to our customers, support communities in need, partner
          with environmental organizations, and promote youth activism annually. By doing so, we aim to drive positive change
          and shape a brighter future.
        </p>
        <p>
          We understand that every action, big or small, affects our world. Therefore, we are dedicated to making a positive
          impact on all scales, ensuring that our contributions lead to a better, more sustainable future for all.
        </p>
      </StaticPageLayout>
    </div>
  );
}
