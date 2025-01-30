'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Smartphone, Megaphone, Palette, Server, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { LightBulbIcon, HeartIcon, StarIcon, UserGroupIcon } from '@heroicons/react/outline';

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Light theme grid effect */}
    <div className="absolute inset-0" style={{
      backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
      backgroundSize: '4rem 4rem',
      maskImage: 'radial-gradient(circle at center, transparent 30%, black 10%)'
    }} />
    {/* Light theme gradient orbs */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full filter blur-3xl" />
    {/* <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-100/50 rounded-full filter blur-3xl" /> */}
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Check scroll position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <span className="text-3xl font-bold text-blue-600" >
              Infyne
            </span>
            <div className="hidden md:flex space-x-8">
              {['Services', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(item.toLowerCase())
                  }}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('contact')
              }}>
              Get Started
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {['Solutions', 'Services', 'Work', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
                }}
                className="block py-2 text-gray-600 hover:text-blue-600">
                {item}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {/* <button className="w-full py-2 text-blue-600 font-semibold">Log In</button> */}
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('contact')
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
const smoothScrollTo = (targetId, offset = 0) => {
  const target = document.getElementById(targetId);
  if (target) {
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;
    const windowHeight = window.innerHeight;
    const scrollToPosition = targetPosition - windowHeight / 2 + target.offsetHeight / 2;

    const startPosition = window.pageYOffset;
    const distance = scrollToPosition - startPosition;
    const duration = 1000; // Duration in milliseconds
    let start = null;

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      const easedProgress = easeInOutQuad(Math.min(progress, 1));

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    });
  }
};


const StatCard = ({ number, label }) => (
  <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-4xl font-bold text-blue-600">
      {number}
    </div>
    <div className="text-gray-600 mt-2">{label}</div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <div className="group relative p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
    <Icon className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
    <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>

    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
          <span className="text-gray-600">{feature}</span>
        </div>
      ))}
    </div>

    <button className="mt-8 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
      Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
    </button>
  </div>
);

export default function Home() {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Enterprise-grade web solutions built with cutting-edge technologies",
      features: ["Custom Web Applications", "Progressive Web Apps", "E-commerce Solutions"]
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Native and cross-platform mobile applications for global reach",
      features: ["iOS & Android Apps", "Cross-platform Development", "App Maintenance"]
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies for maximum ROI",
      features: ["SEO Optimization", "Social Media Marketing", "Content Strategy"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Human-centered design solutions that drive engagement",
      features: ["User Research", "Interface Design", "Design Systems"]
    },
    {
      icon: Server,
      title: "IT Solutions",
      description: "Comprehensive IT services for business transformation",
      features: ["Cloud Solutions", "IT Infrastructure", "Security Services"]
    }
  ];
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    projectDetails: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      toast.success('Request sent successfully! We will contact you soon.');
    } catch (error) {
      toast.error('Failed to send email.Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id='maintab' className="w-full overflow-hidden bg-gray-50">
      <Navbar />
      <ToastContainer />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 bg-white">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
                Trusted by Fortune 500 Companies
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
                Transform Your Business with
                <span className="block text-blue-600">
                  Digital Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We deliver enterprise-grade digital solutions that drive innovation and accelerate growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg" onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('contact')
                }}>
                  Schedule a Consultation
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="/run4.gif" alt="Hero visualization" className="w-full h-full ml-4" />

              {/* <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                <img src="/team.png" alt="Hero visualization" className="w-full h-full object-cover mix-blend-overlay" />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="500+" label="Projects Delivered" />
            <StatCard number="98%" label="Client Satisfaction" />
            <StatCard number="50+" label="Tech Experts" />
            <StatCard number="10+" label="Years Experience" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Enterprise Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital services tailored for businesses seeking innovation and growth
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-white ">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto px-4 ">
          <div className="bg-white p-12 rounded-2xl shadow-lg border border-blue-600">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to Transform Your Business?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Schedule a consultation with our experts to discuss your project
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                  <input
                    type="email"
                    name="workEmail"
                    placeholder="Work Email"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
                <textarea
                  name="projectDetails"
                  placeholder="Project Details"
                  rows="4"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    'Schedule Consultation'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our company, our mission, and our values.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <LightBulbIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 mb-8">
                Our mission is to deliver enterprise-grade digital solutions that drive innovation and accelerate growth.
              </p>
              <div className="flex items-center mb-4">
                <HeartIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">Our Values</h3>
              </div>
              <p className="text-gray-600 mb-8">
                We value integrity, innovation, and customer satisfaction. We strive to exceed expectations and deliver exceptional results.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <StarIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">Why Choose Us</h3>
              </div>
              <p className="text-gray-600 mb-8">
                We are committed to providing top-notch services that cater to the unique needs of each client. Our team of experts works tirelessly to ensure that our solutions are not only effective but also innovative and forward-thinking.
              </p>
              <div className="flex items-center mb-4">
                <UserGroupIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">Our Approach</h3>
              </div>
              <p className="text-gray-600">
                We believe in a collaborative approach, working closely with our clients to understand their goals and challenges. This allows us to tailor our solutions to meet their specific needs and deliver maximum value.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-blue-700 text-gray-300 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Infyne</h2>
              <p className="text-white-400 leading-relaxed">
                Empowering vehicle owners with smart reminders and seamless ride
                management solutions. Your journey, our priority.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Our Services
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Vehicle Reminders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ride Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Maintenance Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Digital Wallet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    24/7 Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Stay Updated
              </h3>
              <p className="text-white mb-4">
                Subscribe to our newsletter for updates and tips.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
                />
                <button className="w-full px-4 py-3 bg-blue-900 text-white rounded-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm">
                © {new Date().getFullYear()} Infyne. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm md:justify-end">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}