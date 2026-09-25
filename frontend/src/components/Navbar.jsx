import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Sofa,
  BedDouble,
  UtensilsCrossed,
  Building,
  Armchair,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(true);
  const dropdownRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceCategories = [
    {
      name: 'Living Room',
      path: '/projects/living-room',
      slug: 'living-room',
      desc: 'Sanctuaries, intimate lounges & reception suites',
      icon: Sofa
    },
    {
      name: 'Bedroom',
      path: '/projects/bedroom',
      slug: 'bedroom',
      desc: 'Master chambers, walk-in robes & serene suites',
      icon: BedDouble
    },
    {
      name: 'Full Home',
      path: '/projects/full-home',
      slug: 'full-home',
      desc: 'Turnkey architectural residence transformations',
      icon: Building
    },
    {
      name: 'Furniture',
      path: '/projects/furniture',
      slug: 'furniture',
      desc: 'Bespoke architectural joinery & artisan furniture',
      icon: Armchair
    }
  ];

  const isServicesActive = serviceCategories.some(
    (cat) => location.pathname === cat.path || location.pathname === `/projects/${cat.slug}`
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav border-b border-studio-border/80 py-3 sm:py-3.5 shadow-sm'
            : 'bg-studio-bg/95 md:bg-studio-bg/80 md:backdrop-blur-sm py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="z-50 hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-200 py-1 relative ${
                    isActive
                      ? 'text-studio-bronze font-semibold'
                      : 'text-studio-charcoal hover:text-studio-bronze'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-studio-bronze"
                      />
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-200 py-1 relative ${
                    isActive
                      ? 'text-studio-bronze font-semibold'
                      : 'text-studio-charcoal hover:text-studio-bronze'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    About
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-studio-bronze"
                      />
                    )}
                  </>
                )}
              </NavLink>

              {/* Services Dropdown (All Categories inside Services) */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen((prev) => !prev)}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-200 py-1 flex items-center gap-1.5 cursor-pointer relative ${
                    isServicesActive || servicesDropdownOpen
                      ? 'text-studio-bronze font-semibold'
                      : 'text-studio-charcoal hover:text-studio-bronze'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-studio-bronze' : 'opacity-70'
                    }`}
                  />
                  {isServicesActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-studio-bronze"
                    />
                  )}
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-80 z-50"
                    >
                      <div className="bg-[#FAF8F5] border border-studio-border/90 rounded-none shadow-2xl p-2.5 backdrop-blur-md">
                        <div className="px-3 py-2 border-b border-studio-border/60 mb-1.5 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-studio-bronze">
                            Design Categories & Services
                          </span>
                          <span className="text-[9px] text-studio-muted uppercase tracking-wider">
                            4 Services
                          </span>
                        </div>

                        <div className="space-y-1">
                          {serviceCategories.map((cat) => {
                            const IconComponent = cat.icon;
                            const isCatActive = location.pathname === cat.path;

                            return (
                              <Link
                                key={cat.name}
                                to={cat.path}
                                onClick={() => setServicesDropdownOpen(false)}
                                className={`group/item flex items-center gap-3 px-3 py-2.5 rounded-none transition-all duration-200 ${
                                  isCatActive
                                    ? 'bg-studio-sand/90 text-studio-charcoal'
                                    : 'hover:bg-studio-sand/60 text-studio-charcoal'
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 rounded-none border flex items-center justify-center transition-colors shrink-0 ${
                                    isCatActive
                                      ? 'bg-studio-charcoal text-white border-studio-charcoal'
                                      : 'bg-white border-studio-border text-studio-charcoal group-hover/item:border-studio-bronze group-hover/item:text-studio-bronze'
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-xs uppercase tracking-[0.14em] font-semibold transition-colors ${
                                        isCatActive
                                          ? 'text-studio-bronze font-bold'
                                          : 'group-hover/item:text-studio-bronze'
                                      }`}
                                    >
                                      {cat.name}
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 text-studio-bronze transition-all" />
                                  </div>
                                  <p className="text-[10px] text-studio-muted truncate font-light mt-0.5">
                                    {cat.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-200 py-1 relative ${
                    isActive
                      ? 'text-studio-bronze font-semibold'
                      : 'text-studio-charcoal hover:text-studio-bronze'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-studio-bronze"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-studio-sand text-studio-charcoal text-xs uppercase tracking-wider font-semibold border border-studio-border hover:bg-studio-charcoal hover:text-white transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-studio-bronze" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-xs text-studio-muted hover:text-red-600 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}

              <Link
                to="/ai-interior-designer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500/10 border border-amber-500/40 text-studio-charcoal text-xs uppercase tracking-[0.16em] font-semibold hover:bg-amber-500 hover:text-black transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Try With AI</span>
              </Link>
            </div>

            {/* Mobile Hamburger & Quick CTA */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 -mr-1 text-studio-charcoal hover:text-studio-bronze transition-colors focus:outline-none touch-manipulation cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] sm:top-[68px] z-30 bg-studio-bg flex flex-col justify-between p-6 sm:p-8 lg:hidden overflow-y-auto"
          >
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-studio-bronze font-bold block mb-3">
                  Main Navigation
                </span>
                <div className="flex flex-col space-y-2">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-lg font-serif tracking-wide py-2 border-b border-studio-border/60 flex items-center justify-between ${
                        isActive ? 'text-studio-bronze font-semibold' : 'text-studio-charcoal'
                      }`
                    }
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </NavLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `text-lg font-serif tracking-wide py-2 border-b border-studio-border/60 flex items-center justify-between ${
                        isActive ? 'text-studio-bronze font-semibold' : 'text-studio-charcoal'
                      }`
                    }
                  >
                    <span>About Studio</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </NavLink>
                </div>
              </div>

              {/* Mobile Services Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-studio-bronze font-bold">
                    Our Services & Categories
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                    className="text-xs text-studio-muted flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                  >
                    <span>{mobileServicesExpanded ? 'Collapse' : 'Expand'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        mobileServicesExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {mobileServicesExpanded && (
                  <div className="grid grid-cols-1 gap-2">
                    {serviceCategories.map((cat) => {
                      const IconComponent = cat.icon;
                      const isActive = location.pathname === cat.path;

                      return (
                        <NavLink
                          key={cat.name}
                          to={cat.path}
                          className={`p-3 border flex items-center justify-between transition-all ${
                            isActive
                              ? 'bg-studio-charcoal text-white border-studio-charcoal'
                              : 'bg-white text-studio-charcoal border-studio-border hover:border-studio-bronze'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent
                              className={`w-4 h-4 ${
                                isActive ? 'text-studio-bronze' : 'text-studio-muted'
                              }`}
                            />
                            <div>
                              <span className="text-xs uppercase tracking-wider font-semibold block">
                                {cat.name}
                              </span>
                              <span
                                className={`text-[10px] ${
                                  isActive ? 'text-stone-300' : 'text-studio-muted'
                                }`}
                              >
                                {cat.desc}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 ${
                              isActive ? 'text-studio-bronze' : 'opacity-40'
                            }`}
                          />
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-lg font-serif tracking-wide py-2 border-b border-studio-border/60 flex items-center justify-between ${
                      isActive ? 'text-studio-bronze font-semibold' : 'text-studio-charcoal'
                    }`
                  }
                >
                  <span>Contact & Studio Center</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </NavLink>
              </div>

              {isAuthenticated ? (
                <div className="p-4 bg-studio-sand border border-studio-border flex items-center justify-between">
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-studio-charcoal"
                  >
                    <ShieldCheck className="w-4 h-4 text-studio-bronze" />
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-xs text-red-600 uppercase font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-xs text-studio-muted uppercase tracking-widest hover:text-studio-charcoal block py-1"
                >
                  Staff / Admin Login →
                </Link>
              )}
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
