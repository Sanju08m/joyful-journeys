import { useState, useRef } from "react";

type Phase = "prompt" | "video" | "denied" | "done";

interface IntroGateProps {
  onComplete: () => void;
}

const IntroGate = ({ onComplete }: IntroGateProps) => {
  const [phase, setPhase] = useState<Phase>("prompt");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleYes = () => {
    setPhase("video");
  };

  const handleNo = () => {
    setPhase("denied");
  };

  const handleVideoEnd = () => {
    setPhase("done");
    onComplete();
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setPhase("done");
    onComplete();
  };

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {phase === "prompt" && (
        <div className="text-center animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-gold font-bold tracking-wider mb-10 drop-shadow-[0_0_30px_hsl(var(--gold)/0.4)]">
            ENTER GRAND LINE
          </h1>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleYes}
              className="px-10 py-3 rounded-full bg-gold text-background font-bold text-lg tracking-wider hover:bg-gold-light transition-colors shadow-[0_0_20px_hsl(var(--gold)/0.3)]"
            >
              Yes
            </button>
            <button
              onClick={handleNo}
              className="px-10 py-3 rounded-full border-2 border-gold/50 text-gold font-bold text-lg tracking-wider hover:border-gold hover:bg-gold/10 transition-colors"
            >
              No
            </button>
          </div>
        </div>
      )}

      {phase === "video" && (
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 px-6 py-2 rounded-full border border-gold/40 bg-black/60 backdrop-blur-sm text-gold text-sm font-medium tracking-wider hover:bg-black/80 transition-colors"
          >
            Skip →
          </button>
        </div>
      )}

      {phase === "denied" && (
        <div className="text-center animate-fade-in">
          <p className="text-foreground/60 text-xl md:text-2xl font-display tracking-wide mb-6">
            You are not worthy to enter the Grand Line.
          </p>
          <button
            onClick={() => setPhase("prompt")}
            className="text-gold/60 text-sm underline underline-offset-4 hover:text-gold transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default IntroGate;
