import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Developers from "@/components/Developers";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";
import IntroGate from "@/components/IntroGate";

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [entered]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.muted = false;
        audio.play();
      } else {
        audio.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  if (!entered) {
    return <IntroGate onComplete={() => setEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <audio ref={audioRef} src="/audio/bg-music.mpeg" loop muted />
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-gold/30 bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-colors shadow-lg"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Contact />
      <Developers />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
