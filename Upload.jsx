import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, FileText, X, ArrowLeft, Brain, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Loader2, Shield } from "lucide-react";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      navigate("/analysis");
    }, 1500);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid background */}
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

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-[#ef4444] blur-xl opacity-50"></div>
                <Brain className="w-20 h-20 text-[#ef4444] mx-auto relative z-10" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider">
              UPLOAD RESUME
            </h1>
            <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto">
              Upload your resume for AI-powered ATS analysis and optimization
            </p>
          </div>

          {/* Upload Card */}
          <div className="relative bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.2)] p-10 border border-[#ef4444]/30">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-[#ef4444] to-[#f97316] px-6 py-2 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                <span className="text-white font-bold tracking-wider text-sm">AI UPLOAD SYSTEM</span>
              </div>
            </div>

            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
                  ${isDragging 
                    ? "border-[#ef4444] bg-[#ef4444]/10" 
                    : "border-[#ef4444]/30 hover:border-[#ef4444]/60 hover:bg-[#ef4444]/5"
                  }
                `}
              >
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[#ef4444] blur-lg opacity-30"></div>
                    <UploadIcon className="w-16 h-16 text-[#ef4444] mx-auto relative z-10" />
                  </div>
                  
                  <div>
                    <p className="text-xl font-bold text-white mb-2">
                      Drag & Drop Your Resume
                    </p>
                    <p className="text-[#a1a1aa] mb-4">or click to browse files</p>
                    <p className="text-sm text-[#a1a1aa]">Supports PDF and DOCX • Max size: 5MB</p>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-6 bg-[#0a0a0a] border border-[#ef4444]/30 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{file.name}</p>
                      <p className="text-sm text-[#a1a1aa]">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemove}
                    className="text-[#ef4444] hover:text-[#dc2626] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white hover:opacity-90 text-lg py-7 shadow-[0_0_30px_rgba(239,68,68,0.4)] font-bold"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ANALYZING...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      START AI ANALYSIS
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#1a0a0a] border border-[#ef4444]/20 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-wider">INSTANT ANALYSIS</h3>
              <p className="text-sm text-[#a1a1aa]">AI-powered scanning in seconds</p>
            </div>

            <div className="text-center p-6 bg-[#1a0a0a] border border-[#f97316]/20 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#f97316] to-[#ec4899] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-wider">100% SECURE</h3>
              <p className="text-sm text-[#a1a1aa]">Your data is encrypted & private</p>
            </div>

            <div className="text-center p-6 bg-[#1a0a0a] border border-[#ec4899]/20 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ec4899] to-[#ef4444] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-wider">SMART INSIGHTS</h3>
              <p className="text-sm text-[#a1a1aa]">Actionable recommendations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}