import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Watermark } from "@/components/Watermark";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showMagazineLayout, setShowMagazineLayout] = useState(false);

  const isInView = useInView(sectionRef, { amount: 0.6 });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      // Start transition after 3 seconds
      if (currentTime >= 3 && !videoCompleted) {
        setVideoCompleted(true);
        // Start layout transition immediately
        setShowMagazineLayout(true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoCompleted]);

  const handleVideoEnd = () => {
    // Ensure the transition is complete when video ends
    if (!videoCompleted) {
      setVideoCompleted(true);
      setShowMagazineLayout(true);
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background overlay */}
      <div className={`absolute inset-0 bg-black/60 z-10 transition-all duration-1000 ${
        showMagazineLayout ? 'bg-black/40' : ''
      }`} />

      {/* Video container with dynamic sizing */}
      <motion.div
        className="absolute z-0"
        initial={{ 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%" 
        }}
        animate={{
          top: showMagazineLayout ? "0%" : 0,
          left: showMagazineLayout ? "50%" : 0,
          width: showMagazineLayout ? "50%" : "100%",
          height: showMagazineLayout ? "100%" : "100%"
        }}
        transition={{ 
          duration: 1.2, 
          ease: "easeInOut",
          delay: showMagazineLayout ? 0.3 : 0
        }}
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src="/saridena_constructions/videos/bg_video.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover rounded-lg"
            style={{
              borderRadius: showMagazineLayout ? "12px" : "0px"
            }}
          />
        </div>
      </motion.div>

      {/* Fixed logo */}
      <motion.img
        layoutId="main-logo"
        src="/saridena_constructions/photos/saridena_logo.png"
        alt="Saridena Logo"
        style={{
          filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.6))",
          height: "3rem",
          imageRendering: "crisp-edges",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          willChange: "transform"
        }}
        className="fixed top-4 left-4 md:left-8 h-8 md:h-10 z-50 high-quality-image"
        loading="eager"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 0.1,
          ease: "linear"
        }}
      />

      {/* Main content area */}
      <div className="absolute inset-0 z-20">
        {/* Initial centered content */}
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: showMagazineLayout ? 0 : 1,
            scale: showMagazineLayout ? 0.9 : 1
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="container text-center text-white px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.5 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-extrabold tracking-tight">
              Crafting Your Dream Villa
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-white">
              Experience unparalleled luxury and craftsmanship with Saridena
              Constructions. We bring your vision of a perfect home to life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
              >
                <a href="#projects">
                  Our Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-background w-full sm:w-auto"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                  color: "white",
                }}
              >
                <a href="#contact">Get a Quote</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Magazine-style layout */}
        <motion.div
          className="absolute inset-0 flex items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ 
            opacity: showMagazineLayout ? 1 : 0,
            x: showMagazineLayout ? 0 : -100
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeInOut",
            delay: showMagazineLayout ? 0.5 : 0
          }}
        >
          <div className="w-full md:w-1/2 px-6 md:px-12 text-foreground dark:text-white">
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-4 md:mb-6 text-foreground dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: showMagazineLayout ? 1 : 0,
                y: showMagazineLayout ? 0 : 30
              }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              LUXURY
              <br />
              <span className="text-primary">VILLAS</span>
              <br />
              REDEFINED
            </motion.h1>
            
            <motion.div
              className="space-y-3 md:space-y-4 text-xs md:text-sm lg:text-base leading-relaxed mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: showMagazineLayout ? 1 : 0,
                y: showMagazineLayout ? 0 : 30
              }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <p className="text-gray-800 dark:text-gray-200">
                Where architectural excellence meets uncompromising quality. 
                Saridena Constructions transforms dreams into magnificent reality.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 text-xs md:text-xs lg:text-sm">
                From concept to completion, we craft bespoke living spaces that 
                reflect your unique vision and lifestyle.
              </p>
            </motion.div>

            {/* Buttons positioned vertically on extreme left */}
            <motion.div
              className="flex flex-col gap-4 w-fit"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: showMagazineLayout ? 1 : 0,
                y: showMagazineLayout ? 0 : 30
              }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-fit px-8"
              >
                <a href="#projects">
                  EXPLORE PORTFOLIO <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground text-foreground bg-background/80 hover:bg-foreground hover:text-background font-semibold w-fit px-8 backdrop-blur-sm"
              >
                <a href="#contact">START YOUR PROJECT</a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Global watermark - appears after magazine layout transition */}
      {showMagazineLayout && <Watermark />}
    </section>
  );
};
