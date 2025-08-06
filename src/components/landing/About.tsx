import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

import { SideAd } from "../SideAd";

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

export function About() {
  return (
    <section id="about" className="bg-background">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:space-x-8 mt-24">
          <div className="lg:w-3/4">
            <SectionTitle
              subtitle="Virtual Reality Experience"
              title="Experience Your Dream Villa in Virtual Reality"
              description="Before a single brick is laid, step into your future home. Our cutting-edge 3D modeling and VR technology offer an immersive, real-time experience."
              subtitle={""}
            />

            <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <h3 className="text-3xl font-bold mb-4">Walk Through Your Vision</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our clients don't just see blueprints; they explore their entire villa in a virtual environment. This allows for unparalleled flexibility to make changes to interiors, layouts, and even exterior elements in real-time.
                </p>
                <p className="text-lg text-muted-foreground">
                  Imagine adjusting kitchen cabinet finishes, moving walls, or experimenting with lighting, all before construction begins. This interactive process ensures your final villa is precisely what you envisioned, saving time and resources.
                </p>
              </motion.div>
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-xl max-w-xs mx-auto"
              >
                <img
                  src="/saridena_constructions/photos/vr/vr_walkthrough.png"
                  alt="VR Walkthrough"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-semibold text-center p-4">"Explore every corner, feel the space, make it truly yours."</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="relative rounded-lg overflow-hidden shadow-xl md:order-2 max-w-xs mx-auto"
              >
                <img
                  src="/saridena_constructions/photos/vr/vr_customization.png"
                  alt="VR Customization"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-semibold text-center p-4">"Your vision, our expertise, perfected in virtual reality."</p>
                </div>
              </motion.div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="md:order-1"
              >
                <h3 className="text-3xl font-bold mb-4">Unmatched Flexibility & Precision</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Our VR experience isn't just for viewing; it's a powerful design tool. Clients can interact with the environment, change materials, furniture, and even structural elements with immediate visual feedback.
                </p>
                <p className="text-lg text-muted-foreground">
                  This iterative design process minimizes costly revisions during construction and ensures every detail aligns with your desires. It's a seamless blend of technology and personalized design, delivering your dream home with confidence.
                </p>
              </motion.div>
            </div>
          </div>
          <SideAd />
        </div>
      </div>
    </section>
  );
}
