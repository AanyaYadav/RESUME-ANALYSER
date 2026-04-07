import { Link } from "react-router";
import { Brain, Sparkles, Zap, Shield, Star, GitCompare } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ef4444]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f97316]/10 rounded-full blur-[120px]"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#ef4444]/20 bg-[#1a0a0a]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#ef4444] blur-lg opacity-50"></div>
                <Brain className="w-10 h-10 text-[#ef4444] relative z-10" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wider">GO TO GO RESUME ANALYZER</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors">Features</a>
              <Link to="/interview-questions" className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors">
                Interview Prep
              </Link>
              <Link to="/compare" className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors">
                Compare
              </Link>
              <Link to="/voice-feedback" className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors">
                Voice AI
              </Link>
              <Link to="/upload">
                <Button className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90 px-6 py-3 text-base font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-full">
                <div className="w-2 h-2 bg-[#ef4444] rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-[#ef4444] tracking-widest">AI-POWERED ANALYSIS</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">ANALYZE YOUR</span><br />
                <span className="bg-gradient-to-r from-[#ef4444] via-[#ec4899] to-[#f97316] bg-clip-text text-transparent">
                  RESUME WITH AI
                </span>
              </h1>
              
              <p className="text-xl text-[#a1a1aa] mb-10 leading-relaxed max-w-xl">
                Leverage advanced machine learning algorithms to optimize your resume for ATS systems. Get real-time insights, intelligent recommendations, and data-driven improvements.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/upload">
                  <Button size="lg" className="bg-[#ef4444] text-white hover:bg-[#ef4444]/90 text-lg px-10 py-7 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.4)] font-bold">
                    <Brain className="w-5 h-5 mr-2" />
                    START ANALYSIS
                  </Button>
                </Link>
                <Link to="/compare">
                  <Button size="lg" variant="outline" className="border-2 border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/10 text-lg px-10 py-7 rounded-lg font-bold">
                    <GitCompare className="w-5 h-5 mr-2" />
                    COMPARE VERSIONS
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ef4444] to-[#f97316] border-2 border-[#0a0a0a]"></div>
                    ))}
                  </div>
                  <span className="text-[#a1a1aa] text-sm">10K+ Users</span>
                </div>
                <div className="h-8 w-px bg-[#ef4444]/20"></div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-[#ef4444] text-[#ef4444]" />
                  ))}
                </div>
                <span className="text-[#a1a1aa] text-sm">4.9/5 Rating</span>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="relative bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl p-8 border border-[#ef4444]/30 shadow-[0_0_50px_rgba(239,68,68,0.15)]">
                {/* Score Display */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">94</div>
                    <div className="text-xs text-white/90 font-bold mt-1">ATS SCORE</div>
                  </div>
                </div>

                {/* Resume Preview */}
                <div className="bg-[#0a0a0a] border border-[#ef4444]/20 rounded-lg p-6 mb-6 mt-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-[#ef4444]/30 rounded w-3/4"></div>
                      <div className="h-2 bg-[#ef4444]/20 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#ef4444]/15 rounded w-full"></div>
                    <div className="h-2 bg-[#ef4444]/15 rounded w-5/6"></div>
                    <div className="h-2 bg-[#ef4444]/15 rounded w-4/6"></div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="absolute -right-8 top-32 space-y-3">
                  <div className="bg-[#ef4444] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <Sparkles className="w-4 h-4" />
                    OPTIMIZED
                  </div>
                  <div className="bg-[#f97316] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                    <Zap className="w-4 h-4" />
                    ATS READY
                  </div>
                  <div className="bg-[#ec4899] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                    <Shield className="w-4 h-4" />
                    VERIFIED
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-4 left-8 right-8 grid grid-cols-3 gap-3">
                <div className="bg-[#1a0a0a] border border-[#ef4444]/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-[#ef4444]">98%</div>
                  <div className="text-xs text-[#a1a1aa]">Accuracy</div>
                </div>
                <div className="bg-[#1a0a0a] border border-[#f97316]/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-[#f97316]">24</div>
                  <div className="text-xs text-[#a1a1aa]">Insights</div>
                </div>
                <div className="bg-[#1a0a0a] border border-[#ec4899]/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-[#ec4899]">A+</div>
                  <div className="text-xs text-[#a1a1aa]">Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="relative z-10 bg-[#1a0a0a]/50 backdrop-blur-md py-10 border-y border-[#ef4444]/20">
        <div className="container mx-auto px-6">
          <p className="text-center text-[#a1a1aa] text-xs mb-8 tracking-widest uppercase">Trusted by candidates at</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-50">
            <span className="text-white text-xl font-bold tracking-wider">GOOGLE</span>
            <span className="text-white text-xl font-bold tracking-wider">MICROSOFT</span>
            <span className="text-white text-xl font-bold tracking-wider">AMAZON</span>
            <span className="text-white text-xl font-bold tracking-wider">META</span>
            <span className="text-white text-xl font-bold tracking-wider">APPLE</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-24" id="features">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-wider">
            ADVANCED AI CAPABILITIES
          </h2>
          <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto">
            Machine learning-powered resume optimization for maximum ATS compatibility
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
            <div className="relative bg-[#1a0a0a] border border-[#ef4444]/30 rounded-2xl p-8 hover:border-[#ef4444] transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ef4444] to-[#f97316] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">AI SCORING</h3>
              <p className="text-[#a1a1aa] leading-relaxed">
                Advanced neural networks analyze your resume with precision scoring from 0-100, identifying exact compatibility with ATS systems.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f97316] to-[#ec4899] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
            <div className="relative bg-[#1a0a0a] border border-[#f97316]/30 rounded-2xl p-8 hover:border-[#f97316] transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#ec4899] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">SMART INSIGHTS</h3>
              <p className="text-[#a1a1aa] leading-relaxed">
                Deep learning algorithms provide section-by-section analysis with actionable recommendations to maximize your interview chances.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#ef4444] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
            <div className="relative bg-[#1a0a0a] border border-[#ec4899]/30 rounded-2xl p-8 hover:border-[#ec4899] transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ec4899] to-[#ef4444] rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wider">ROLE OPTIMIZATION</h3>
              <p className="text-[#a1a1aa] leading-relaxed">
                Specialized AI models for Developer, Designer, and Marketing roles with custom optimization patterns for each field.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/upload">
            <Button size="lg" className="bg-gradient-to-r from-[#ef4444] via-[#f97316] to-[#ec4899] text-white hover:opacity-90 text-xl px-12 py-7 rounded-lg shadow-[0_0_40px_rgba(239,68,68,0.4)] font-bold">
              <Brain className="w-6 h-6 mr-2" />
              ANALYZE NOW
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#1a0a0a]/80 backdrop-blur-md border-t border-[#ef4444]/20 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#a1a1aa]">
            AI-powered resume optimization platform for modern job seekers.
          </p>
          <p className="text-[#a1a1aa]/60 text-sm mt-4">
            © 2026 GO TO GO Resume Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}