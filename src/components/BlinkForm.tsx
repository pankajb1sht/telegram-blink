import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BlinkForm } from "./BlinkForm";

export const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source
            src="https://cdnl.iconscout.com/lottie/premium/thumb/sending-crypto-animation-download-in-lottie-json-gif-static-svg-file-formats--bitcoin-logo-transfert-pack-science-technology-animations-6210707.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDE1D3] via-[#E5DEFF] to-[#D3E4FD] opacity-80">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                borderRadius: '50%',
                background: `${['#F2FCE2', '#FEF7CD', '#FEC6A1', '#E5DEFF', '#FFDEE2'][Math.floor(Math.random() * 5)]}`,
                animation: `bounce ${1 + Math.random() * 2}s infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-screen px-4 animate-fade-up z-10">
        <div className="space-y-4 text-center max-w-3xl">
          <span className="px-3 py-1 text-sm font-medium bg-[#E5DEFF] text-[#6B4EFF] rounded-full animate-bounce">
            Telegram + Solana Integration
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-4 text-[#2D3748]">
            Generate Solana Blinks for Your
            <span 
              className="cyber-glitch text-telegram-blue" 
              data-text="Telegram Group"
            > Telegram Group</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Create unique Solana-powered invite links for your Telegram group. Monetize your community with ease.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-[#6B4EFF] hover:bg-[#5B3EEF] text-white transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg hover:shadow-xl"
            >
              Generate Blink
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="relative max-w-2xl w-full mx-4">
            <BlinkForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
