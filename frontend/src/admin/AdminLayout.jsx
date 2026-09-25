import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  MessageSquareQuote,
  Inbox,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children, title, subtitle, actions }) => {
  const { admin, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'All Projects', path: '/admin/projects', icon: Layers },
    { name: 'Add Project', path: '/admin/projects/add', icon: PlusCircle },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox }
  ];

  return (
    <div className="min-h-screen bg-studio-bg flex flex-col pt-16">
      {/* Top Admin Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-studio-charcoal text-white h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="flex items-center gap-6">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 border border-studio-bronze flex items-center justify-center font-serif text-xs font-bold text-studio-bronze">
              AF
            </div>
            <span className="font-serif text-base tracking-widest uppercase font-medium">
              Studio Admin
            </span>
          </Link>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-medium text-white">{admin?.name || 'Administrator'}</span>
            <span className="text-[10px] text-stone-400">{admin?.email}</span>
          </div>

          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs uppercase tracking-wider transition-colors border border-stone-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Admin Secondary Navigation Ribbon */}
      <div className="bg-white border-b border-studio-border sticky top-16 z-30 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-6 py-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin/dashboard' || item.path === '/admin/projects'}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive
                      ? 'text-studio-bronze border-b-2 border-studio-bronze font-bold'
                      : 'text-studio-muted hover:text-studio-charcoal'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Page Header */}
        {(title || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-studio-border">
            <div>
              {subtitle && (
                <span className="text-[11px] uppercase tracking-[0.2em] text-studio-bronze font-bold block mb-1">
                  {subtitle}
                </span>
              )}
              {title && (
                <h1 className="text-2xl sm:text-3xl font-serif text-studio-charcoal font-normal">
                  {title}
                </h1>
              )}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
