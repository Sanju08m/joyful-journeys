import { Anchor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-gold">
            <Anchor className="w-5 h-5" />
            <span className="font-display text-lg font-bold tracking-wider">
              GLTF 2026
            </span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            © 2026 Grand Line Tech Fest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
