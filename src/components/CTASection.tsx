import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDE1D3] via-[#E5DEFF] to-[#D3E4FD]">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 10 }).map((_, i) => (
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#2D3748] sm:text-4xl">
            Ready to Transform Your Telegram Community?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Start generating Solana Blinks for your Telegram group in minutes.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-[#6B4EFF] hover:bg-[#5B3EEF] text-white transition-all duration-300 transform hover:scale-105 rounded-xl shadow-lg hover:shadow-xl"
            >
              Generate Blink Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};