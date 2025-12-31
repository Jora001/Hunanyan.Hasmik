import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

/* ================= VARIANTS ================= */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22 },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.93,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ================= SECTION ================= */

const SkillsSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const skills = [
    {
      title: "Skills & Tools",
      items: [
        "HTML5/CSS3",
        "JavaScript/TypeScript",
        "React.js/Next.js",
        "Redux Toolkit, Zustand",
        "Node.js/Express.js",
        "Jira/Trello/Agile",
        "RESTful APIs",
        "MySQL/SQL",
        "Git & GitHub",
        "Linux/Ubuntu/Shell",
        "Webpack",
        "Postman",
        
      ],
    },
    {
      title: "Soft Skills",
      items: [
        "Time Management",
        "Problem Solving",
        "Communication Skills",
        "Collaboration & Teamwork",
        "Adaptability",
        "Continuous Learning",
        " Pressentation skills,",
        "Empathy & User Understanding",
        "Critical Thinking & Analytical Skills",
        "Networking & Community Engagement",
        "Mentoring & Training",
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-44 overflow-hidden"
    >
      {/* ===== GLOBAL LIGHT ORBS ===== */}
      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -left-48 w-[520px] h-[520px] bg-primary/20 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{ x: [0, -140, 0], y: [0, 120, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-fuchsia-500/10 rounded-full blur-[160px]"
        />
      </motion.div>

      <div className="section-container relative z-10">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <span className="code-block mb-5 inline-block">
            {"// Skills"}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Areas of <span className="gradient-text">Focus</span>
          </h2>
        </motion.div>

        {/* ===== CARDS ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto"
        >
          {skills.map((block) => (
            <LightCard
              key={block.title}
              title={block.title}
              items={block.items}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

/* ================= LIGHT CARD ================= */

const LightCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(
      420px at ${mouseX}px ${mouseY}px,
      rgba(168,85,247,0.25),
      transparent 70%
    )
  `;

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ y: -16, scale: 1.05 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl glass-card p-12 min-h-[460px]"
    >
      {/* ===== MOUSE LIGHT ===== */}
      <motion.div
        style={{ background: glow }}
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* ===== ANIMATED LIGHT SWEEP ===== */}
      <motion.div
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12"
      />

      {/* ===== BREATHING BORDER GLOW ===== */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-3xl border border-white/15"
      />

      <h3 className="relative z-10 text-2xl font-display font-semibold mb-12 text-primary">
        {title}
      </h3>

      <ul className="relative z-10 space-y-6">
        {items.map((item) => (
          <motion.li
            key={item}
            variants={itemVariants}
            whileHover={{ x: 8 }}
            className="flex items-start gap-4 text-muted-foreground leading-relaxed"
          >
            <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};
