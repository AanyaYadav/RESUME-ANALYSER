import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, FileText, X, ArrowLeft, Mic, Volume2, VolumeX, Pause, Play, SkipForward, RotateCcw, SkipBack, Settings } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function VoiceFeedback() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [hasResume, setHasResume] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
  }, []);

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
      setHasResume(true);
    }
  }, []);

  const handleFileInput = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setHasResume(true);
    }
  }, []);

  const analyzeResume = () => {
    if (!file) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockScore = 70 + Math.floor(Math.random() * 25);
      const feedback = {
        overall: `Hello! I've analyzed your resume and assigned it an overall score of ${mockScore} out of 100. Let me walk you through my findings.`,
        experience: `Looking at your experience section, I found several strong points. Your job titles are clearly stated, and you have relevant work history. However, I noticed that many of your bullet points could be improved by adding specific metrics and quantifiable achievements. For example, instead of saying you managed a team, specify the team size and the results you achieved. Action verbs like developed, architected, and optimized would make your accomplishments more impactful.`,
        skills: `Your skills section shows good technical coverage. I can see you've listed relevant programming languages and frameworks. To make this section even stronger, I recommend organizing your skills into categories such as programming languages, frameworks, tools, and soft skills. This helps recruiters quickly scan for the technologies they're looking for. Consider adding any cloud platforms, development tools, or methodologies you're familiar with.`,
        format: `Regarding formatting, your resume is ${mockScore >= 75 ? 'well-structured for ATS systems' : 'not fully optimized for applicant tracking systems'}. ${mockScore >= 75 ? 'The layout is clean and uses standard section headings.' : 'I recommend using more standard section headings like Experience, Education, and Skills to ensure ATS compatibility.'} Make sure you're using a simple, single-column layout without complex graphics or tables that might confuse automated systems.`,
        recommendations: `Here are my top recommendations: First, add more quantifiable metrics to your experience bullets. Numbers catch the eye of both humans and ATS systems. Second, incorporate industry-specific keywords from the job descriptions you're targeting. Third, ensure your contact information is prominently displayed at the top. And finally, consider adding a brief professional summary that highlights your unique value proposition. With these improvements, I estimate your score could increase by 15 to 20 points.`,
        score: mockScore
      };
      
      setFeedbackData(feedback);
      setAnalyzing(false);
    }, 2000);
  };

  const speakFeedback = (section) => {
    if (!feedbackData || !speechSupported) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    let textToSpeak = "";
    let sectionName = "Complete Analysis";

    if (section) {
      textToSpeak = feedbackData[section];
      sectionName = section.charAt(0).toUpperCase() + section.slice(1);
    } else {
      // Speak all sections
      textToSpeak = `${feedbackData.overall} ${feedbackData.experience} ${feedbackData.skills} ${feedbackData.format} ${feedbackData.recommendations}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Select a voice (prefer English voices)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Female')) 
      || voices.find(voice => voice.lang.startsWith('en'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentSection(sectionName);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSection("");
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSection("");
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentSection("");
  };

  const sections = [
    { id: "overall", label: "Overall Assessment", icon: Mic },
    { id: "experience", label: "Experience Analysis", icon: FileText },
    { id: "skills", label: "Skills Evaluation", icon: Volume2 },
    { id: "format", label: "Format Review", icon: FileText },
    { id: "recommendations", label: "Recommendations", icon: Volume2 },
  ];

  const voiceSections = [
    { id: "overall", label: "Overall Assessment", icon: Mic },
    { id: "experience", label: "Experience Analysis", icon: FileText },
    { id: "skills", label: "Skills Evaluation", icon: Volume2 },
    { id: "format", label: "Format Review", icon: FileText },
    { id: "recommendations", label: "Recommendations", icon: Volume2 },
  ];

  const handleSectionClick = (sectionId) => {
    if (currentSection === sectionId) {
      togglePlayPause();
    } else {
      setCurrentSection(sectionId);
      speakFeedback(sectionId);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSpeech();
    } else {
      speakFeedback(currentSection);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (window.speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance("");
      utterance.volume = newVolume / 100;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ef4444] to-[#f97316] shadow-[0_0_30px_rgba(239,68,68,0.5)] mb-6"
          >
            <Volume2 className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider mb-4">
            VOICE FEEDBACK
          </h1>
          <p className="text-xl text-[#a1a1aa]">
            Listen to AI-powered insights about your resume
          </p>
          
          {!speechSupported && (
            <div className="mt-4 bg-[#dc2626]/20 border border-[#dc2626]/50 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-[#dc2626] text-sm">
                Voice feedback is not supported in your browser. Please use Chrome, Edge, or Safari.
              </p>
            </div>
          )}
        </div>

        {/* Main Voice Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.3)] p-8 md:p-12 border border-[#ef4444]/30">
            {/* Upload Section */}
            {!hasResume && (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                  ${
                    isDragging
                      ? "border-[#ef4444] bg-[#ef4444]/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
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
                <div className="relative inline-block mb-6">
                  <div
                    className={`absolute inset-0 blur-lg opacity-30 ${
                      isDragging
                        ? "bg-gradient-to-br from-[#ef4444] to-[#f97316] shadow-[0_0_30px_rgba(239,68,68,0.5)]" 
                        : "bg-gradient-to-br from-[#ef4444]/50 to-[#f97316]/50"
                    }`}
                  ></div>
                  <UploadIcon className="w-16 h-16 text-[#ef4444] relative z-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wider">UPLOAD YOUR RESUME</h3>
                <p className="text-[#a1a1aa] mb-6">Drag & drop or click to browse (PDF or DOCX)</p>
                <Button className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90 px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  Choose File
                </Button>
              </div>
            )}

            {/* Player Section */}
            {hasResume && (
              <div className="space-y-8">
                {/* File Info */}
                <div className="flex items-center gap-4 pb-6 border-b border-[#ef4444]/20">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">Resume_Final.pdf</p>
                    <p className="text-sm text-[#a1a1aa]">ATS Score: 94% • Ready for voice analysis</p>
                  </div>
                  <button
                    onClick={() => setHasResume(false)}
                    className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Waveform Visualization */}
                <div className="relative h-32 bg-[#0a0a0a]/50 rounded-xl border border-[#ef4444]/20 p-4 overflow-hidden">
                  <div className="flex items-center justify-center h-full gap-1">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-[#ef4444] to-[#f97316] rounded-full"
                        style={{
                          height: isPlaying
                            ? `${20 + Math.random() * 80}%`
                            : "20%",
                        }}
                        animate={{
                          height: isPlaying
                            ? [
                                "20%",
                                `${20 + Math.random() * 80}%`,
                                "20%",
                              ]
                            : "20%",
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.5,
                          repeat: isPlaying ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[#a1a1aa]">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#ef4444]/20 cursor-pointer">
                    <div
                      className="h-full bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  <Button
                    onClick={() => toast.info("Previous section")}
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-full border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={togglePlayPause}
                    size="icon"
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ef4444] to-[#f97316] hover:opacity-90 shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </Button>

                  <Button
                    onClick={() => toast.info("Next section")}
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-full border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                {/* Settings */}
                <div className="flex items-center justify-center gap-8 pt-6 border-t border-[#ef4444]/20">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-[#ef4444]" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-24 accent-[#ef4444]"
                    />
                    <span className="text-sm text-[#a1a1aa] w-12">{volume}%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#ef4444]" />
                    <select
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(Number(e.target.value))}
                      className="bg-[#0a0a0a] border border-[#ef4444]/30 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-[#ef4444]"
                    >
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sections */}
        {hasResume && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-wider">VOICE SECTIONS</h2>
            <div className="grid gap-4">
              {voiceSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSectionClick(section.id)}
                  className={`
                    flex items-center gap-4 p-6 rounded-xl border transition-all text-left
                    ${
                      currentSection === section.id
                        ? "bg-gradient-to-r from-[#ef4444]/20 to-[#f97316]/20 border-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        : "bg-[#1a0a0a] border-[#ef4444]/20 hover:border-[#ef4444]/50 hover:bg-[#1a0a0a]/80"
                    }
                  `}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      currentSection === section.id
                        ? "bg-gradient-to-br from-[#ef4444] to-[#f97316] shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                        : "bg-[#2a1010] group-hover:bg-[#2a1010]/80"
                    }`}
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1 tracking-wider">{section.label}</h3>
                    <p className="text-sm text-[#a1a1aa]">
                      {currentSection === section.id && isPlaying
                        ? "Playing now..."
                        : "Click to play"}
                    </p>
                  </div>
                  <div className={`text-2xl ${currentSection === section.id && isPlaying ? "text-[#ef4444]" : "text-[#a1a1aa]"}`}>
                    {currentSection === section.id && isPlaying ? "▶" : "●"}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}