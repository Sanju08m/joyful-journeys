import eventTechnical from "@/assets/event-technical.jpg";
import eventNontechnical from "@/assets/event-nontechnical.jpg";
import eventGroup from "@/assets/event-group.jpg";

const events = [
  {
    title: "Technical Events",
    icon: "⚔️",
    count: 5,
    image: eventTechnical,
    description: "Coding challenges, hackathons, and tech quizzes",
  },
  {
    title: "Non-Technical Events",
    icon: "🎭",
    count: 5,
    image: eventNontechnical,
    description: "Creative arts, debates, and performance competitions",
  },
  {
    title: "Group Events",
    icon: "🏴‍☠️",
    count: 1,
    image: eventGroup,
    description: "Team-based challenges and collaborative adventures",
  },
];

const Events = () => {
  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mb-12">Events</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {events.map((event) => (
            <div key={event.title} className="card-event group cursor-pointer">
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
    </section>
  );
};

export default Events;
