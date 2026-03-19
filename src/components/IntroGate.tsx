import { useState, useRef, useEffect } from "react";

type Phase = "prompt" | "playing" | "breaking" | "video" | "done";

interface IntroGateProps {
  onComplete: () => void;
}

const shardFragments = [
  { clip: "polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)", tx: -140, ty: -120, rot: -35 },
  { clip: "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)", tx: 140, ty: -110, rot: 40 },
  { clip: "polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%)", tx: -130, ty: 130, rot: -45 },
  { clip: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)", tx: 150, ty: 120, rot: 50 },
  { clip: "polygon(25% 0%, 75% 0%, 50% 50%)", tx: 10, ty: -160, rot: 20 },
  { clip: "polygon(0% 25%, 50% 50%, 0% 75%)", tx: -170, ty: 5, rot: -30 },
  { clip: "polygon(100% 25%, 50% 50%, 100% 75%)", tx: 170, ty: -10, rot: 35 },
  { clip: "polygon(25% 100%, 75% 100%, 50% 50%)", tx: -15, ty: 160, rot: -25 },
];

const IntroGate = ({ onComplete }: IntroGateProps) => {
  const [phase, setPhase] = useState<Phase>("prompt");
  const [tapCount, setTapCount] = useState(0);
  const [shake, setShake] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logposeRef = useRef<HTMLVideoElement>(null);

  const handleTap = () => {
    if (phase !== "prompt") return;
    const newCount = tapCount + 1;
    setTapCount(newCount);

    setShake(true);
    setTimeout(() => setShake(false), 400);

    if (newCount >= 3) {
      // Start playing the logpose GIF
      setPhase("playing");
    }
  };

  // When phase becomes "playing", play the logpose video then break it
  useEffect(() => {
    if (phase === "playing" && logposeRef.current) {
      logposeRef.current.play();
      // After playing for 2 seconds, break it
      setTimeout(() => {
        setPhase("breaking");
        setTimeout(() => {
          setPhase("video");
        }, 1600);
      }, 4000);
    }
  }, [phase]);

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
      {(phase === "prompt" || phase === "playing") && (
        <div className="text-center animate-fade-in flex flex-col items-center gap-8">
          <h1 className="font-display text-lg sm:text-2xl md:text-4xl lg:text-5xl text-gold/80 tracking-wider drop-shadow-[0_0_20px_hsl(var(--gold)/0.3)] px-4">
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
              ref={logposeRef}
              muted
              playsInline
              loop
              preload="auto"
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover rounded-full pointer-events-none"
            >
              <source src="/videos/logpose.mp4" type="video/mp4" />
            </video>
          </div>
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
        <div className="relative flex items-center justify-center">
          {/* Crack overlay on the Log Pose */}
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96">
            {/* Split the logpose into fragments using clip-path */}
            {shardFragments.map((shard, i) => (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden rounded-full"
                style={{
                  clipPath: shard.clip,
                  animation: `fragment_fly_${i} 1.4s cubic-bezier(0.2, 0, 0.8, 1) forwards`,
                  animationDelay: `${0.3 + i * 0.04}s`,
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/logpose.mp4" type="video/mp4" />
                </video>
              </div>
            ))}

            {/* Crack lines that appear before fragments fly */}
            <svg
              className="absolute inset-0 w-full h-full animate-[crackAppear_0.3s_ease-out_forwards]"
              viewBox="0 0 100 100"
              fill="none"
            >
              <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="0.8" opacity="0.9" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="0.8" opacity="0.9" />
              <line x1="20" y1="20" x2="80" y2="80" stroke="white" strokeWidth="0.6" opacity="0.7" />
              <line x1="80" y1="20" x2="20" y2="80" stroke="white" strokeWidth="0.6" opacity="0.7" />
              <line x1="50" y1="50" x2="15" y2="35" stroke="white" strokeWidth="0.5" opacity="0.5" />
              <line x1="50" y1="50" x2="85" y2="30" stroke="white" strokeWidth="0.5" opacity="0.5" />
            </svg>

            {/* Flash on impact */}
            <div className="absolute inset-0 rounded-full bg-white animate-[impactFlash_0.4s_ease-out_forwards]" />
          </div>

          {/* Tiny glass particles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * 360;
            const dist = 120 + Math.random() * 100;
            const tx = Math.cos((angle * Math.PI) / 180) * dist;
            const ty = Math.sin((angle * Math.PI) / 180) * dist;
            return (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-gold/80 rounded-full"
                style={{
                  animation: `particleBurst 0.8s cubic-bezier(0.2, 0, 0.6, 1) forwards`,
                  animationDelay: `${0.3 + i * 0.02}s`,
                  opacity: 0,
                  ['--tx' as string]: `${tx}px`,
                  ['--ty' as string]: `${ty}px`,
                }}
              />
            );
          })}
        </div>
      )}

      {phase === "video" && (
        <div className="w-full h-full relative animate-fade-in flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-contain sm:object-cover"
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
        @keyframes crackAppear {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes impactFlash {
          0% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        ${shardFragments.map((shard, i) => `
          @keyframes fragment_fly_${i} {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
            30% { transform: translate(${shard.tx * 0.2}px, ${shard.ty * 0.2}px) rotate(${shard.rot * 0.3}deg) scale(1); opacity: 1; }
            100% { transform: translate(${shard.tx}px, ${shard.ty}px) rotate(${shard.rot}deg) scale(0.3); opacity: 0; }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default IntroGate;
