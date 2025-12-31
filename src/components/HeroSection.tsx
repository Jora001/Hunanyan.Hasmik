import { useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  cubicBezier,
} from "framer-motion";
import { ArrowDown, Linkedin, FileText, Github } from "lucide-react";

/* ───────── EASING ───────── */
const easeInOut = cubicBezier(0.4, 0, 0.2, 1);

/* ───────── FLOATING TAG ───────── */
const premiumTag = (duration = 5, delay = 0) => ({
  animate: {
    y: [0, -16, 0],
    boxShadow: [
      "0 0 18px rgba(255,255,255,0.25)",
      "0 0 36px rgba(255,255,255,0.55)",
      "0 0 18px rgba(255,255,255,0.25)",
    ],
    transition: {
      duration,
      repeat: Infinity,
      delay,
      ease: easeInOut,
    },
  },
});

const HeroSection = () => {
  /* ───────── 3D TILT ───────── */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-120, 120], [12, -12]);
  const rotateY = useTransform(x, [-120, 120], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  /* ───────── PARTICLES ───────── */
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        duration: 6 + Math.random() * 5,
        delay: Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 opacity-35"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #8b5cf6, transparent 45%), radial-gradient(circle at 80% 80%, #22d3ee, transparent 45%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* PARTICLES */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -34, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: easeInOut,
          }}
        />
      ))}

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-4 lg:px-0">
          {/* TEXT */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeInOut }}
          >
            <motion.span
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card font-mono text-sm"
              {...premiumTag(4, 0)}
            >
              💻 Hasmik Hunanyan
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6">
              I&apos;m{" "}
              <span className="gradient-text animate-gradient">Hasmik</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6">
              Web Developer & Trainer
            </p>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md sm:max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              I build modern, scalable web applications using React, Node.js,
              and Express.js, while also mentoring and teaching best practices
              in real-world development.
            </p>

            {/* SOCIALS */}
            <div className="flex justify-center lg:justify-start gap-4 mt-6">
              <motion.a
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 40px rgba(255,255,255,0.75)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                href="https://github.com/hunanyanhasmik"
                target="_blank"
                className="p-3 rounded-full text-white bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.45)]"
              >
                <Github className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.15 }}
                href="https://www.linkedin.com/in/hasmik-hunanyan-0555b623a/"
                target="_blank"
                className="p-3 rounded-full bg-[#0a66c2]/20 text-[#0a66c2] shadow-[0_0_25px_rgba(10,102,194,0.45)]"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.15 }}
                href="/hasmik.pdf"
                download
                className="p-3 rounded-full bg-primary/20 text-primary shadow-[0_0_25px_hsl(var(--primary)/0.45)]"
              >
                <FileText className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* AVATAR */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-64 sm:w-80 lg:w-[460px] h-64 sm:h-80 lg:h-[460px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: easeInOut }}
          >
            {/* ROTATING RING */}
            <motion.div
              className="absolute inset-[-14px] rounded-full border border-white/20 shadow-[0_0_60px_rgba(139,92,246,0.35)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* TECH BADGES */}
            <motion.div
              className="absolute -left-16 top-24 px-3 py-1 text-xs font-mono rounded-lg
              bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 backdrop-blur-md"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: easeInOut }}
            >
              React
            </motion.div>

            <motion.div
              className="absolute -right-16 top-1/2 px-3 py-1 text-xs font-mono rounded-lg
              bg-green-500/10 text-green-300 border border-green-400/30 backdrop-blur-md"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: easeInOut }}
            >
              Node.js
            </motion.div>

            <motion.div
              className="absolute left-1/2 -bottom-12 -translate-x-1/2 px-3 py-1 text-xs font-mono rounded-lg
              bg-gray-500/10 text-gray-200 border border-gray-400/30 backdrop-blur-md"
              animate={{ x: [0, 18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: easeInOut }}
            >
              Express.js
            </motion.div>

            {/* IMAGE */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden border border-white/20 shadow-2xl"
              animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: easeInOut }}
            >
              <img
                src="/assets/profile-photo.jpg"
                alt="Hasmik Hunanyan"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.35)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* SCROLL */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: easeInOut }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
