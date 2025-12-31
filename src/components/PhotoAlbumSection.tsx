import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ==================== CERTIFICATIONS ==================== */
const CERT_INTERVAL = 4500;

const CertificationsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const certs = [
    { id: 1, img: "/assets/serhas.jpg", title: "JavaScript Advanced Course" },
    { id: 2, img: "/assets/solo.jpg", title: "Sololearn JavaScript Course" },
    { id: 3, img: "/assets/html.jpg", title: "Sololearn HTML Course" },
    { id: 4, img: "/assets/css.jpg", title: "Sololearn CSS Course" },
  ];

  const perPage = 2;
  const totalPages = Math.ceil(certs.length / perPage);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const visibleCerts = certs.slice(
    page * perPage,
    page * perPage + perPage
  );

  const nextPage = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextPage, CERT_INTERVAL);
    return () => clearInterval(timer);
  }, [page, paused]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-36 bg-gradient-to-b from-indigo-900/40 via-black/30 to-black"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="code-block inline-block mb-4">
            {"// Certifications"}
          </span>
          <h2 className="text-4xl lg:text-6xl font-display font-bold">
            Verified <span className="gradient-text">Certificates</span>
          </h2>
        </motion.div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-[3rem] overflow-hidden border border-white/20 bg-black/20 backdrop-blur-xl p-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {visibleCerts.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-[2.5rem] overflow-hidden shadow-lg"
                  >
                    <img
                      src={cert.img}
                      alt={cert.title}
                      className="w-full h-[380px] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xl font-semibold text-white">
                        {cert.title}
                      </p>
                      <p className="text-sm text-white/60">
                        BDG Official Certification
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-indigo-500/20 hover:bg-indigo-500/40 transition flex items-center justify-center"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>

            <button
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-indigo-500/20 hover:bg-indigo-500/40 transition flex items-center justify-center"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==================== PHOTO ALBUM (EVENT TITLES) ==================== */

const PHOTO_INTERVAL = 4000;

const PhotoAlbumSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const photos = [
    { img: "/assets/mek.jpg", event: "JavaScript Conf 2024" },
    { img: "/assets/mekk.jpg", event: "42 Yerevan" },
    { img: "/assets/erku.jpg", event: "Shant TV Inteerwiew" },
    { img: "/assets/l.jpg", event: "42 Yerevan" },
    { img: "/assets/aaa.jpg", event: "JavaScript Conf 2024" },
    { img: "/assets/bbb.jpg", event: "JavaScript Conf 2024" },
    { img: "/assets/zzz.jpg", event: "JavaScript Conf 2024" },
    { img: "/assets/ttt.jpg", event: "42 Yerevan" },
  ];

  const perPage = 2;
  const totalPages = Math.ceil(photos.length / perPage);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const visiblePhotos = photos.slice(
    page * perPage,
    page * perPage + perPage
  );

  const nextPage = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextPage, PHOTO_INTERVAL);
    return () => clearInterval(timer);
  }, [page, paused]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <section
      ref={ref}
      className="py-36 bg-gradient-to-b from-black via-black/90 to-black"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="code-block inline-block mb-4">
            {"// Photo Album"}
          </span>
          <h2 className="text-4xl lg:text-6xl font-display font-bold">
            Personal <span className="gradient-text">Moments</span>
          </h2>
        </motion.div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-[3rem] overflow-hidden border border-white/20 bg-black/30 backdrop-blur-xl p-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {visiblePhotos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-[2.5rem] overflow-hidden shadow-lg bg-black/40"
                  >
                    <img
                      src={photo.img}
                      alt={photo.event}
                      className="w-full h-[360px] object-cover"
                    />
                    <div className="p-4 text-center bg-gradient-to-t from-black/80 to-black/40">
                      <p className="text-white text-sm lg:text-base font-semibold">
                        {photo.event}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/25 transition flex items-center justify-center"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>

            <button
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/25 transition flex items-center justify-center"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==================== EXPORT ==================== */

export default function CertificationsAndPhotoAlbum() {
  return (
    <>
      <CertificationsCarousel />
      <PhotoAlbumSection />
    </>
  );
}
