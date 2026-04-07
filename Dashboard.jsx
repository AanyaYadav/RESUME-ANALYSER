import { useState } from "react";
import { useNavigate } from "react-router";
import { Download, ArrowLeft, Share2, GitCompare, Volume2, HelpCircle } from "lucide-react";
import { ScoreGauge } from "../components/ScoreGauge";
import { RoleToggle } from "../components/RoleToggle";
import { FeedbackCard } from "../components/FeedbackCard";
import { BeforeAfter } from "../components/BeforeAfter";
import { ImprovementChecklist } from "../components/ImprovementChecklist";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const roleScores = {
  Developer: 62,
  "UI/UX Designer": 71,
  Marketing: 58,
};

const feedbackData = {
  Developer: [
    {
      section: "Experience",
      score: 55,
      issues: [
        { type: "error", text: "Bullet points lack specific metrics and numbers" },
        { type: "error", text: "Missing action verbs like 'Developed', 'Architected', 'Optimized'" },
        { type: "success", text: "Relevant internship experience mentioned" },
      ],
    },
    {
      section: "Skills",
      score: 78,
      issues: [
        { type: "warning", text: "Add more frameworks and tools (e.g., Docker, AWS)" },
        { type: "success", text: "Good coverage of programming languages" },
        { type: "success", text: "Backend and frontend skills present" },
      ],
    },
    {
      section: "Projects",
      score: 45,
      issues: [
        { type: "error", text: "No GitHub links or live demos provided" },
        { type: "error", text: "Missing technology stack details" },
        { type: "warning", text: "Project impact not quantified" },
      ],
    },
    {
      section: "Education",
      score: 85,
      issues: [
        { type: "success", text: "Degree and GPA clearly mentioned" },
        { type: "success", text: "Relevant coursework listed" },
        { type: "warning", text: "Consider adding academic achievements or honors" },
      ],
    },
  ],
  "UI/UX Designer": [
    {
      section: "Experience",
      score: 68,
      issues: [
        { type: "warning", text: "Add user research and testing methodologies" },
        { type: "success", text: "Design tools clearly mentioned" },
        { type: "warning", text: "Quantify user satisfaction improvements" },
      ],
    },
    {
      section: "Portfolio",
      score: 82,
      issues: [
        { type: "success", text: "Portfolio link included" },
        { type: "success", text: "Multiple projects showcased" },
        { type: "warning", text: "Add case study details for key projects" },
      ],
    },
    {
      section: "Skills",
      score: 75,
      issues: [
        { type: "success", text: "Design software proficiency listed" },
        { type: "warning", text: "Add prototyping and user testing skills" },
        { type: "success", text: "UI/UX methodologies mentioned" },
      ],
    },
    {
      section: "Education",
      score: 80,
      issues: [
        { type: "success", text: "Design-related degree or courses listed" },
        { type: "success", text: "Clear academic credentials" },
        { type: "warning", text: "Consider mentioning design certifications" },
      ],
    },
  ],
  Marketing: [
    {
      section: "Experience",
      score: 50,
      issues: [
        { type: "error", text: "No campaign performance metrics (ROI, conversion rates)" },
        { type: "error", text: "Missing specific marketing channels used" },
        { type: "warning", text: "Add budget management experience" },
      ],
    },
    {
      section: "Skills",
      score: 65,
      issues: [
        { type: "success", text: "Social media platforms mentioned" },
        { type: "warning", text: "Add marketing automation tools (HubSpot, Mailchimp)" },
        { type: "warning", text: "Include analytics skills (Google Analytics, SEMrush)" },
      ],
    },
    {
      section: "Achievements",
      score: 72,
      issues: [
        { type: "success", text: "Growth metrics included" },
        { type: "warning", text: "Add campaign-specific results" },
        { type: "success", text: "Clear impact on business objectives" },
      ],
    },
    {
      section: "Education",
      score: 80,
      issues: [
        { type: "success", text: "Marketing or business degree mentioned" },
        { type: "success", text: "Relevant coursework included" },
        { type: "warning", text: "Consider adding marketing certifications" },
      ],
    },
  ],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState("Developer");

  const handleFixSection = (section) => {
    toast.success(`AI suggestions for ${section}`, {
      description: "Personalized recommendations are being generated",
    });
  };

  const handleDownload = () => {
    toast.success("Report downloaded", {
      description: "Your resume analysis report is ready",
    });
  };

  const handleShare = () => {
    toast.success("Share link copied", {
      description: "Your analysis link has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <header className="relative z-10 bg-[#1a0a0a]/80 backdrop-blur-md border-b border-[#ef4444]/20 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold">BACK TO HOME</span>
            </button>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/interview-questions")}
                className="border border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/10 bg-transparent font-bold"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Interview Prep
              </Button>
              <Button
                onClick={() => navigate("/voice-feedback")}
                className="border border-[#ec4899]/30 text-[#ec4899] hover:bg-[#ec4899]/10 bg-transparent font-bold"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Voice AI
              </Button>
              <Button
                onClick={() => navigate("/compare")}
                className="border border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/10 bg-transparent font-bold"
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button
                onClick={handleShare}
                className="border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10 bg-transparent font-bold"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90 font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-white tracking-wider">RESUME ANALYSIS REPORT</h1>
            <p className="text-xl text-[#94a3b8]">Comprehensive ATS compatibility insights for your resume</p>
          </div>

          {/* Role Selection & Score */}
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <RoleToggle currentRole={currentRole} onRoleChange={(role) => setCurrentRole(role)} />
            <ScoreGauge score={roleScores[currentRole]} role={currentRole} />
          </div>

          {/* Feedback Cards */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 tracking-wider">SECTION-BY-SECTION ANALYSIS</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {feedbackData[currentRole].map((feedback, index) => (
                <FeedbackCard
                  key={index}
                  section={feedback.section}
                  score={feedback.score}
                  issues={feedback.issues}
                  onFix={() => handleFixSection(feedback.section)}
                />
              ))}
            </div>
          </div>

          {/* Before vs After */}
          <BeforeAfter role={currentRole} />

          {/* Improvement Checklist */}
          <ImprovementChecklist />
        </div>
      </div>
    </div>
  );
}