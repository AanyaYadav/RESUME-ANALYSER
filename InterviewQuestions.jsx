import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Sparkles, RefreshCw, Copy, Check, Download, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const questionsByRole = {
  Developer: {
    technical: [
      {
        question: "Explain the difference between var, let, and const in JavaScript.",
        difficulty: "Easy",
        category: "JavaScript Fundamentals",
        tips: "Focus on scope, hoisting, and mutability. Provide concrete examples.",
      },
      {
        question: "What is the Virtual DOM in React and how does it improve performance?",
        difficulty: "Medium",
        category: "React",
        tips: "Discuss reconciliation, diffing algorithm, and batching updates.",
      },
      {
        question: "Describe a challenging technical problem you faced in your e-commerce project and how you solved it.",
        difficulty: "Medium",
        category: "Problem Solving",
        tips: "Use the STAR method: Situation, Task, Action, Result. Be specific about your contributions.",
      },
      {
        question: "How would you optimize a web application for better performance?",
        difficulty: "Hard",
        category: "Performance Optimization",
        tips: "Cover code splitting, lazy loading, caching strategies, and profiling tools.",
      },
      {
        question: "Explain the concept of closures in JavaScript with a real-world use case.",
        difficulty: "Medium",
        category: "JavaScript Advanced",
        tips: "Demonstrate understanding of scope chain and practical applications like data privacy.",
      },
    ],
    behavioral: [
      {
        question: "Tell me about a time when you had to debug a complex issue in production.",
        difficulty: "Medium",
        category: "Problem Solving",
        tips: "Emphasize your systematic approach, communication with the team, and lessons learned.",
      },
      {
        question: "How do you stay updated with the latest technologies and industry trends?",
        difficulty: "Easy",
        category: "Learning & Growth",
        tips: "Mention specific resources like blogs, conferences, courses, and open-source contributions.",
      },
      {
        question: "Describe a situation where you had to collaborate with a difficult team member.",
        difficulty: "Medium",
        category: "Teamwork",
        tips: "Show empathy, conflict resolution skills, and positive outcomes.",
      },
    ],
    resumeBased: [
      {
        question: "I see you built an e-commerce platform. Walk me through your architecture decisions.",
        difficulty: "Medium",
        category: "Resume-Based",
        tips: "Discuss tech stack choices, scalability considerations, and trade-offs you made.",
        resumeReference: "E-commerce project mentioned in Experience section",
      },
      {
        question: "You mentioned improving page load time by 40%. What specific optimizations did you implement?",
        difficulty: "Medium",
        category: "Resume-Based",
        tips: "Be ready with specific metrics, tools used, and before/after comparisons.",
        resumeReference: "Performance optimization achievement",
      },
      {
        question: "Your resume shows you worked with React and Node.js. How do you handle state management in large applications?",
        difficulty: "Hard",
        category: "Resume-Based",
        tips: "Discuss Redux, Context API, or state management libraries. Explain when to use each.",
        resumeReference: "Skills section: React, Node.js",
      },
    ],
  },
  "UI/UX Designer": {
    technical: [
      {
        question: "Walk me through your design process from research to final mockup.",
        difficulty: "Medium",
        category: "Design Process",
        tips: "Cover user research, wireframing, prototyping, testing, and iteration.",
      },
      {
        question: "How do you ensure accessibility in your designs?",
        difficulty: "Medium",
        category: "Accessibility",
        tips: "Discuss WCAG guidelines, color contrast, keyboard navigation, and screen readers.",
      },
      {
        question: "Explain the difference between user experience and user interface design.",
        difficulty: "Easy",
        category: "UX/UI Fundamentals",
        tips: "Emphasize that UX is about the overall experience while UI focuses on visual design.",
      },
      {
        question: "How would you design a feature for both mobile and desktop users?",
        difficulty: "Medium",
        category: "Responsive Design",
        tips: "Discuss mobile-first approach, breakpoints, touch vs mouse interactions.",
      },
      {
        question: "What metrics do you use to measure the success of a design?",
        difficulty: "Hard",
        category: "Analytics & Metrics",
        tips: "Cover quantitative metrics (conversion rates, time on task) and qualitative feedback.",
      },
    ],
    behavioral: [
      {
        question: "Tell me about a time when stakeholders disagreed with your design decisions.",
        difficulty: "Medium",
        category: "Communication",
        tips: "Show how you presented data, user research, and compromised while maintaining design integrity.",
      },
      {
        question: "Describe a project where user research significantly changed your design direction.",
        difficulty: "Medium",
        category: "User Research",
        tips: "Emphasize your flexibility, data-driven approach, and impact of the changes.",
      },
      {
        question: "How do you handle negative feedback on your designs?",
        difficulty: "Easy",
        category: "Growth Mindset",
        tips: "Show openness to feedback, ability to iterate, and learning from criticism.",
      },
    ],
    resumeBased: [
      {
        question: "Your portfolio shows a redesign project. What problems were you trying to solve?",
        difficulty: "Medium",
        category: "Resume-Based",
        tips: "Discuss user pain points, business goals, and how you validated the problems.",
        resumeReference: "Portfolio project mentioned",
      },
      {
        question: "I noticed you increased user engagement by 35%. What design changes drove this improvement?",
        difficulty: "Medium",
        category: "Resume-Based",
        tips: "Provide specific design elements, A/B testing results, and user feedback.",
        resumeReference: "Achievement metric in Experience section",
      },
      {
        question: "You mentioned proficiency in Figma and Adobe XD. What's your preferred tool and why?",
        difficulty: "Easy",
        category: "Resume-Based",
        tips: "Discuss strengths of each tool and when you'd use one over the other.",
        resumeReference: "Skills section: Figma, Adobe XD",
      },
    ],
  },
  Marketing: {
    technical: [
      {
        question: "How do you develop a comprehensive marketing strategy for a new product launch?",
        difficulty: "Hard",
        category: "Strategy",
        tips: "Cover market research, target audience, channels, budget allocation, and KPIs.",
      },
      {
        question: "Explain the difference between organic and paid social media strategies.",
        difficulty: "Easy",
        category: "Social Media Marketing",
        tips: "Discuss pros/cons, ROI considerations, and when to use each approach.",
      },
      {
        question: "How do you measure ROI on marketing campaigns?",
        difficulty: "Medium",
        category: "Analytics",
        tips: "Cover attribution models, cost per acquisition, lifetime value, and conversion tracking.",
      },
      {
        question: "What tools do you use for marketing analytics and why?",
        difficulty: "Medium",
        category: "Marketing Tools",
        tips: "Mention Google Analytics, HubSpot, SEMrush, and explain your workflow.",
      },
      {
        question: "How would you optimize a landing page for conversions?",
        difficulty: "Medium",
        category: "Conversion Optimization",
        tips: "Discuss A/B testing, clear CTAs, page speed, mobile optimization, and trust signals.",
      },
    ],
    behavioral: [
      {
        question: "Tell me about a marketing campaign that didn't perform as expected. What did you learn?",
        difficulty: "Medium",
        category: "Problem Solving",
        tips: "Be honest about the failure, explain your analysis, and highlight lessons learned.",
      },
      {
        question: "How do you prioritize multiple marketing campaigns with limited resources?",
        difficulty: "Medium",
        category: "Time Management",
        tips: "Discuss frameworks like ICE score (Impact, Confidence, Ease) and stakeholder alignment.",
      },
      {
        question: "Describe a time when you used data to convince stakeholders to change direction.",
        difficulty: "Hard",
        category: "Data-Driven Decision Making",
        tips: "Present clear metrics, insights, and business impact of the proposed change.",
      },
    ],
    resumeBased: [
      {
        question: "Your resume mentions increasing social media engagement by 150%. What strategies did you employ?",
        difficulty: "Medium",
        category: "Resume-Based",
        tips: "Detail content strategy, posting schedule, engagement tactics, and community management.",
        resumeReference: "Achievement in Experience section",
      },
      {
        question: "You have experience with email marketing. How do you segment audiences for campaigns?",
        difficulty: "Medium",
        category: "Resume-Based",
        tips: "Discuss behavioral, demographic, and psychographic segmentation with examples.",
        resumeReference: "Skills section: Email Marketing",
      },
      {
        question: "I see you managed a $50K marketing budget. How do you allocate resources across channels?",
        difficulty: "Hard",
        category: "Resume-Based",
        tips: "Explain your framework for budget allocation, testing, and reallocation based on performance.",
        resumeReference: "Budget management mentioned",
      },
    ],
  },
};

