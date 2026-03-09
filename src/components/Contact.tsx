import { Phone } from "lucide-react";

const contacts = {
  students: [
    { name: "Sarathi U", phone: "9025587886" },
    { name: "Keerthana G", phone: "8838570776" },
  ],
  staff: [
    { name: "Sneha N", phone: "8526382792" },
    { name: "Aravind S", phone: "9894304896" },
  ],
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-center mb-12">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Student Coordinators */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="font-display text-lg text-gold mb-6 text-center">
              Student Coordinator
            </h3>
            <div className="space-y-4">
              {contacts.students.map((contact) => (
                <div key={contact.name} className="flex items-center justify-between">
                  <span className="text-foreground/80">{contact.name}</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Coordinators */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="font-display text-lg text-gold mb-6 text-center">
              Staff Coordinator
            </h3>
            <div className="space-y-4">
              {contacts.staff.map((contact) => (
                <div key={contact.name} className="flex items-center justify-between">
                  <span className="text-foreground/80">{contact.name}</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
