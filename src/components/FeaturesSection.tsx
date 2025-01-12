import { Zap, Shield, Coins } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate Solana Blinks in seconds. No complicated setup required.",
  },
  {
    icon: Shield,
    title: "Secure Integration",
    description: "Built on Solana's secure blockchain infrastructure.",
  },
  {
    icon: Coins,
    title: "Monetize Your Community",
    description: "Set custom entry fees for your Telegram group access.",
  },
];

export const FeaturesSection = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-[#F2FCE2] to-[#E5DEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#2D3748] sm:text-4xl">
            Why Choose Solana Blinks?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            The easiest way to manage and monetize your Telegram community using Solana
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-white/80 p-8 rounded-2xl border border-[#E5DEFF] hover:border-[#6B4EFF] transition-all duration-500 animate-fade-up hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <feature.icon className="h-8 w-8 text-[#6B4EFF]" />
                  <h3 className="text-xl font-semibold text-[#2D3748]">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};