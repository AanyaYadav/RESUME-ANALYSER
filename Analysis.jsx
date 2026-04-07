import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FileText, Brain, Cpu, Database, CheckCircle, Sparkles, Loader2 } from "lucide-react";

const steps = [
  { icon: FileText, text: "Parsing document structure", color: "#00d4ff" },
  { icon: Brain, text: "Running AI analysis models", color: "#6366f1" },
  { icon: Cpu, text: "Processing ATS compatibility", color: "#818cf8" },
  { icon: Database, text: "Analyzing keyword density", color: "#00d4ff" },
  { icon: CheckCircle, text: "Generating insights report", color: "#6366f1" },
];

export default function Analysis() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f97316]/10 rounded-full blur-[120px]"></div>

      {/* Radar circles */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <motion.div
          className="w-96 h-96 border-2 border-[#ef4444] rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-64 h-64 border-2 border-[#f97316] rounded-full"
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)] p-12 border border-[#ef4444]/30">
          {/* Icon Header */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative inline-block">
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${steps[currentStep].color}, #f97316)`
                }}
              />
              <motion.div
                key={currentStep}
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-20 h-20 flex items-center justify-center rounded-full"
                style={{
                  background: steps[currentStep].color,
                  boxShadow: `0 0 40px ${steps[currentStep].color}80`
                }}
              >
                <CurrentIcon className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </div>

          {/* Title & Progress */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-wider">
              AI ANALYZING RESUME
            </h2>

            {/* Animated Progress Bar */}
            <div className="relative h-3 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ef4444]/20 mb-6">
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{
                  background: 'url(#progressGradient)',
                  width: `${progress}%`
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full" style={{ background: 'linear-gradient(90deg, #ef4444, #f97316, #ec4899)' }} />
              </motion.div>
            </div>

            <div className="space-y-3">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-white font-medium"
              >
                {steps[currentStep].text}
              </motion.p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-[#ef4444] mt-2 tracking-wider font-bold">ANALYZING</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-[#ef4444]" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-[#a1a1aa] tracking-wider mb-4">
              ANALYSIS PROGRESS
            </p>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    index === currentStep
                      ? "bg-gradient-to-r from-[#ef4444]/20 to-[#f97316]/20 border-[#ef4444]/50"
                      : "bg-[#0a0a0a]/50 border-[#ef4444]/20"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      index < currentStep
                        ? "bg-[#ef4444]"
                        : index === currentStep
                        ? "bg-gradient-to-r from-[#ef4444] to-[#f97316]"
                        : "bg-[#2a1010]"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <step.icon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span
                    className={`text-sm flex-1 transition-colors ${
                      index <= currentStep ? "text-white" : "text-[#a1a1aa]"
                    }`}
                  >
                    {step.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Badge */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-[#ef4444]" />
              </motion.div>
              <span className="text-sm font-bold text-[#ef4444] tracking-wider">
                POWERED BY ADVANCED AI
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}