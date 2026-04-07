import { motion } from "motion/react";

export function RoleToggle({ currentRole, onRoleChange }) {
  const roles = [
    { name: "Developer", color: "#ef4444", icon: "💻" },
    { name: "UI/UX Designer", color: "#f97316", icon: "🎨" },
    { name: "Marketing", color: "#ec4899", icon: "📊" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a0a0a] to-[#2a1010] rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.2)] p-6 border border-[#ef4444]/30">
      <h3 className="text-lg font-bold text-white mb-4 tracking-wider">SELECT TARGET ROLE</h3>
      <div className="flex flex-wrap gap-3">
        {roles.map((role) => (
          <motion.button
            key={role.name}
            onClick={() => onRoleChange(role.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentRole === role.name
                ? "text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                : "bg-[#0a0a0a]/50 text-[#a1a1aa] hover:bg-[#0a0a0a]/80 border border-[#ef4444]/20"
            }`}
            style={{
              backgroundColor: currentRole === role.name ? role.color : undefined,
            }}
          >
            <span>{role.icon}</span>
            <span>{role.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}