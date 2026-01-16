"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS (Surfer-style smooth animations)
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
// NAVIGATION (Surfer-inspired)
// ═══════════════════════════════════════════════════════════════════════════════

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
          ? "bg-void/90 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sunny to-sunny-dark" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-semibold text-void text-lg">A</span>
              </div>
            </div>
            <span className="font-semibold text-[19px] tracking-[-0.02em] text-white group-hover:text-sunny transition-colors duration-300">
              autorise
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link px-4"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary">
              Get Started
              <i className="fa-solid fa-arrow-right text-[13px]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
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
                className="block text-white text-lg font-medium py-3 hover:text-sunny transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary inline-flex mt-4"
            >
              Get Started
              <i className="fa-solid fa-arrow-right text-[13px]" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION (Surfer-inspired with mesh gradients)
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-[72px] overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <motion.div
        style={{ y }}
        className="absolute top-[10%] left-[20%] w-[600px] h-[600px] glow-orb-violet"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
        className="absolute top-[30%] right-[10%] w-[400px] h-[400px] glow-orb-sunny"
      />

      <div className="container-main relative z-10 py-20 lg:py-32">
        <div className="max-w-[56rem]">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-6"
          >
            <i className="fa-solid fa-sparkles" />
            Your Web Partner for the AI Era
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-2xl font-semibold tracking-[-0.04em] mb-8 text-white"
          >
            Get Found by{" "}
            <span className="text-gradient-sunny">Google</span>,{" "}
            <span className="text-gradient-violet">ChatGPT</span>, and Beyond.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-smoke text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          >
            We build high-performance websites and optimize your digital presence
            so customers find you—whether they&apos;re searching on Google or asking AI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn-primary">
              Let&apos;s Talk
              <i className="fa-solid fa-arrow-right text-[13px]" />
            </a>
            <a href="#services" className="btn-secondary">
              See Our Services
              <i className="fa-solid fa-chevron-right text-[12px]" />
            </a>
          </motion.div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-28 pt-10 border-t border-white/[0.06]"
        >
          <p className="text-ash text-sm tracking-wide mb-8 flex items-center gap-2">
            <i className="fa-solid fa-shield-check text-sunny" />
            Trusted by 50+ businesses across Europe, UK & US
          </p>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {["TechCorp", "InnovateLab", "GrowthCo", "ScaleUp", "NextGen"].map(
              (name) => (
                <div
                  key={name}
                  className="font-semibold text-lg text-white/30 tracking-tight hover:text-white/50 transition-colors cursor-default"
                >
                  {name}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-smoke/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <i className="fa-solid fa-chevron-down text-sm" />
        </motion.div>
      </motion.div>
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
      description:
        "Rank higher on Google and drive organic traffic that converts.",
      gradient: "from-sunny to-sunny-light",
    },
    {
      icon: "fa-robot",
      title: "AI Visibility (GEO/AEO)",
      description:
        "Get recommended by ChatGPT, Perplexity, and AI search engines.",
      gradient: "from-violet to-violet-light",
    },
    {
      icon: "fa-code",
      title: "Web Development",
      description: "Fast, modern websites built to perform and scale.",
      gradient: "from-sunny to-violet",
    },
  ];

  return (
    <section className="relative bg-gradient-light section-padding">
      <div className="container-main">
        <RevealOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label text-sunny mb-4 justify-center">
            <i className="fa-solid fa-chart-line-up" />
            The Opportunity
          </span>
          <h2 className="text-display-lg text-charcoal mb-6">
            The Way People Find Businesses Is{" "}
            <span className="text-gradient-sunny">Changing</span>
          </h2>
          <p className="text-ash text-lg leading-relaxed">
            Google is still king—but now customers are also asking ChatGPT,
            Perplexity, and AI assistants for recommendations. If your business
            isn&apos;t visible in both worlds, you&apos;re leaving money on the table.
          </p>
          <p className="text-sunny font-semibold text-lg mt-6 flex items-center justify-center gap-2">
            <i className="fa-solid fa-bolt" />
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
            <motion.div
              key={feature.title}
              variants={scaleInVariants}
              className="card-light group"
            >
              <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                <i className={`fa-solid ${feature.icon} text-xl text-white`} />
              </div>
              <h3 className="font-semibold text-xl text-charcoal mb-3 tracking-[-0.02em]">
                {feature.title}
              </h3>
              <p className="text-ash leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES SECTION
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
        { icon: "fa-window-restore", text: "Web applications & portals" },
        { icon: "fa-cart-shopping", text: "E-commerce solutions" },
        { icon: "fa-wrench", text: "Ongoing maintenance & support" },
        { icon: "fa-gauge-high", text: "Performance optimization" },
      ],
      cta: "Explore Web Services",
      color: "sunny",
    },
    {
      icon: "fa-eye",
      title: "Be Seen by Google and AI",
      description:
        "SEO isn't dead—it's evolving. We combine traditional search optimization with cutting-edge AI visibility strategies.",
      features: [
        { icon: "fa-magnifying-glass", text: "Search Engine Optimization (SEO)" },
        { icon: "fa-wand-magic-sparkles", text: "Generative Engine Optimization (GEO)" },
        { icon: "fa-message-bot", text: "AI Answer Optimization (AEO)" },
        { icon: "fa-location-dot", text: "Local search & Google Business Profile" },
        { icon: "fa-pen-nib", text: "Content strategy & optimization" },
      ],
      cta: "Explore Visibility Services",
      color: "violet",
    },
  ];

  return (
    <section id="services" className="relative bg-gradient-dark-section section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-orb-violet opacity-20" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label mb-4 justify-center">
            <i className="fa-solid fa-cubes" />
            Our Services
          </span>
          <h2 className="text-display-lg mb-4">
            Everything You Need to Get Found and{" "}
            <span className="text-gradient-sunny">Convert</span>
          </h2>
          <p className="text-smoke text-lg">Two core capabilities. One partner.</p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={index * 0.15}>
              <div className="card-dark h-full flex flex-col">
                <div className="flex items-start gap-5 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    service.color === "sunny"
                      ? "bg-sunny/10 text-sunny"
                      : "bg-violet/10 text-violet"
                  }`}>
                    <i className={`fa-solid ${service.icon} text-2xl`} />
                  </div>
                  <h3 className="font-semibold text-display-sm text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-smoke leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="feature-list mb-8 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature.text} className="feature-list-item">
                      <i className={`fa-solid ${feature.icon}`} />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 font-semibold transition-all group ${
                    service.color === "sunny" ? "text-sunny" : "text-violet"
                  }`}
                >
                  {service.cta}
                  <i className="fa-solid fa-arrow-right text-sm transition-transform group-hover:translate-x-1" />
                </a>
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
      description:
        "Two founders, each with a decade of web development expertise. We've seen trends come and go—and know what actually works.",
    },
    {
      icon: "fa-microchip",
      title: "AI-Native Approach",
      description:
        "We don't bolt AI onto old strategies. Our visibility services are built from the ground up for how people search today.",
    },
    {
      icon: "fa-handshake",
      title: "Full-Service Partnership",
      description:
        "Website, SEO, AI visibility, maintenance—all from one team. No juggling agencies or miscommunication.",
    },
    {
      icon: "fa-bullseye",
      title: "Results Over Vanity Metrics",
      description:
        "We focus on what matters: leads, customers, and revenue. Not just rankings and traffic numbers.",
    },
  ];

  return (
    <section id="why-us" className="relative bg-cream section-padding">
      <div className="container-main">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label text-sunny mb-4 justify-center">
            <i className="fa-solid fa-star" />
            Why Choose Us
          </span>
          <h2 className="text-display-lg text-charcoal mb-4">
            Why Businesses Choose{" "}
            <span className="text-gradient-violet">Autorise</span>
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
            <motion.div
              key={item.title}
              variants={scaleInVariants}
              className="card-light group"
            >
              <div className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-sunny/10 to-violet/10 flex items-center justify-center group-hover:from-sunny group-hover:to-violet transition-all duration-500">
                <i className={`fa-solid ${item.icon} text-lg text-sunny group-hover:text-white transition-colors duration-500`} />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3 tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="text-ash text-[15px] leading-relaxed">
                {item.description}
              </p>
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
      description:
        "We learn your business, goals, and competitive landscape. No cookie-cutter solutions—just strategy built around you.",
    },
    {
      number: "02",
      icon: "fa-hammer",
      title: "Build & Optimize",
      description:
        "Whether it's a new website, SEO overhaul, or AI visibility campaign, we execute with precision and keep you informed.",
    },
    {
      number: "03",
      icon: "fa-rocket",
      title: "Grow Together",
      description:
        "We monitor, refine, and scale what's working. Your success is our success—that's why most clients stay for years.",
    },
  ];

  return (
    <section id="process" className="relative bg-mesh section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <span className="section-label mb-4 justify-center">
            <i className="fa-solid fa-route" />
            Our Process
          </span>
          <h2 className="text-display-lg mb-4">
            Simple Process. <span className="text-gradient-sunny">Serious Results.</span>
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={index * 0.12}>
              <div className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px">
                    <div className="w-full h-full bg-gradient-to-r from-sunny/40 to-violet/40" />
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sunny/20 to-violet/20 flex items-center justify-center border border-white/[0.06]">
                    <i className={`fa-solid ${step.icon} text-2xl text-sunny`} />
                  </div>
                  <span className="font-mono text-sunny/50 text-4xl font-semibold">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-2xl mb-4 tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-smoke leading-relaxed">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4} className="text-center">
          <a href="#contact" className="btn-primary">
            Start Your Project
            <i className="fa-solid fa-arrow-right text-[13px]" />
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
      quote:
        "Autorise rebuilt our website and handled our SEO. Within 6 months, we were ranking for terms we'd never touched before. The AI visibility work is next-level.",
      author: "Sarah M.",
      role: "CEO",
      company: "TechScale Solutions",
    },
    {
      quote:
        "Finally, an agency that actually understands both development AND marketing. They're true partners, not just vendors.",
      author: "Marcus R.",
      role: "Founder",
      company: "GrowthBox",
    },
    {
      quote:
        "We were skeptical about AI optimization, but Autorise showed us the data. Now we're getting inquiries from people who found us through ChatGPT.",
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
          <span className="section-label mb-4 justify-center">
            <i className="fa-solid fa-quote-left" />
            Testimonials
          </span>
          <h2 className="text-display-lg mb-4">
            What Our <span className="text-gradient-violet">Clients</span> Say
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
            <motion.div
              key={testimonial.author}
              variants={scaleInVariants}
              className="testimonial-card flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-sunny text-sm" />
                ))}
              </div>
              <blockquote className="text-white/90 leading-relaxed flex-grow mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunny to-violet flex items-center justify-center">
                  <span className="font-semibold text-white">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-smoke text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
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
            <motion.div
              key={stat.label}
              variants={scaleInVariants}
              className="text-center"
            >
              <i className={`fa-solid ${stat.icon} text-sunny text-2xl mb-4`} />
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
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-orb-sunny opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] glow-orb-violet opacity-15" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <span className="section-label mb-4 justify-center">
              <i className="fa-solid fa-paper-plane" />
              Get Started
            </span>
            <h2 className="text-display-lg mb-6">
              Ready to Get <span className="text-gradient-sunny">Found</span>?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="text-smoke text-lg mb-10 leading-relaxed">
              Let&apos;s talk about your website, your visibility, and how we can grow
              your business together.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <a href="mailto:hello@autorise.io" className="btn-primary text-base px-8 py-4">
              Book a Free Consultation
              <i className="fa-solid fa-arrow-right" />
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <p className="text-ash mt-6 text-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-check-circle text-sunny" />
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

  const footerLinks = {
    services: [
      { name: "Web Development", href: "#services" },
      { name: "SEO", href: "#services" },
      { name: "AI Visibility (GEO/AEO)", href: "#services" },
      { name: "Maintenance & Support", href: "#services" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
  };

  return (
    <footer className="bg-void border-t border-white/[0.06]">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sunny to-sunny-dark flex items-center justify-center">
                <span className="font-semibold text-void text-lg">A</span>
              </div>
              <span className="font-semibold text-xl tracking-[-0.02em]">
                autorise
              </span>
            </a>
            <p className="text-smoke text-sm mb-6 leading-relaxed">
              Your web partner for the AI era. Building the future of digital visibility.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:hello@autorise.io"
                className="flex items-center gap-3 text-smoke hover:text-sunny transition-colors"
              >
                <i className="fa-solid fa-envelope w-4" />
                hello@autorise.io
              </a>
              <div className="flex items-center gap-3 text-smoke">
                <i className="fa-solid fa-location-dot w-4" />
                Oradea, Romania
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-smoke text-sm hover:text-sunny transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-smoke text-sm hover:text-sunny transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-smoke hover:bg-sunny hover:text-void transition-all duration-300"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-smoke hover:bg-sunny hover:text-void transition-all duration-300"
                aria-label="Twitter"
              >
                <i className="fa-brands fa-x-twitter" />
              </a>
              <a
                href="mailto:hello@autorise.io"
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-smoke hover:bg-sunny hover:text-void transition-all duration-300"
                aria-label="Email"
              >
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ash text-sm">
            © {currentYear} Autorise. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-ash">
            <a href="#" className="hover:text-sunny transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-sunny transition-colors">
              Terms of Service
            </a>
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
    <main className="bg-noise">
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
