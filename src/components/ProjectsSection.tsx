import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ================= TYPES ================= */

type Project = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  cover: string;
  images: string[];
  tags: string[];
};

/* ================= MAIN SECTION ================= */

const ProjectsSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const [activeProject, setActiveProject] =
    useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Travel Time Project",
      shortDescription: "Front-End development",
      fullDescription:
        "Travel website to the most beautiful places, using HTML5, CSS3 / SCSS, JAVASCRIPT (with Swiper), NPM and Gulp task manager. Gulp lets automate processes and run repetitive tasks with easy. Website includes a dark and light mode. Full responsive website, witch compatible with all mobile devices and with a beautiful and user friendly interface.",
      cover: "/assets/apr.jpg",
      images: [
        "/assets/apr.jpg",
   
      ],
      tags: [
        "React.js",
        "JavaScript",
        "Front-End Development",
      
      ],
    },
    {
      id: 2,
      title: "JavaScript Image Editor",
      shortDescription: "JavaScript",
      fullDescription:
        "Full featured image editor using HTML5 Canvas. It includes a dark and light mode. It's one of the most feature-rich free JavaScript image editors that you will find. It comes with tons of image manipulation features. You can easily adjust the brightness, contrast and saturation of the images. Compatible with all mobile devices and with a beautiful and user friendly interface.",
      cover: "/assets/erk1.jpg",
      images: [
        "/assets/erk1.jpg",
       

      ],
      tags: ["JavaScript", "Image editing", "Deploying"],
    },
    {
      id: 3,
      title: "Business Coaching",
      shortDescription: "Front-End Development",
      fullDescription:
        "Business Coaching using HTML5, CSS3 / SCSS, JAVASCRIPT (with Swiper), NPM and Gulp task manager. Gulp lets automate processes and run repetitive tasks with easy. Website includes a dark and light mode. Full responsive website, witch compatible with all mobile devices and with a beautiful and user friendly interface.",
      cover: "/assets/Mot.jpg",
      images: [
        "/assets/nari2.jpg",
      
      ],
      tags: ["React.js", "Research","Deploying"],
    },



    



  ];

  /* SPLIT PROJECTS */
  const featuredProjects = projects.slice(0, 2);
  const otherProjects = projects.slice(2);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-40 overflow-hidden"
    >
      <div className="section-container relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-28"
        >
          <span className="code-block mb-4 inline-block">
            {"// Projects"}
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold">
            Visual <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* FIRST ROW — 2 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-28">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isInView={isInView}
              delay={index * 0.15}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>

        {/* SECOND ROW — 3 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isInView={isInView}
              delay={index * 0.1}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;

/* ================= PROJECT CARD ================= */

const ProjectCard = ({
  project,
  onOpen,
  isInView,
  delay,
}: {
  project: Project;
  onOpen: () => void;
  isInView: boolean;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay }}
    whileHover={{ y: -10 }}
    onClick={onOpen}
    className="cursor-pointer group"
  >
    <div className="relative rounded-3xl overflow-hidden glass-card border border-border/40 group-hover:border-primary/60 transition-all">
      <div className="h-[340px] overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-8">
        <h3 className="font-display font-bold text-xl mb-3">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-5">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-secondary border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ================= MODAL + AUTO CAROUSEL ================= */

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % project.images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [project.images.length]);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setIndex((i) => (i + 1) % project.images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setIndex(
      (i) => (i - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-background rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-12"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-primary/20 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-3xl font-display font-bold mb-6">
          {project.title}
        </h3>

        <p className="text-muted-foreground mb-10 max-w-3xl whitespace-pre-line leading-relaxed">
          {project.fullDescription}
        </p>

        {/* CAROUSEL */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={prev}
            className="absolute left-4 z-20 p-3 rounded-full bg-black/40 backdrop-blur hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          <div className="w-full max-w-4xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={project.images[index]}
                src={project.images[index]}
                className="w-full h-[480px] object-contain rounded-2xl bg-black/40"
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 140 : -140,
                  scale: 0.96,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -140 : 140,
                  scale: 0.96,
                  filter: "blur(6px)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="absolute right-4 z-20 p-3 rounded-full bg-black/40 backdrop-blur hover:scale-110 transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* DOTS */}
        <div className="mt-6 flex justify-center gap-3">
          {project.images.map((_, i) => (
            <motion.span
              key={i}
              layout
              className={`h-2.5 rounded-full ${
                i === index ? "bg-primary w-8" : "bg-muted w-2.5"
              }`}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
