import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import FeaturedRooms from '@/components/FeaturedRooms';
import AmenitiesSection from '@/components/AmenitiesSection';
import GalleryTeaser from '@/components/GalleryTeaser';
import OffersSection from '@/components/OffersSection';
import Testimonials from '@/components/Testimonials';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#booking') {
      const el = document.getElementById('booking');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
  <main className="min-h-screen">
    <Navbar />
    <Hero />
    <TrustStrip />
    <FeaturedRooms />
    <AmenitiesSection />
    <GalleryTeaser />
    <OffersSection />
    <Testimonials />
    <LocationSection />
    <Footer />
  </main>
  );
};

export default Index;
