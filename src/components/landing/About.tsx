import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
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

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
    <section id="about" className="bg-background py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20" ref={sectionRef}>
      <div className="container-responsive">
        <div className="flex flex-col lg:flex-row lg:space-x-8 xl:space-x-12 2xl:space-x-16">
          <div className="lg:w-3/4">
          
          {/* Meet Our Founder Section */}
            <motion.div
              className="mb-16 md:mb-24"
              variants={magazineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-heading">
                MEET OUR
                <br />
                <span className="text-primary">FOUNDER</span>
              </h2>
              
              <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg mb-6 sm:mb-8 md:mb-10 hover:bg-white hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
                  {/* Founder Interactive Card */}
                  <div className="lg:col-span-1">
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: 0.2 }}
                      className="relative h-80 lg:h-96 perspective-1000"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}photos/interior/1.png`}
                        alt="Founder"
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover mx-auto shadow-lg"
                        onError={(e) => {
                          console.log('Image failed to load:', e.currentTarget.src);
                          // Try fallback image
                          e.currentTarget.src = `${import.meta.env.BASE_URL}photos/saridena_logo.png`;
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Founder Information */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black mb-4 sm:mb-6 md:mb-8 font-heading">
                      Mr. Suman Rao Saridena
                    </h3>
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed mb-4 sm:mb-6 md:mb-8 font-content">
                        An entrepreneur with a global perspective and local roots, Mr. Suman Rao brings precision, innovation, and restraint to the way India builds. With over 16 years of experience in the U.S. leading technology programs for Fortune 100 companies, his shift to real estate was not to follow trends, but to redefine them.
                      </p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed mb-4 sm:mb-6 md:mb-8">
                        His academic foundation, B.E. in Mechanical Engineering (Osmania University) and M.S. in Computer Science (USA), equips him to see design as a science, and construction as art.
                      </p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black font-semibold leading-relaxed">
                        His vision is not just to build properties, but to create an ecosystem of thoughtful living for those who expect more from life, and even more from space.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Vision Section */}
            <motion.div
              className="mb-16 md:mb-24"
              variants={magazineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 font-heading">
                OUR
                <br />
                <span className="text-primary">VISION</span>
              </h2>
              
              <div className="bg-primary/10 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg mb-8 hover:bg-primary/20 hover:shadow-2xl transition-all duration-300">
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-base md:text-lg text-black leading-relaxed mb-6 font-content">
                    We don't just construct walls. We design quietly. We don't talk about luxury. We live it in the smallest detail. Our vision is to reimagine what homes mean in a world that never slows down.
                  </p>
                  <p className="text-base md:text-lg text-black leading-relaxed mb-6 font-content">
                    At Saridena, we create spaces that do not demand attention, they invite presence. Homes that don't overpower lives, but elevate them. Homes where the only crowd is the trees, and the only sound is your own rhythm.
                  </p>
                  <p className="text-base md:text-lg text-black font-bold leading-relaxed font-content">
                    We aim to become India's most mindful developer, building not on trends but on timeless principles of peace, proportion, and permanence.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Our Mission Section */}
            <motion.div
              className="mb-16 md:mb-24"
              variants={magazineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 font-heading">
                OUR
                <br />
                <span className="text-primary">MISSION</span>
              </h2>
              
              <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg hover:bg-white hover:shadow-2xl transition-all duration-300">
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 1.0 }}
                >
                  <p className="text-xl md:text-2xl text-black font-bold text-center mb-8 leading-relaxed font-content">
                    To build with conscience. To lead with precision. To deliver with presence.
                  </p>
                  <p className="text-base md:text-lg text-black leading-relaxed mb-6 font-content">
                    We believe homes shape lives. They hold stories. They evolve with generations. And every material we use, every square foot we plan, is guided by that truth.
                  </p>
                  <p className="text-base md:text-lg text-black leading-relaxed mb-6 font-content">
                    We are committed to eco-first construction, legacy craftsmanship, and intuitive design. We don't just meet expectations, we remove the need for them.
                  </p>
                  <p className="text-base md:text-lg text-black font-semibold leading-relaxed font-content">
                    Because when you belong here, you just know.
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
          
          {/* Side Component with Introductory Text */}
          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <motion.div
              className="sticky top-8"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-primary/5 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg border border-primary/20 hover:bg-primary/15 hover:shadow-2xl hover:border-primary/40 transition-all duration-300">
                <h3 className="text-lg md:text-xl font-bold text-black mb-6 leading-tight font-heading">
                  We Build With Our Heart, Not Just Concrete.
                </h3>
                <div className="space-y-4">
                  <p className="text-sm md:text-base text-black leading-relaxed font-content">
                    Welcome to Saridena Constructions Pvt. Ltd., where luxury isn't just a finish. It's a feeling that runs through every detail.
                  </p>
                  <p className="text-sm md:text-base text-black leading-relaxed font-content">
                    We do not build homes for the market. We build for moments, for silence, for stillness, for space.
                  </p>
                  <p className="text-sm md:text-base text-black font-semibold leading-relaxed font-content">
                    For those who have stopped searching, because what they were looking for is finally here.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
