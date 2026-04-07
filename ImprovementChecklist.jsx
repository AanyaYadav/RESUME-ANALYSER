import { useState } from "react";
import { motion } from "motion/react";
import { Checkbox } from "./ui/checkbox";

const initialItems = [
  { id: "1", text: "Add measurable achievements with specific metrics", completed: false, priority: "high" },
  { id: "2", text: "Add 5 relevant industry keywords", completed: false, priority: "high" },
  { id: "3", text: "Fix formatting inconsistencies", completed: false, priority: "medium" },
  { id: "4", text: "Add project impact metrics and outcomes", completed: false, priority: "high" },
  { id: "5", text: "Use strong action verbs at the start of bullet points", completed: false, priority: "medium" },
  { id: "6", text: "Include relevant technical skills", completed: false, priority: "low" },
];

export function ImprovementChecklist() {
  const [items, setItems] = useState(initialItems);

  const handleToggle = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-[#dc2626]";
    if (priority === "medium") return "bg-[#ec4899]";
    return "bg-[#ef4444]";
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.2)] p-8 border border-[#ef4444]/30">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-wider">IMPROVEMENT CHECKLIST</h3>
            <p className="text-sm text-[#a1a1aa] mt-1">
              Complete these tasks to boost your ATS score
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#ef4444]">
              {completedCount}/{items.length}
            </div>
            <div className="text-xs text-[#a1a1aa]">completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-[#0a0a0a]/50 rounded-full overflow-hidden border border-[#ef4444]/20">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ef4444] to-[#f97316]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                item.completed
                  ? "bg-[#0a0a0a]/50 border-[#ef4444]/20"
                  : "bg-[#0a0a0a]/30 border-[#ef4444]/30 hover:border-[#ef4444]/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]"
              }`}
            >
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => handleToggle(item.id)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <label
                  htmlFor={item.id}
                  className={`cursor-pointer text-sm transition-all ${
                    item.completed
                      ? "line-through text-[#a1a1aa]"
                      : "text-white font-medium"
                  }`}
                >
                  {item.text}
                </label>
              </div>
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)} mt-2`} />
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 pt-4 border-t border-[#ef4444]/20">
          <span className="text-xs text-[#a1a1aa] font-bold">PRIORITY:</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span className="text-xs text-[#a1a1aa]">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ec4899]" />
            <span className="text-xs text-[#a1a1aa]">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
            <span className="text-xs text-[#a1a1aa]">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}