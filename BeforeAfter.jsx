import { ArrowRight } from "lucide-react";

export function BeforeAfter({ role }) {
  const beforeContent = {
    Developer: [
      "Worked on web development projects",
      "Used React and Node.js",
      "Improved application performance",
    ],
    "UI/UX Designer": [
      "Designed user interfaces",
      "Created wireframes and prototypes",
      "Worked with design teams",
    ],
    Marketing: [
      "Managed social media accounts",
      "Created marketing campaigns",
      "Increased brand awareness",
    ],
  };

  const afterContent = {
    Developer: [
      "Developed 3 full-stack web applications using React.js and Node.js, serving 5,000+ active users",
      "Optimized application load time by 40% through code splitting and lazy loading",
      "Implemented RESTful APIs with Express.js, reducing response time by 35%",
    ],
    "UI/UX Designer": [
      "Designed and prototyped 15+ user interfaces for mobile and web applications using Figma",
      "Conducted user research with 50+ participants, improving satisfaction scores by 45%",
      "Led cross-functional design sprints resulting in 3 successful product launches",
    ],
    Marketing: [
      "Managed social media strategy across 4 platforms, growing followers by 250% (10K to 35K)",
      "Executed 8 integrated campaigns generating $150K revenue and 2,000+ qualified leads",
      "Increased brand engagement rate by 65% through data-driven content optimization",
    ],
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.2)] p-8 border border-[#ef4444]/30">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-bold text-white tracking-wider">BEFORE & AFTER</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-[#dc2626] via-[#ec4899] to-[#ef4444]" />
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        {/* Before */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 bg-[#dc2626]/10 rounded-full border border-[#dc2626]/30">
            <span className="text-sm font-bold text-[#dc2626]">❌ BEFORE</span>
          </div>
          <div className="space-y-3 bg-[#0a0a0a]/50 rounded-xl p-6 border border-[#dc2626]/20">
            {beforeContent[role].map((item, index) => (
              <p key={index} className="text-sm text-[#a1a1aa] line-through">
                • {item}
              </p>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center pt-12">
          <div className="w-12 h-12 bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* After */}
        <div className="space-y-4">
          <div className="inline-block px-4 py-1 bg-[#ef4444]/10 rounded-full border border-[#ef4444]/30">
            <span className="text-sm font-bold text-[#ef4444]">✓ AFTER</span>
          </div>
          <div className="space-y-3 bg-gradient-to-br from-[#ef4444]/5 to-[#f97316]/5 rounded-xl p-6 border-2 border-[#ef4444]/30">
            {afterContent[role].map((item, index) => (
              <p key={index} className="text-sm text-white font-medium">
                • {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Arrow */}
      <div className="md:hidden flex justify-center my-6">
        <div className="w-10 h-10 bg-gradient-to-r from-[#ef4444] to-[#f97316] rounded-full flex items-center justify-center rotate-90 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}