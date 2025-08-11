import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { SideAd } from "../SideAd";
import { useState, useRef, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const magazineVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

export function About() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-background py-12 md:py-24" ref={sectionRef}>
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-3/4">
            {/* Magazine-style header */}
            <motion.div
              className="mb-12 md:mb-20"
              variants={magazineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                VR
                <br />
                <span className="text-primary">EXPERIENCE</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Step into your future home before it's built. Revolutionary technology meets architectural excellence.
              </p>
            </motion.div>

            {/* First magazine spread */}
            <div className="mb-16 md:mb-24">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div
                  variants={magazineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    WALK THROUGH
                    <br />
                    <span className="text-primary">YOUR VISION</span>
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                    Our clients don't just see blueprints; they explore their entire villa in a virtual environment. This allows for unparalleled flexibility to make changes to interiors, layouts, and even exterior elements in real-time.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Imagine adjusting kitchen cabinet finishes, change of flooring or bathroom tiles, sanitary, or experimenting with lighting, all before construction begins.
                  </p>
                </motion.div>
                
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.5 }}
                  className="relative rounded-lg overflow-hidden shadow-2xl image-container"
                >
                  <img
                    src="/saridena_constructions/photos/vr/vr_walkthrough.png"
                    alt="VR Walkthrough"
                    className="w-full h-auto object-cover high-quality-image"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xl md:text-2xl font-bold text-center p-6">
                      "Explore every corner, feel the space, make it truly yours."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Second magazine spread - reversed layout */}
            <div className="mb-16 md:mb-24">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div
                  variants={imageVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.7 }}
                  className="relative rounded-lg overflow-hidden shadow-2xl lg:order-2 image-container"
                >
                  <img
                    src="/saridena_constructions/photos/vr/vr_customization.png"
                    alt="VR Customization"
                    className="w-full h-auto object-cover high-quality-image"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xl md:text-2xl font-bold text-center p-6">
                      "Your vision, our expertise, perfected in virtual reality."
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  variants={magazineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.9 }}
                  className="lg:order-1"
                >
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    UNMATCHED
                    <br />
                    <span className="text-primary">PRECISION</span>
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                    Our VR experience isn't just for viewing; it's a powerful design tool. Clients can interact with the environment, change materials and furniture, with immediate visual feedback.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    This iterative design process minimizes costly revisions during construction and ensures every detail aligns with your desires.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <SideAd />
          </div>
        </div>
      </div>
    </section>
  );
}
