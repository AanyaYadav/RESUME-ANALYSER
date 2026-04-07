import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, FileText, X, ArrowLeft, TrendingUp, Award, AlertCircle, CheckCircle2, GitCompare, Sparkles, Trophy, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";

export default function Compare() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [isDragging, setIsDragging] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e, index) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
      addResume(droppedFile, index);
    }
  }, []);

  const handleFileInput = useCallback((e, index) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      addResume(selectedFile, index);
    }
  }, []);

  const addResume = (file, index) => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockScore = 65 + Math.floor(Math.random() * 30);
      const newResume = {
        id: Date.now().toString() + index,
        file,
        score: mockScore,
        strengths: [
          "Strong technical skills section",
          "Quantifiable achievements",
          "Clear job progression",
        ],
        weaknesses: [
          "Missing action verbs",
          "Limited industry keywords",
          "Format could be ATS-optimized",
        ],
        atsCompatibility: mockScore - 5 + Math.floor(Math.random() * 10),
        keywordMatch: mockScore - 10 + Math.floor(Math.random() * 15),
        formatScore: mockScore + 5 - Math.floor(Math.random() * 10),
      };

      setResumes(prev => {
        const updated = [...prev];
        updated[index] = newResume;
        return updated;
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleRemove = (index) => {
    setResumes(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "from-[#ef4444] to-[#f97316]";
    if (score >= 70) return "from-[#ec4899] to-[#f97316]";
    return "from-[#dc2626] to-[#ec4899]";
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return "EXCELLENT";
    if (score >= 70) return "GOOD";
    return "NEEDS WORK";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f97316]/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <header className="relative z-10 bg-[#1a0a0a]/80 backdrop-blur-md border-b border-[#ef4444]/20">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wider">BACK TO HOME</span>
          </button>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ef4444] to-[#f97316] shadow-[0_0_30px_rgba(239,68,68,0.5)] mb-6"
          >
            <GitCompare className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider mb-4">
            RESUME COMPARISON
          </h1>
          <p className="text-xl text-[#a1a1aa]">
            Upload multiple versions to identify the strongest candidate
          </p>
        </div>

        {/* Upload Slots */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {!resumes[index] ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer min-h-[250px] flex flex-col items-center justify-center
                    ${
                      index === 0
                        ? "border-[#ef4444] bg-[#ef4444]/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                        : "border-[#ef4444]/30 hover:border-[#ef4444]/60 hover:bg-[#ef4444]/5"
                    }
                  `}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={(e) => handleFileInput(e, index)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="relative inline-block mb-4">
                    <div
                      className={`absolute inset-0 blur-lg opacity-30 ${
                        index === 0
                          ? "bg-gradient-to-br from-[#ef4444] to-[#f97316] shadow-[0_0_30px_rgba(239,68,68,0.5)]" 
                          : "bg-gradient-to-br from-[#ef4444]/50 to-[#f97316]/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      }`}
                    ></div>
                    <UploadIcon className="w-12 h-12 text-[#ef4444] relative z-10" />
                  </div>
                  <p className="text-lg font-bold text-white mb-2">
                    {index === 0 ? "Upload Resume A" : "Upload Resume B"}
                  </p>
                  <p className="text-[#a1a1aa] text-sm mb-4">Drag & drop or browse</p>
                  {index === 0 && (
                    <Button
                      onClick={() => {}}
                      className="bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white hover:opacity-90 px-6 py-3 shadow-[0_0_20px_rgba(239,68,68,0.3)] font-bold"
                    >
                      Choose File
                    </Button>
                  )}
                </div>
              ) : (
                <div className="relative bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.2)] p-6 border border-[#ef4444]/30 min-h-[300px]">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(index)}
                    className="absolute top-4 right-4 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* File Info */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-lg flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-white mb-1">{resumes[index].file.name}</p>
                    <div className="inline-flex items-center gap-2 mb-4">
                      <p className="text-sm text-[#ef4444]">{getScoreLabel(resumes[index].score)}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-[#a1a1aa]">ATS Compatibility</span>
                        <span className="font-bold text-white">{resumes[index].score}%</span>
                      </div>
                      <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ef4444]/20">
                        <div
                          className="h-full bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-full"
                          style={{ width: `${resumes[index].score}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-[#a1a1aa]">Keyword Match</span>
                        <span className="font-bold text-white">{resumes[index].keywordMatch}%</span>
                      </div>
                      <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#f97316]/20">
                        <div
                          className="h-full bg-gradient-to-r from-[#f97316] to-[#ec4899] rounded-full"
                          style={{ width: `${resumes[index].keywordMatch}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-[#a1a1aa]">Format Score</span>
                        <span className="font-bold text-white">{resumes[index].formatScore}%</span>
                      </div>
                      <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ec4899]/20">
                        <div
                          className="h-full bg-gradient-to-r from-[#ec4899] to-[#ef4444] rounded-full"
                          style={{ width: `${resumes[index].formatScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Comparison Button */}
        {resumes[0] && resumes[1] && !showComparison && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Button
              onClick={handleCompare}
              size="lg"
              className="bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#ec4899] text-white hover:opacity-90 text-xl px-12 py-7 rounded-lg shadow-[0_0_40px_rgba(239,68,68,0.4)] font-bold"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              COMPARE RESUMES
            </Button>
          </motion.div>
        )}

        {/* Comparison Results */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Winner Card */}
            <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl p-8 border-2 border-[#ef4444]/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-[#ef4444]" />
                <h2 className="text-3xl font-bold text-white tracking-wider">WINNER: RESUME A</h2>
              </div>
              <p className="text-[#a1a1aa] text-lg mb-6">
                Resume A scores higher across all metrics with better ATS compatibility and keyword optimization.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#0a0a0a] border border-[#ef4444]/20 rounded-lg">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#ef4444] to-[#f97316] bg-clip-text text-transparent mb-1">
                    +{resumes[0].score - resumes[1].score}%
                  </div>
                  <div className="text-xs text-[#a1a1aa]">ATS Score</div>
                </div>
                <div className="text-center p-4 bg-[#0a0a0a] border border-[#f97316]/20 rounded-lg">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#f97316] to-[#ec4899] bg-clip-text text-transparent mb-1">
                    +{resumes[0].keywordMatch - resumes[1].keywordMatch}%
                  </div>
                  <div className="text-xs text-[#a1a1aa]">Keywords</div>
                </div>
                <div className="text-center p-4 bg-[#0a0a0a] border border-[#ec4899]/20 rounded-lg">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#ec4899] to-[#ef4444] bg-clip-text text-transparent mb-1">
                    +{resumes[0].formatScore - resumes[1].formatScore}%
                  </div>
                  <div className="text-xs text-[#a1a1aa]">Format</div>
                </div>
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl p-8 border border-[#ef4444]/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <h3 className="text-2xl font-bold text-white tracking-wider mb-6">DETAILED ANALYSIS</h3>
              <div className="space-y-6">
                {[
                  { label: "Content Quality", a: 92, b: 78, icon: FileText },
                  { label: "Skills Match", a: 95, b: 82, icon: CheckCircle2 },
                  { label: "Experience Relevance", a: 88, b: 85, icon: TrendingUp },
                  { label: "Keyword Density", a: 90, b: 75, icon: CheckCircle2 },
                ].map((metric, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <metric.icon className="w-5 h-5 text-[#ef4444]" />
                      <span className="font-bold text-white">{metric.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="text-[#a1a1aa]">Resume A</span>
                          <span className="font-bold text-white">{metric.a}%</span>
                        </div>
                        <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ef4444]/20">
                          <div
                            className="h-full bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-full"
                            style={{ width: `${metric.a}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="text-[#a1a1aa]">Resume B</span>
                          <span className="font-bold text-white">{metric.b}%</span>
                        </div>
                        <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ec4899]/20">
                          <div
                            className="h-full bg-gradient-to-r from-[#ec4899] to-[#dc2626] rounded-full"
                            style={{ width: `${metric.b}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setShowComparison(false);
                  setResumes([null, null]);
                }}
                className="border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10 bg-transparent font-bold px-8 py-6"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Compare New Resumes
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90 font-bold px-8 py-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                View Full Analysis
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}