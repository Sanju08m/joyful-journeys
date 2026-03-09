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

      {/* Slide Overlay */}
      {activeCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-background/70"
          onClick={closeSlider}
        >
          <div
            className="relative w-full max-w-lg mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeSlider}
              className="absolute -top-12 right-0 text-foreground/70 hover:text-foreground transition-colors"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Slide card */}
            <div className="bg-card border border-gold/20 rounded-2xl overflow-hidden shadow-2xl shadow-gold/10">
              <div className="relative h-48 bg-gradient-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center">
                <span className="text-7xl">{slideList[currentSlide].icon}</span>
                {/* Slide counter */}
                <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {currentSlide + 1} / {slideList.length}
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="font-display text-2xl text-gold mb-3">
                  {slideList[currentSlide].name}
                </h3>
                <p className="text-foreground/60">{slideList[currentSlide].description}</p>
              </div>
            </div>

            {/* Navigation */}
            {slideList.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold disabled:opacity-30 hover:bg-gold/10 transition-colors disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {slideList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentSlide ? "bg-gold w-6" : "bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slideList.length - 1}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold disabled:opacity-30 hover:bg-gold/10 transition-colors disabled:hover:bg-transparent"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
