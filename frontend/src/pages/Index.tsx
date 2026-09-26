import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AIChartBotSection from "@/components/AIChartBotSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground tech-grid-pattern overflow-hidden relative">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <AIChartBotSection />
    <EducationSection />
    <ContactSection />
    <Footer />
    <FloatingAIAssistant />
  </div>
);

export default Index;
