import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Componentes de Layout
import { Navbar } from './components/Navbar/Navbar'; 
import { Footer } from './components/Footer';
import { Analytics } from './components/Analytics';
import { SEO } from './components/SEO';

// Páginas
import Home from './pages/Home';
import ProjectSubpage from './pages/ProjectSubpage';
import { Admin } from './pages/Admin';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <Analytics />
                <SEO /> {/* Defaults genéricos */}
                <div className="bg-background text-foreground min-h-screen flex flex-col">
                    <Navbar />

                    <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<ProjectSubpage />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
        </HelmetProvider>
    );
}

export default App;