import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ScoreGauge({ score, role }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setAnimatedScore(current);
        if (current >= score) {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getLabel = () => {
    if (score < 40) return { text: "Needs Work", color: "#dc2626" };
    if (score < 70) return { text: "Good", color: "#ec4899" };
    return { text: "Excellent", color: "#ef4444" };
  };

  const label = getLabel();
  const circumference = 2 * Math.PI * 120;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.2)] p-8 border border-[#ef4444]/30">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-1 tracking-wider">YOUR ATS SCORE</h3>
          <p className="text-sm text-[#a1a1aa]">for {role} role</p>
        </div>
        
        <div className="relative w-64 h-64 mx-auto">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="rgba(239, 68, 68, 0.1)"
              strokeWidth="16"
              fill="none"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              stroke={label.color}
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-7xl font-bold"
              style={{ color: label.color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {animatedScore}
            </motion.span>
            <motion.div
              className="mt-2 px-4 py-1 rounded-full font-bold text-sm"
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {label.text}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}