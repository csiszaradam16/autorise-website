"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// REVEAL ANIMATION HOOK
// ═══════════════════════════════════════════════════════════════════════════════

function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/95 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center">
              <span className="font-bold text-void text-lg">A</span>
            </div>
            <span className="font-semibold text-[19px] tracking-tight text-white group-hover:text-orange transition-colors">
              autorise
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary">
              Get Started
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 space-y-2 border-t border-white/[0.06]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-white text-lg font-medium py-3 hover:text-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary inline-flex mt-4">
              Get Started
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION - Centered CTA
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-[72px] overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <motion.div style={{ y }} className="absolute top-[15%] left-[30%] w-[500px] h-[500px] glow-orb" />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
        className="absolute top-[40%] right-[20%] w-[300px] h-[300px] glow-orb"
      />

      <div className="container-main relative z-10 py-20 lg:py-28">
        {/* Centered Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-label justify-center mb-6"
          >
            <i className="fa-solid fa-sparkles"></i>
            Your Web Partner for the AI Era
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-display-2xl font-semibold tracking-tight mb-6 text-white"
          >
            Get Found by <span className="text-gradient-orange">Google</span>,{" "}
            <span className="text-gradient-orange">ChatGPT</span>, and Beyond.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-smoke text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            We build high-performance websites and optimize your digital presence
            so customers find you—whether they&apos;re searching on Google or asking AI.
          </motion.p>

          {/* CTAs - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#contact" className="btn-primary">
              Let&apos;s Talk
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </a>
            <a href="#services" className="btn-secondary">
              See Our Services
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </a>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
              alt="Analytics dashboard showing website performance and SEO metrics"
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 pt-10 border-t border-white/[0.06] text-center"
        >
          <p className="text-ash text-sm tracking-wide mb-8 flex items-center justify-center gap-2">
            <i className="fa-solid fa-shield-check text-orange"></i>
            Trusted by 50+ businesses across Europe, UK & US
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["TechCorp", "InnovateLab", "GrowthCo", "ScaleUp", "NextGen"].map((name) => (
              <div key={name} className="font-semibold text-lg text-white/25 tracking-tight">
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROBLEM STATEMENT SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function ProblemSection() {
  const features = [
    {
      icon: "fa-magnifying-glass-chart",
      title: "Traditional SEO",
      description: "Rank higher on Google and drive organic traffic that converts.",
    },
    {
      icon: "fa-robot",
      title: "AI Visibility (GEO/AEO)",
      description: "Get recommended by ChatGPT, Perplexity, and AI search engines.",
    },
    {
      icon: "fa-code",
      title: "Web Development",
      description: "Fast, modern websites built to perform and scale.",
    },
  ];

  return (
    <section className="relative bg-gradient-light section-padding">
      <div className="container-main">
        <RevealOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label justify-center text-orange">
            <i className="fa-solid fa-chart-line"></i>
            The Opportunity
          </span>
          <h2 className="text-display-lg text-charcoal mb-6">
            The Way People Find Businesses Is <span className="text-gradient-orange">Changing</span>
          </h2>
          <p className="text-ash text-lg leading-relaxed">
            Google is still king—but now customers are also asking ChatGPT, Perplexity, and AI
            assistants for recommendations. If your business isn&apos;t visible in both worlds,
            you&apos;re leaving money on the table.
          </p>
          <p className="text-orange font-semibold text-lg mt-6 flex items-center justify-center gap-2">
            <i className="fa-solid fa-bolt"></i>
            Most agencies haven&apos;t caught up. We have.
          </p>
        </RevealOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={scaleInVariants} className="card-light group">
              <div className="w-14 h-14 mb-6 rounded-2xl bg-orange/10 flex items-center justify-center group-hover:bg-orange transition-colors duration-300">
                <i className={`fa-solid ${feature.icon} text-2xl text-orange group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <h3 className="font-semibold text-xl text-charcoal mb-3">{feature.title}</h3>
              <p className="text-ash leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES SECTION - With Images
// ═══════════════════════════════════════════════════════════════════════════════

function ServicesSection() {
  const services = [
    {
      icon: "fa-laptop-code",
      title: "Websites & Web Apps That Work",
      description:
        "Your website is your hardest-working salesperson. We build fast, modern, conversion-focused sites that look great and actually drive results.",
      features: [
        { icon: "fa-browser", text: "Custom websites & landing pages" },
        { icon: "fa-window-maximize", text: "Web applications & portals" },
        { icon: "fa-cart-shopping", text: "E-commerce solutions" },
        { icon: "fa-wrench", text: "Ongoing maintenance & support" },
        { icon: "fa-gauge-high", text: "Performance optimization" },
      ],
      cta: "Explore Web Services",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
      imageAlt: "Modern web development workspace with code on screen",
    },
    {
      icon: "fa-eye",
      title: "Be Seen by Google and AI",
      description:
        "SEO isn't dead—it's evolving. We combine traditional search optimization with cutting-edge AI visibility strategies.",
      features: [
        { icon: "fa-magnifying-glass", text: "Search Engine Optimization (SEO)" },
        { icon: "fa-wand-magic-sparkles", text: "Generative Engine Optimization (GEO)" },
        { icon: "fa-comments", text: "AI Answer Optimization (AEO)" },
        { icon: "fa-location-dot", text: "Local search & Google Business Profile" },
        { icon: "fa-pen-nib", text: "Content strategy & optimization" },
      ],
      cta: "Explore Visibility Services",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
      imageAlt: "SEO analytics and search optimization dashboard",
    },
  ];

  return (
    <section id="services" className="relative bg-gradient-dark section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] glow-orb opacity-30" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label justify-center">
            <i className="fa-solid fa-cubes"></i>
            Our Services
          </span>
          <h2 className="text-display-lg mb-4">
            Everything You Need to Get Found and <span className="text-gradient-orange">Convert</span>
          </h2>
          <p className="text-smoke text-lg">Two core capabilities. One partner.</p>
        </RevealOnScroll>

        <div className="space-y-12">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={index * 0.15}>
              <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Content */}
                <div className={`card-dark ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0">
                      <i className={`fa-solid ${service.icon} text-xl text-orange`}></i>
                    </div>
                    <h3 className="font-semibold text-display-sm text-white">{service.title}</h3>
                  </div>

                  <p className="text-smoke leading-relaxed mb-8">{service.description}</p>

                  <ul className="feature-list mb-8">
                    {service.features.map((feature) => (
                      <li key={feature.text} className="feature-list-item">
                        <i className={`fa-solid ${feature.icon}`}></i>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-orange hover:gap-3 transition-all">
                    {service.cta}
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </a>
                </div>

                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHY AUTORISE SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function WhySection() {
  const differentiators = [
    {
      icon: "fa-medal",
      title: "20+ Years Combined Experience",
      description: "Two founders, each with a decade of web development expertise. We know what works.",
    },
    {
      icon: "fa-microchip",
      title: "AI-Native Approach",
      description: "Our visibility services are built from the ground up for how people search today.",
    },
    {
      icon: "fa-handshake",
      title: "Full-Service Partnership",
      description: "Website, SEO, AI visibility, maintenance—all from one team. No juggling agencies.",
    },
    {
      icon: "fa-bullseye",
      title: "Results Over Vanity Metrics",
      description: "We focus on what matters: leads, customers, and revenue. Not just rankings.",
    },
  ];

  return (
    <section id="why-us" className="relative bg-cream section-padding">
      <div className="container-main">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label justify-center text-orange">
            <i className="fa-solid fa-star"></i>
            Why Choose Us
          </span>
          <h2 className="text-display-lg text-charcoal mb-4">
            Why Businesses Choose <span className="text-gradient-orange">Autorise</span>
          </h2>
        </RevealOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {differentiators.map((item) => (
            <motion.div key={item.title} variants={scaleInVariants} className="card-light group">
              <div className="w-12 h-12 mb-5 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange transition-colors duration-300">
                <i className={`fa-solid ${item.icon} text-lg text-orange group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">{item.title}</h3>
              <p className="text-ash text-[15px] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOW IT WORKS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function ProcessSection() {
  const steps = [
    {
      number: "01",
      icon: "fa-compass",
      title: "Discovery",
      description: "We learn your business, goals, and competitive landscape. No cookie-cutter solutions.",
    },
    {
      number: "02",
      icon: "fa-hammer",
      title: "Build & Optimize",
      description: "Whether it's a new website or AI visibility campaign, we execute with precision.",
    },
    {
      number: "03",
      icon: "fa-rocket",
      title: "Grow Together",
      description: "We monitor, refine, and scale what's working. That's why most clients stay for years.",
    },
  ];

  return (
    <section id="process" className="relative bg-gradient-hero section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label justify-center">
            <i className="fa-solid fa-route"></i>
            Our Process
          </span>
          <h2 className="text-display-lg mb-4">
            Simple Process. <span className="text-gradient-orange">Serious Results.</span>
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={index * 0.12}>
              <div className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-orange/10 flex items-center justify-center border border-orange/20">
                  <i className={`fa-solid ${step.icon} text-3xl text-orange`}></i>
                </div>
                <span className="block font-mono text-orange/40 text-sm mb-2">{step.number}</span>
                <h3 className="font-semibold text-2xl mb-4">{step.title}</h3>
                <p className="text-smoke leading-relaxed">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4} className="text-center">
          <a href="#contact" className="btn-primary">
            Start Your Project
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Autorise rebuilt our website and handled our SEO. Within 6 months, we were ranking for terms we'd never touched before.",
      author: "Sarah M.",
      role: "CEO",
      company: "TechScale Solutions",
    },
    {
      quote: "Finally, an agency that actually understands both development AND marketing. They're true partners, not just vendors.",
      author: "Marcus R.",
      role: "Founder",
      company: "GrowthBox",
    },
    {
      quote: "We were skeptical about AI optimization, but Autorise showed us the data. Now we're getting inquiries from ChatGPT users.",
      author: "Elena K.",
      role: "Marketing Director",
      company: "InnovateLab",
    },
  ];

  return (
    <section className="relative bg-abyss section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label justify-center">
            <i className="fa-solid fa-quote-left"></i>
            Testimonials
          </span>
          <h2 className="text-display-lg mb-4">
            What Our <span className="text-gradient-orange">Clients</span> Say
          </h2>
        </RevealOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.author} variants={scaleInVariants} className="testimonial-card flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-orange text-sm"></i>
                ))}
              </div>
              <blockquote className="text-white/90 leading-relaxed flex-grow mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center">
                  <span className="font-semibold text-void">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-smoke text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function StatsSection() {
  const stats = [
    { value: "50+", label: "Clients Served", icon: "fa-users" },
    { value: "20+", label: "Years Combined Experience", icon: "fa-calendar-check" },
    { value: "2", label: "Core Specialties", icon: "fa-layer-group" },
    { value: "100%", label: "Focus on Your Growth", icon: "fa-chart-line" },
  ];

  return (
    <section className="relative bg-charcoal py-20 border-y border-white/[0.06]">
      <div className="container-main">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={scaleInVariants} className="text-center">
              <i className={`fa-solid ${stat.icon} text-orange text-2xl mb-4`}></i>
              <div className="stat-value mb-2">{stat.value}</div>
              <p className="text-smoke text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function CTASection() {
  return (
    <section id="contact" className="relative bg-void section-padding overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] glow-orb opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <span className="section-label justify-center">
              <i className="fa-solid fa-paper-plane"></i>
              Get Started
            </span>
            <h2 className="text-display-lg mb-6">
              Ready to Get <span className="text-gradient-orange">Found</span>?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="text-smoke text-lg mb-10 leading-relaxed">
              Let&apos;s talk about your website, your visibility, and how we can grow your business together.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <a href="mailto:hello@autorise.io" className="btn-primary text-base px-8 py-4">
              Book a Free Consultation
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <p className="text-ash mt-6 text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-check-circle text-orange"></i>
              No pressure. No jargon. Just a conversation about what&apos;s possible.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-void border-t border-white/[0.06]">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center">
                <span className="font-bold text-void text-lg">A</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">autorise</span>
            </a>
            <p className="text-smoke text-sm mb-6 leading-relaxed">
              Your web partner for the AI era. Building the future of digital visibility.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:hello@autorise.io" className="flex items-center gap-3 text-smoke hover:text-orange transition-colors">
                <i className="fa-solid fa-envelope w-4"></i>
                hello@autorise.io
              </a>
              <div className="flex items-center gap-3 text-smoke">
                <i className="fa-solid fa-location-dot w-4"></i>
                Oradea, Romania
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-sm">
              {["Web Development", "SEO", "AI Visibility (GEO/AEO)", "Maintenance & Support"].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-smoke hover:text-orange transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {["About Us", "Case Studies", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-smoke hover:text-orange transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: "fa-linkedin-in", label: "LinkedIn" },
                { icon: "fa-x-twitter", label: "Twitter" },
                { icon: "fa-envelope", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate flex items-center justify-center text-smoke hover:bg-orange hover:text-void transition-all"
                  aria-label={social.label}
                >
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ash text-sm">© {currentYear} Autorise. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-ash">
            <a href="#" className="hover:text-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
