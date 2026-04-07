import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

export function FeedbackCard({ section, score, issues, onFix }) {
  const getScoreColor = () => {
    if (score < 50) return "text-[#dc2626]";
    if (score < 75) return "text-[#ec4899]";
    return "text-[#ef4444]";
  };

  const getIcon = (type) => {
    if (type === "error") return <AlertCircle className="w-5 h-5 text-[#dc2626]" />;
    if (type === "warning") return <AlertTriangle className="w-5 h-5 text-[#ec4899]" />;
    return <CheckCircle className="w-5 h-5 text-[#10b981]" />;
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.15)] p-6 border border-[#ef4444]/30 hover:border-[#ef4444]/60 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#ef4444]/20">
        <h4 className="text-xl font-bold text-white tracking-wider">{section}</h4>
        <div className="flex flex-col items-end">
          <span className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}
          </span>
          <span className="text-xs text-[#a1a1aa]">/ 100</span>
        </div>
      </div>

      {/* Issues */}
      <div className="space-y-3 mb-4">
        {issues.map((issue, index) => (
          <div key={index} className="flex items-start gap-3">
            {getIcon(issue.type)}
            <span className="text-sm text-[#a1a1aa] flex-1 leading-relaxed">
              {issue.text}
            </span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button
        onClick={onFix}
        className="w-full mt-2 bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444]/20 font-bold"
      >
        View AI Suggestions
      </Button>
    </div>
  );
}