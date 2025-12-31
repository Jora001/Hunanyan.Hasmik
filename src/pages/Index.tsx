import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import PhotoAlbumSection from '@/components/PhotoAlbumSection';
import RecommendationsSection from '@/components/RecommendationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
            <ExperienceSection />

      <ProjectsSection />
      <PhotoAlbumSection />
      <RecommendationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
