import { Mail, Github, Linkedin } from "lucide-react";
import devSanju from "@/assets/dev-sanju.jpeg";

const developers = [
  {
    name: "Sanjay Kumar G",
    image: devSanju,
    email: "ksanjay14796@gmail.com",
    linkedin: "https://www.linkedin.com/in/sanju-m-2b176930b",
    github: "https://github.com/Sanju08m",
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
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gold/30">
                <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-lg text-foreground mb-3">{dev.name}</h3>
              <div className="flex items-center justify-center gap-4 mb-3">
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href={`mailto:${dev.email}`} className="text-muted-foreground hover:text-gold transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
