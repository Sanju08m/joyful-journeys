import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import eventTechnical from "@/assets/event-technical.jpg";
import eventNontechnical from "@/assets/event-nontechnical.jpg";
import eventGroup from "@/assets/event-group.jpg";

const eventData = {
  technical: [
    { name: "PPT Presentation", icon: "📊", description: "Present your ideas with impact and creativity" },
    { name: "Reverse Coding", icon: "🔄", description: "Decode the output and find the original code" },
    { name: "Brain Quiz", icon: "🧠", description: "Test your knowledge in a rapid-fire tech quiz" },
    { name: "Debugging", icon: "🐛", description: "Find and fix bugs under time pressure" },
    { name: "UI Designing", icon: "🎨", description: "Design stunning interfaces from scratch" },
  ],
  nonTechnical: [
    { name: "Treasure Hunt", icon: "🗺️", description: "Follow clues and race to find the hidden treasure" },
    { name: "Power Lift", icon: "💪", description: "Show your strength in this physical challenge" },
    { name: "Logo Guess", icon: "🔍", description: "Identify famous logos and brands" },
    { name: "IPL Auction", icon: "🏏", description: "Bid, strategize, and build your dream team" },
    { name: "E-Sportz", icon: "🎮", description: "Compete in thrilling esports battles" },
  ],
  group: [
    { name: "Talent Show", icon: "🌟", description: "Showcase your team's unique talents on stage" },
  ],
};

const events = [
  {
    title: "Technical Events",
    icon: "⚔️",
    count: 5,
    image: eventTechnical,
    description: "Coding challenges, hackathons, and tech quizzes",
    key: "technical" as const,
  },
  {
    title: "Non-Technical Events",
    icon: "🎭",
    count: 5,
    image: eventNontechnical,
    description: "Creative arts, debates, and performance competitions",
    key: "nonTechnical" as const,
  },
  {
    title: "Group Events",
    icon: "🏴‍☠️",
    count: 1,
    image: eventGroup,
    description: "Team-based challenges and collaborative adventures",
    key: "group" as const,
  },
];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof eventData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openSlider = (key: keyof typeof eventData) => {
    setActiveCategory(key);
    setCurrentSlide(0);
  };

  const closeSlider = () => {
    setActiveCategory(null);
    setCurrentSlide(0);
  };

  const slideList = activeCategory ? eventData[activeCategory] : [];

  const nextSlide = () => {
    if (currentSlide < slideList.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mb-12">Events</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {events.map((event) => (
            <div
              key={event.title}
              className="card-event group cursor-pointer"
              onClick={() => openSlider(event.key)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{event.icon}</span>
                  <h3 className="font-display text-lg text-gold">{event.title}</h3>
                </div>
                <p className="text-foreground/60 text-sm mb-3">{event.description}</p>
                <span className="text-gold-light text-sm font-semibold">
                  {event.count} {event.count === 1 ? "event" : "events"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Slide Overlay */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 backdrop-blur-xl bg-background/80">
          {/* Close button */}
          <button
            onClick={closeSlider}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-gold/30 bg-card/80 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category title */}
          <div className="absolute top-6 left-6 z-10">
            <h3 className="font-display text-xl text-gold">
              {events.find((e) => e.key === activeCategory)?.title}
            </h3>
            <p className="text-foreground/50 text-sm">
              {currentSlide + 1} of {slideList.length}
            </p>
          </div>

          {/* Slides container */}
          <div className="h-full flex items-center justify-center px-16">
            {/* Left arrow */}
            {slideList.length > 1 && (
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-4 z-10 w-12 h-12 rounded-full border border-gold/30 bg-card/60 flex items-center justify-center text-gold disabled:opacity-20 hover:bg-gold/10 transition-colors disabled:hover:bg-card/60"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Slide */}
            <div
              key={currentSlide}
              className="w-full max-w-md animate-fade-in"
            >
              <div className="bg-card border border-gold/20 rounded-3xl overflow-hidden shadow-2xl shadow-gold/10">
                <div className="relative h-56 bg-gradient-to-br from-gold/20 via-gold-dark/10 to-background flex items-center justify-center">
                  <span className="text-8xl drop-shadow-lg">{slideList[currentSlide].icon}</span>
                </div>
                <div className="p-10 text-center">
                  <h3 className="font-display text-3xl text-gold mb-4">
                    {slideList[currentSlide].name}
                  </h3>
                  <p className="text-foreground/60 text-lg leading-relaxed">
                    {slideList[currentSlide].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right arrow */}
            {slideList.length > 1 && (
              <button
                onClick={nextSlide}
                disabled={currentSlide === slideList.length - 1}
                className="absolute right-4 z-10 w-12 h-12 rounded-full border border-gold/30 bg-card/60 flex items-center justify-center text-gold disabled:opacity-20 hover:bg-gold/10 transition-colors disabled:hover:bg-card/60"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Dot indicators */}
          {slideList.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
              {slideList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "bg-gold w-8" : "bg-foreground/30 w-2.5 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Events;
