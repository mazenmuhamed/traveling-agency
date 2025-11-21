import {
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Heart,
  Shield,
  Compass,
} from 'lucide-react'

export const priceRanges = [
  { label: 'Under $1,500', min: 0, max: 1500 },
  { label: '$1,500 - $2,000', min: 1500, max: 2000 },
  { label: '$2,000 - $2,500', min: 2000, max: 2500 },
  { label: 'Over $2,500', min: 2500, max: Infinity },
]

export const AboutDefaultValues = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      "To create unforgettable travel experiences that connect people with the world's most beautiful destinations, cultures, and adventures while providing exceptional service every step of the way.",
  },
  {
    icon: Sparkles,
    title: 'Personalized Journeys',
    description:
      'We craft unique travel packages tailored to your dreams and preferences, ensuring every trip is a perfect blend of adventure, relaxation, and cultural discovery.',
  },
  {
    icon: TrendingUp,
    title: 'Excellence in Service',
    description:
      'From the moment you book until you return home, our dedicated team ensures seamless planning, 24/7 support, and authentic experiences that exceed your expectations.',
  },
]

export const AboutWhyChooseUs = [
  {
    icon: Heart,
    title: 'Passionate Travel Experts',
    description:
      'Our team of travel enthusiasts brings decades of experience and insider knowledge to craft your perfect journey.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description:
      'Your safety is our priority. We partner with trusted providers and offer 24/7 emergency support worldwide.',
  },
  {
    icon: Compass,
    title: 'Curated Experiences',
    description:
      'Every destination is personally vetted and every itinerary is thoughtfully designed for authentic experiences.',
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description:
      'Recognized globally for excellence in travel services and customer satisfaction year after year.',
  },
]
