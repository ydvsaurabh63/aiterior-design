import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { enquiryApi } from '../services/api';
import toast from 'react-hot-toast';

const propertyTypes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Other'];
const budgetRanges = [
  '₹10 Lakh - ₹20 Lakh',
  '₹20 Lakh - ₹35 Lakh',
  '₹35 Lakh - ₹50 Lakh',
  '₹50 Lakh - ₹1 Crore',
  '₹1 Crore+'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    propertyType: '3 BHK',
    budget: '₹20 Lakh - ₹35 Lakh',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.city.trim() || !formData.message.trim()) {
      toast.error('Please fill in all mandatory fields');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryApi.create(formData);
      toast.success('Consultation request submitted! Our team will contact you within 24 hours.');
      setSubmittedSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        propertyType: '3 BHK',
        budget: '₹20 Lakh - ₹35 Lakh',
        message: ''
      });
    } catch (err) {
      toast.error(err.message || 'Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-studio-bg min-h-screen pt-20 sm:pt-28 md:pt-32 overflow-x-hidden">
      {/* 1. Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-studio-bronze font-semibold mb-2.5">
            <span className="w-5 sm:w-6 h-px bg-studio-bronze" />
            <span>Consultation & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-studio-charcoal font-normal tracking-tight leading-[1.15] mb-3 sm:mb-4">
            Begin Your Spatial Transformation
          </h1>
          <p className="text-xs sm:text-base text-studio-muted leading-relaxed font-light">
            Schedule an architectural consultation session with our principal design directors.
            We discuss spatial floorplans, aesthetics, timelines, and material budgets.
          </p>
        </div>
      </div>

      {/* 2. Main Contact Form & Studio Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column: Interactive Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-10 border border-studio-border shadow-luxury relative">
            {submittedSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 sm:py-12 space-y-4"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-studio-sand flex items-center justify-center text-studio-bronze mx-auto mb-3 border border-studio-border">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-studio-charcoal">
                  Thank You for Reaching Out
                </h3>
                <p className="text-xs sm:text-sm text-studio-muted max-w-md mx-auto leading-relaxed">
                  Your project enquiry has been registered. A senior interior designer will review your architectural requirements and reach out via phone/WhatsApp within 24 hours.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="mt-4 px-6 py-3 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-bronze transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-studio-charcoal mb-1">
                    Book a Design Consultation
                  </h3>
                  <p className="text-xs text-studio-muted font-light">
                    Share your residence details and design vision below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Siddharth Verma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal placeholder-studio-muted/70 focus:outline-none focus:border-studio-bronze transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98201 54321"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal placeholder-studio-muted/70 focus:outline-none focus:border-studio-bronze transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. siddharth@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal placeholder-studio-muted/70 focus:outline-none focus:border-studio-bronze transition-colors"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                      City of Property *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Mumbai / Bengaluru / Delhi"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal placeholder-studio-muted/70 focus:outline-none focus:border-studio-bronze transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Property Type */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal focus:outline-none focus:border-studio-bronze transition-colors"
                    >
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                      Estimated Budget *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal focus:outline-none focus:border-studio-bronze transition-colors"
                    >
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1.5">
                    Project Vision / Special Requirements *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell us about the space, preferred styles (Japandi, Modern Luxury, etc.), possession date, or specific rooms you wish to design..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 sm:py-3 bg-studio-bg border border-studio-border text-xs sm:text-sm text-studio-charcoal placeholder-studio-muted/70 focus:outline-none focus:border-studio-bronze transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 sm:py-4 bg-studio-charcoal text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-studio-bronze transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
                >
                  {submitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Contact & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Quick Contact Cards */}
            <div className="bg-white p-6 sm:p-8 border border-studio-border shadow-sm space-y-5 sm:space-y-6">
              <h3 className="font-serif text-xl sm:text-2xl text-studio-charcoal">
                Direct Studio Lines
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3.5 p-3.5 sm:p-4 bg-studio-bg border border-studio-border hover:border-studio-bronze transition-colors group"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-studio-bronze mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-studio-muted font-bold block">
                      Call Studio Desk
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-studio-charcoal group-hover:text-studio-bronze transition-colors">
                      +91 (022) 6890 4500
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3.5 sm:p-4 bg-studio-bg border border-studio-border hover:border-green-500 transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-studio-muted font-bold block">
                      Direct WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-studio-charcoal group-hover:text-green-600 transition-colors">
                      +91 98765 43210
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:design@aurastudio.com"
                  className="flex items-start gap-3.5 p-3.5 sm:p-4 bg-studio-bg border border-studio-border hover:border-studio-bronze transition-colors group"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-studio-bronze mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-studio-muted font-bold block">
                      Email Inquiries
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-studio-charcoal group-hover:text-studio-bronze transition-colors">
                      design@aurastudio.com
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio Hours & Address */}
            <div className="bg-studio-charcoal text-white p-6 sm:p-8 border border-stone-800 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-studio-bronzeLight font-semibold">
                <MapPin className="w-4 h-4 text-studio-bronze" />
                <span>Principal Experience Studio</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Level 4, Signature Atrium, G-Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051
              </p>
              <div className="pt-3 border-t border-stone-800 flex items-center gap-2 text-xs text-stone-400">
                <Clock className="w-3.5 h-3.5 text-studio-bronze" />
                <span>Monday – Saturday: 10:00 AM – 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Google Maps Architectural Section */}
      <section className="border-t border-studio-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-studio-bronze font-semibold block mb-1.5">
              Studio Location
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-studio-charcoal">
              Visit Our Flagship Experience Center
            </h3>
          </div>

          <div className="w-full h-[280px] sm:h-[350px] md:h-[400px] border border-studio-border overflow-hidden relative shadow-luxury">
            <iframe
              title="Aura and Form Studio Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.835460592965!2d72.86561497596043!3d19.07098485213693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f1e94f%3A0x6b876403c80b5714!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