export default function InterviewQuestions() {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState("Developer");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const allQuestions = [
    ...questionsByRole[currentRole].technical,
    ...questionsByRole[currentRole].behavioral,
    ...questionsByRole[currentRole].resumeBased,
  ];

  const filteredQuestions =
    selectedCategory === "all"
      ? allQuestions
      : allQuestions.filter((q) => {
          if (selectedCategory === "technical")
            return questionsByRole[currentRole].technical.includes(q);
          if (selectedCategory === "behavioral")
            return questionsByRole[currentRole].behavioral.includes(q);
          if (selectedCategory === "resume")
            return questionsByRole[currentRole].resumeBased.includes(q);
          return true;
        });

  const handleCopy = (question, index) => {
    navigator.clipboard.writeText(question);
    setCopiedIndex(index);
    toast.success("Question copied to clipboard");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    toast.success("Regenerating questions", {
      description: "AI is creating fresh interview questions based on your resume",
    });
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Questions updated", {
        description: "New personalized questions are ready",
      });
    }, 2000);
  };

  const handleDownload = () => {
    toast.success("Questions downloaded", {
      description: "Your interview preparation guide is ready",
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/10";
      case "Medium":
        return "text-[#f97316] border-[#f97316]/30 bg-[#f97316]/10";
      case "Hard":
        return "text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10";
      default:
        return "text-[#ef4444] border-[#ef4444]/30 bg-[#ef4444]/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f97316]/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <header className="relative z-10 bg-[#1a0a0a]/80 backdrop-blur-md border-b border-[#ef4444]/20 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-[#a1a1aa] hover:text-[#ef4444] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">BACK TO DASHBOARD</span>
            </button>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="border border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/10 bg-transparent font-bold"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                Generate More
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="w-10 h-10 text-[#ef4444]" />
              <h1 className="text-5xl font-bold text-white tracking-wider">
                INTERVIEW PREP
              </h1>
            </div>
            <p className="text-xl text-[#a1a1aa]">
              AI-powered questions tailored to your resume and target role
            </p>
          </div>

          {/* Role Selection */}
          <div className="bg-[#1a0a0a]/80 backdrop-blur-sm border border-[#ef4444]/20 rounded-xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white tracking-wider">SELECT ROLE</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Developer", "UI/UX Designer", "Marketing"].map((role) => (
                <button
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    currentRole === role
                      ? "bg-[#ef4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                      : "bg-[#2a1010] text-[#a1a1aa] hover:text-white border border-[#ef4444]/20"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-[#1a0a0a]/80 backdrop-blur-sm border border-[#ef4444]/20 rounded-xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <h3 className="text-lg font-bold text-white tracking-wider mb-4">FILTER BY CATEGORY</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-5 py-2 rounded-full font-bold transition-all text-sm ${
                  selectedCategory === "all"
                    ? "bg-[#ef4444] text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                    : "bg-[#2a1010] text-[#a1a1aa] hover:text-white border border-[#ef4444]/20"
                }`}
              >
                ALL QUESTIONS
              </button>
              {[
                { id: "technical", label: "Technical" },
                { id: "behavioral", label: "Behavioral" },
                { id: "resume", label: "Resume-Based" },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-bold transition-all text-sm ${
                    selectedCategory === category.id
                      ? "bg-[#f97316] text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                      : "bg-[#2a1010] text-[#a1a1aa] hover:text-white border border-[#f97316]/20"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Grid */}
          <div className="space-y-6">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] border border-[#ef4444]/30 rounded-xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:border-[#ef4444]/50 transition-all"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/30">
                          {q.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white leading-relaxed">
                        {q.question}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(q.question)}
                      className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors p-2"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-5 h-5 text-[#10b981]" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Tips Section */}
                  <div className="bg-[#0a0a0a]/50 border border-[#ef4444]/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-[#ef4444] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-[#ef4444] mb-1 tracking-wider">ANSWER TIPS:</p>
                        <p className="text-sm text-[#a1a1aa] leading-relaxed">{q.tips}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resume Reference (if available) */}
                  {q.resumeReference && (
                    <div className="mt-4 bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-lg p-4">
                      <p className="text-xs font-bold text-[#ef4444] mb-1 tracking-wider">BASED ON YOUR RESUME:</p>
                      <p className="text-sm text-[#a1a1aa]">{q.resumeReference}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#1a0a0a] border border-[#ef4444]/20 rounded-xl">
                <p className="text-[#a1a1aa] text-lg">No questions available for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}