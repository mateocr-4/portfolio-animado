import React, { lazy, Suspense } from 'react';

// Se mantienen los imports lazy para la pagina principal
const HeroSection = lazy(() => import('../sections/HeroSection'));
const AboutSection = lazy(() => import('../sections/AboutSection'));
const SkillsSection = lazy(() => import('../sections/SkillsSection'));
const AnalyticsSection = lazy(() => import('../sections/AnalyticsSection'));
const ExperienceSection = lazy(() => import('../sections/ExperienceSection'));
const EducationSection = lazy(() => import('../sections/EducationSection'));
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'));
const WebsSection = lazy(() => import('../sections/WebsSection'));
const ContactSection = lazy(() => import('../sections/ContactSection'));

const LoadingFallback = () => (
    <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <div className="w-12 h-12 border-4 border-t-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 font-mono">Cargando módulos...</p>
    </div>
);

const Home = () => {
    return (
        <main>
            <Suspense fallback={<LoadingFallback />}>
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <EducationSection />
                <ProjectsSection />
                <WebsSection />
                <SkillsSection />
                <AnalyticsSection />
                <ContactSection />
            </Suspense>
        </main>
    );
};

export default Home;
