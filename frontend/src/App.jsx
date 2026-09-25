import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import CategoryProjects from './pages/CategoryProjects';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import TryWithAI from './pages/TryWithAI';
import AIInteriorDesigner from './pages/AIInteriorDesigner';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageProjects from './admin/ManageProjects';
import AddProject from './admin/AddProject';
import EditProject from './admin/EditProject';
import ManageTestimonials from './admin/ManageTestimonials';
import ManageEnquiries from './admin/ManageEnquiries';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-studio-bg text-studio-charcoal selection:bg-studio-bronze selection:text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#181716',
            color: '#FAF8F5',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            borderRadius: '0px',
            border: '1px solid #3A3632'
          },
          success: {
            iconTheme: {
              primary: '#B89255',
              secondary: '#181716'
            }
          }
        }}
      />

      {/* Render Public Navbar & Footer only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          
          {/* Dedicated Category Listing Routes */}
          <Route path="/projects/living-room" element={<CategoryProjects />} />
          <Route path="/projects/bedroom" element={<CategoryProjects />} />
          <Route path="/projects/full-home" element={<CategoryProjects />} />
          <Route path="/projects/furniture" element={<CategoryProjects />} />
          <Route path="/projects/:categorySlug" element={<CategoryProjects />} />

          {/* Project Details */}
          <Route path="/project/:id" element={<ProjectDetails />} />

          {/* Contact & Consultation */}
          <Route path="/contact" element={<Contact />} />

          {/* AI Spatial Visualizer */}
          <Route path="/try-with-ai" element={<AIInteriorDesigner />} />
          <Route path="/ai-interior-designer" element={<AIInteriorDesigner />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <ManageProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects/add"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects/edit/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute>
                <ManageTestimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <ManageEnquiries />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
