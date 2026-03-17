import { Mail } from "lucide-react";

const developers = [
  {
    name: "Sanjay Kumar G",
    initials: "SK",
    email: "ksanjay14796@gmail.com",
  },
];

const Developers = () => {
  return (
    <section id="developers" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mb-12">Developers</h2>

        <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
          {developers.map((dev) => (
            <div
              key={dev.name}
              className="bg-card rounded-lg p-6 border border-border text-center min-w-[250px] hover:border-gold/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-xl text-gold font-bold">
                  {dev.initials}
                </span>
              </div>
              <h3 className="font-display text-lg text-foreground mb-2">{dev.name}</h3>
              <a
                href={`mailto:${dev.email}`}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{dev.email}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
