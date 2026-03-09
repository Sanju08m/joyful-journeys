import { Anchor, CalendarDays, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        {/* Tagline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Anchor className="w-5 h-5 text-gold animate-float" />
          <p className="text-gold-light uppercase tracking-[0.3em] text-sm font-medium">
            Set Sail for Innovation
          </p>
          <Anchor className="w-5 h-5 text-gold animate-float" />
        </div>

        {/* College Name */}
        <p className="text-foreground uppercase tracking-[0.2em] text-sm mb-4">
          Asian College
        </p>

        {/* Main Title */}
        <h1 className="font-display font-bold mb-4">
          <span className="block text-5xl md:text-7xl lg:text-8xl text-gold tracking-wide">
            Grand Line
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl text-foreground tracking-wider mt-2">
            Tech Fest 2026
          </span>
        </h1>

        {/* Presented By */}
        <p className="text-foreground uppercase tracking-widest text-xs mb-2 mt-6">
          Proudly Presented by
        </p>
        <p className="text-gold font-display text-lg tracking-wide mb-8">
          Information Technology
        </p>

        {/* Event Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
          <div className="flex items-center gap-2 text-foreground/80">
            <CalendarDays className="w-4 h-4 text-gold" />
            <span className="text-sm">March 18, 2026</span>
          </div>
          <a
            href="https://maps.app.goo.gl/eVAdYn1d2xc4XCUQ6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/80 hover:text-gold transition-colors"
          >
            <MapPin className="w-4 h-4 text-gold" />
            <span className="text-sm underline underline-offset-2">The Grand Arena</span>
          </a>
        </div>

        {/* Description */}
        <p className="text-foreground/60 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
          An adventurous symposium inspired by the spirit of innovation and exploration.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf2Wxi3RSQhtzPoqHFi7r5bRFnuXKCnNQ55Zr-vFXK0jlhYUA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary rounded-full"
          >
            Register Now
          </a>
          <a href="#events" className="btn-outline rounded-full">
            Explore Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
