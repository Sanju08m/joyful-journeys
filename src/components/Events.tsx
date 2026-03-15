import { useState } from "react";
import { X } from "lucide-react";
import eventTechnical from "@/assets/event-technical.jpg";
import eventNontechnical from "@/assets/event-nontechnical.jpg";
import eventGroup from "@/assets/event-group.jpg";
import eventPpt from "@/assets/event-ppt.jpeg";
import eventReverse from "@/assets/event-reverse.jpeg";
import eventBrain from "@/assets/event-brain.jpeg";
import eventDebugg from "@/assets/event-debugg.jpeg";
import eventUi from "@/assets/event-ui.jpeg";

const eventData = {
  technical: [
    { name: "PPT Presentation", icon: "📊", description: "Present your ideas with impact and creativity", image: eventPpt },
    { name: "Reverse Coding", icon: "🔄", description: "Decode the output and find the original code", image: eventReverse },
    { name: "Brain Quiz", icon: "🧠", description: "Test your knowledge in a rapid-fire tech quiz", image: eventBrain },
    { name: "Debugging", icon: "🐛", description: "Find and fix bugs under time pressure", image: eventDebugg },
    { name: "UI Designing", icon: "🎨", description: "Design stunning interfaces from scratch", image: eventUi },
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

  const openSlider = (key: keyof typeof eventData) => {
    setActiveCategory(key);
  };

  const closeSlider = () => {
    setActiveCategory(null);
  };

  const slideList = activeCategory ? eventData[activeCategory] : [];

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

      {/* Full-screen overlay showing all events */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 backdrop-blur-xl bg-background/80 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={closeSlider}
            className="fixed top-6 right-6 z-20 w-10 h-10 rounded-full border border-gold/30 bg-card/80 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="container mx-auto px-6 py-20">
            {/* Category title */}
            <h3 className="font-display text-3xl text-gold text-center mb-10">
              {events.find((e) => e.key === activeCategory)?.title}
            </h3>

            {/* All events grid */}
            <div className={`grid gap-6 max-w-4xl mx-auto ${
              slideList.length === 1 ? "grid-cols-1 max-w-md" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {slideList.map((item, i) => (
                <div
                  key={item.name}
                  className="bg-card border border-gold/20 rounded-2xl overflow-hidden shadow-xl shadow-gold/5 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
                >
                  <div className="h-36 overflow-hidden">
                    {'image' in item && item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-gold/20 via-gold-dark/10 to-background flex items-center justify-center">
                        <span className="text-6xl drop-shadow-lg">{item.icon}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-display text-xl text-gold mb-2">{item.name}</h4>
                    <p className="text-foreground/60 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;
