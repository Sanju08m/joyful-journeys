import { useState, useRef } from "react";

type Phase = "prompt" | "breaking" | "video" | "done";

interface IntroGateProps {
  onComplete: () => void;
}

const IntroGate = ({ onComplete }: IntroGateProps) => {
  const [phase, setPhase] = useState<Phase>("prompt");
  const [tapCount, setTapCount] = useState(0);
  const [shake, setShake] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTap = () => {
    if (phase !== "prompt") return;
    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Shake effect on each tap
    setShake(true);
    setTimeout(() => setShake(false), 400);

    if (newCount >= 3) {
      setPhase("breaking");
      // After break animation, play intro video
      setTimeout(() => {
        setPhase("video");
      }, 1200);
    }
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
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {phase === "prompt" && (
        <div className="text-center animate-fade-in flex flex-col items-center gap-8">
          <h1 className="font-display text-2xl md:text-4xl text-gold/80 tracking-wider drop-shadow-[0_0_20px_hsl(var(--gold)/0.3)]">
            Tap the Log Pose to enter
          </h1>
          <div
            onClick={handleTap}
            className={`cursor-pointer select-none transition-transform duration-200 ${
              shake ? "animate-[shake_0.4s_ease-in-out]" : ""
            }`}
            style={{
              filter: tapCount >= 2 ? "brightness(1.3) saturate(1.5)" : undefined,
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-56 h-56 md:w-72 md:h-72 object-contain rounded-full pointer-events-none"
            >
              <source src="/videos/logpose.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Tap indicators */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border border-gold/50 transition-all duration-300 ${
                  tapCount > i ? "bg-gold shadow-[0_0_10px_hsl(var(--gold)/0.6)]" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {phase === "breaking" && (
        <div className="flex items-center justify-center animate-[breakEffect_1.2s_ease-out_forwards]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-56 h-56 md:w-72 md:h-72 object-contain rounded-full"
          >
            <source src="/videos/logpose.mp4" type="video/mp4" />
          </video>
          {/* Crack/shatter particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-sm"
              style={{
                animation: `shard_${i % 4} 1s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {phase === "video" && (
        <div className="w-full h-full relative animate-fade-in">
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

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          20% { transform: translateX(-8px) rotate(-3deg); }
          40% { transform: translateX(8px) rotate(3deg); }
          60% { transform: translateX(-6px) rotate(-2deg); }
          80% { transform: translateX(6px) rotate(2deg); }
        }
        @keyframes breakEffect {
          0% { transform: scale(1); opacity: 1; filter: brightness(1); }
          30% { transform: scale(1.15); filter: brightness(2); }
          60% { transform: scale(1.3); opacity: 0.8; filter: brightness(3) saturate(0); }
          100% { transform: scale(2); opacity: 0; filter: brightness(4); }
        }
        @keyframes shard_0 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(80px, -60px) scale(0); opacity: 0; }
        }
        @keyframes shard_1 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-70px, -80px) scale(0); opacity: 0; }
        }
        @keyframes shard_2 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(90px, 50px) scale(0); opacity: 0; }
        }
        @keyframes shard_3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-60px, 70px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroGate;
