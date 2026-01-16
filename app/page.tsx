"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Code2,
  Search,
  Sparkles,
  Users,
  Zap,
  TrendingUp,
  MessageSquare,
  Clock,
  Target,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-coral-deep flex items-center justify-center">
              <span className="font-display font-bold text-void text-lg">A</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-cream group-hover:text-coral transition-colors">
              autorise
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-smoke hover:text-cream transition-colors duration-300 text-sm font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn-primary text-xs py-2.5 px-5">
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cream"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 space-y-4 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-cream text-lg font-medium py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary inline-flex mt-4"
            >
              Let&apos;s Talk
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-lines" />
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] glow-orb bg-coral/20"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] glow-orb bg-coral/10"
      />
      <div className="bg-noise absolute inset-0" />

      <div className="container-main relative z-10 py-20">
        <div className="max-w-5xl">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-coral" />
            <span className="text-coral font-mono text-sm tracking-widest uppercase">
              Your Web Partner for the AI Era
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-display text-display-xl mb-8"
          >
            Get Found by{" "}
            <span className="text-gradient-coral">Google</span>,{" "}
            <span className="text-gradient-coral">ChatGPT</span>, and Beyond.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-smoke text-xl md:text-2xl leading-relaxed max-w-3xl mb-10"
          >
            We build high-performance websites and optimize your digital presence
            so customers find you—whether they&apos;re searching on Google or asking AI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn-primary group">
              Let&apos;s Talk
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a href="#services" className="btn-secondary group">
              See Our Services
              <ChevronRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 pt-10 border-t border-white/10"
        >
          <p className="text-ash text-sm tracking-wide mb-8">
            Trusted by 50+ businesses across Europe, UK & US
          </p>
          <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-40">
            {/* Logo placeholders - styled as text for now */}
            {["TechCorp", "InnovateLab", "GrowthCo", "ScaleUp", "NextGen"].map(
              (name, i) => (
                <div
                  key={name}
                  className="font-display font-bold text-xl text-cream/50 tracking-tight"
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
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-coral" />
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
      icon: Search,
      title: "Traditional SEO",
      description:
        "Rank higher on Google and drive organic traffic that converts.",
    },
    {
      icon: Sparkles,
      title: "AI Visibility (GEO/AEO)",
      description:
        "Get recommended by ChatGPT, Perplexity, and AI search engines.",
    },
    {
      icon: Code2,
      title: "Web Development",
      description: "Fast, modern websites built to perform and scale.",
    },
  ];

  return (
    <section className="relative bg-gradient-light text-charcoal section-padding">
      <div className="container-main">
        <RevealOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-display text-display-lg mb-6 text-charcoal">
            The Way People Find Businesses Is{" "}
            <span className="text-gradient-coral">Changing</span>
          </h2>
          <p className="text-ash text-lg md:text-xl leading-relaxed">
            Google is still king—but now customers are also asking ChatGPT,
            Perplexity, and AI assistants for recommendations. If your business
            isn&apos;t visible in both worlds, you&apos;re leaving money on the table.
          </p>
          <p className="text-coral font-display font-semibold text-lg mt-6">
            Most agencies haven&apos;t caught up. We have.
          </p>
        </RevealOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={scaleInVariants}
              className="card-light p-8 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-coral/10 flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                <feature.icon className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-charcoal">
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
      title: "Websites & Web Apps That Work",
      description:
        "Your website is your hardest-working salesperson. We build fast, modern, conversion-focused sites that look great and actually drive results—from landing pages to full web applications.",
      features: [
        "Custom websites & landing pages",
        "Web applications & portals",
        "E-commerce solutions",
        "Ongoing maintenance & support",
        "Performance optimization",
      ],
      cta: "See Web Projects",
      icon: Code2,
    },
    {
      title: "Be Seen by Google and AI",
      description:
        "SEO isn't dead—it's evolving. We combine traditional search optimization with cutting-edge AI visibility strategies so you show up wherever your customers are looking.",
      features: [
        "Search Engine Optimization (SEO)",
        "Generative Engine Optimization (GEO)",
        "AI Answer Optimization (AEO)",
        "Local search & Google Business Profile",
        "Content strategy & optimization",
      ],
      cta: "See Visibility Services",
      icon: Globe,
    },
  ];

  return (
    <section id="services" className="relative bg-abyss section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div className="bg-noise absolute inset-0" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="heading-display text-display-lg mb-4">
            Everything You Need to Get Found and{" "}
            <span className="text-gradient-coral">Convert</span>
          </h2>
          <p className="text-smoke text-lg">Two core capabilities. One partner.</p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={index * 0.2}>
              <div className="card-dark card-glow p-8 lg:p-10 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-7 h-7 text-coral" />
                  </div>
                  <h3 className="font-display font-bold text-display-sm">
                    {service.title}
                  </h3>
                </div>

                <p className="text-smoke leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-cream/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-coral font-display font-semibold hover:gap-3 transition-all group"
                >
                  {service.cta}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
      icon: Clock,
      title: "20+ Years Combined Experience",
      description:
        "Two founders, each with a decade of web development expertise. We've seen trends come and go—and know what actually works.",
    },
    {
      icon: Sparkles,
      title: "AI-Native Approach",
      description:
        "We don't bolt AI onto old strategies. Our visibility services are built from the ground up for how people search today.",
    },
    {
      icon: Users,
      title: "Full-Service Partnership",
      description:
        "Website, SEO, AI visibility, maintenance—all from one team. No juggling agencies or miscommunication.",
    },
    {
      icon: Target,
      title: "Results Over Vanity Metrics",
      description:
        "We focus on what matters: leads, customers, and revenue. Not just rankings and traffic numbers.",
    },
  ];

  return (
    <section id="why-us" className="relative bg-cream section-padding">
      <div className="container-main">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="heading-display text-display-lg text-charcoal mb-4">
            Why Businesses Choose{" "}
            <span className="text-gradient-coral">Autorise</span>
          </h2>
        </RevealOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              variants={scaleInVariants}
              className="card-light p-6 lg:p-8 group hover:shadow-2xl"
            >
              <div className="w-12 h-12 mb-5 rounded-xl bg-coral/10 flex items-center justify-center group-hover:bg-coral group-hover:text-void transition-colors duration-300">
                <item.icon className="w-6 h-6 text-coral group-hover:text-void transition-colors duration-300" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal mb-3">
                {item.title}
              </h3>
              <p className="text-ash text-sm leading-relaxed">
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
      title: "Discovery",
      description:
        "We learn your business, goals, and competitive landscape. No cookie-cutter solutions—just strategy built around you.",
    },
    {
      number: "02",
      title: "Build & Optimize",
      description:
        "Whether it's a new website, SEO overhaul, or AI visibility campaign, we execute with precision and keep you informed.",
    },
    {
      number: "03",
      title: "Grow Together",
      description:
        "We monitor, refine, and scale what's working. Your success is our success—that's why most clients stay for years.",
    },
  ];

  return (
    <section id="process" className="relative bg-charcoal section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="bg-noise absolute inset-0" />

      <div className="container-main relative z-10">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="heading-display text-display-lg mb-4">
            Simple Process. <span className="text-gradient-coral">Serious Results.</span>
          </h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={index * 0.15}>
              <div className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-coral/50 to-transparent -translate-x-4" />
                )}

                <div className="mb-6">
                  <span className="font-mono text-coral text-5xl font-bold opacity-50">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">
                  {step.title}
                </h3>
                <p className="text-smoke leading-relaxed">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.5} className="text-center">
          <a href="#contact" className="btn-primary">
            Start Your Project
            <ArrowRight size={18} />
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
      company: "TechScale Solutions",
    },
    {
      quote:
        "Finally, an agency that actually understands both development AND marketing. They're true partners, not just vendors.",
      author: "Marcus R.",
      company: "GrowthBox",
    },
    {
      quote:
        "We were skeptical about AI optimization, but Autorise showed us the data. Now we're getting inquiries from people who found us through ChatGPT.",
      author: "Elena K.",
      company: "InnovateLab",
    },
  ];

  return (
    <section className="relative bg-pearl section-padding">
      <div className="container-main">
        <RevealOnScroll className="text-center mb-16">
          <h2 className="heading-display text-display-lg text-charcoal mb-4">
            What Our <span className="text-gradient-coral">Clients</span> Say
          </h2>
        </RevealOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={scaleInVariants}
              className="card-light p-8 flex flex-col"
            >
              <MessageSquare className="w-10 h-10 text-coral/30 mb-6" />
              <blockquote className="text-charcoal leading-relaxed flex-grow mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="border-t border-black/5 pt-6">
                <p className="font-display font-bold text-charcoal">
                  {testimonial.author}
                </p>
                <p className="text-ash text-sm">{testimonial.company}</p>
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
    { value: "50+", label: "Clients Served" },
    { value: "20+", label: "Years Combined Experience" },
    { value: "2", label: "Core Specialties" },
    { value: "100%", label: "Focus on Your Growth" },
  ];

  return (
    <section className="relative bg-abyss py-16 md:py-20 border-y border-white/5">
      <div className="bg-noise absolute inset-0" />
      <div className="container-main relative z-10">
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
              <div className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-coral mb-2">
                {stat.value}
              </div>
              <p className="text-smoke text-sm md:text-base">{stat.label}</p>
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
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] glow-orb bg-coral/15" />
      <div className="bg-noise absolute inset-0" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="heading-display text-display-lg mb-6">
              Ready to Get <span className="text-gradient-coral">Found</span>?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <p className="text-smoke text-xl mb-10 leading-relaxed">
              Let&apos;s talk about your website, your visibility, and how we can grow
              your business together.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <a href="mailto:hello@autorise.io" className="btn-primary text-base px-8 py-4">
              Book a Free Consultation
              <ArrowRight size={20} />
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <p className="text-ash mt-6 text-sm">
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
    <footer className="bg-void border-t border-white/5">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-coral-deep flex items-center justify-center">
                <span className="font-display font-bold text-void text-lg">A</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                autorise
              </span>
            </a>
            <p className="text-smoke text-sm mb-6">
              Your web partner for the AI era.
            </p>
            <div className="space-y-2 text-sm text-ash">
              <a
                href="mailto:hello@autorise.io"
                className="flex items-center gap-2 hover:text-coral transition-colors"
              >
                <Mail size={16} />
                hello@autorise.io
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Oradea, Romania
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-smoke text-sm hover:text-coral transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-smoke text-sm hover:text-coral transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center text-smoke hover:bg-coral hover:text-void transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center text-smoke hover:bg-coral hover:text-void transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:hello@autorise.io"
                className="w-10 h-10 rounded-lg bg-charcoal flex items-center justify-center text-smoke hover:bg-coral hover:text-void transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ash text-sm">
            © {currentYear} Autorise. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-ash">
            <a href="#" className="hover:text-coral transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-coral transition-colors">
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
