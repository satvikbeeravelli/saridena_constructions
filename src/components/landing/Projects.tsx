import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simplified project structure without navigation categories
const allProjects: Record<string, any> = {
  "LakeWoods Villas": {},
  "Another Project": {},
  "New Project": {},
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const magazineVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string>("LakeWoods Villas");
  const [showVideoPreview, setShowVideoPreview] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video to play when preview is shown
  useEffect(() => {
    if (showVideoPreview && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.play().catch(error => {
        console.error('Failed to play video:', error);
      });
    }
  }, [showVideoPreview]);

  return (
    <motion.section
      id="projects"
      className="py-8 md:py-16 lg:py-20 bg-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Centered heading */}
        <motion.div
          variants={magazineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold tracking-tight mb-4 md:mb-6 font-heading">
            OUR
            <br />
            <span className="text-primary">PROJECTS</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto font-content">
            Experience our portfolio of luxury villas, each meticulously crafted with precision and artistic vision.
          </p>
        </motion.div>

        {/* Centered dropdown */}
        <motion.div
          variants={magazineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center space-y-6"
        >
          <Select onValueChange={(value) => setSelectedProject(value)} defaultValue={selectedProject}>
            <SelectTrigger className="w-full max-w-[320px]">
              <SelectValue placeholder="Select a Project" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(allProjects).map((projectName) => (
                <SelectItem key={projectName} value={projectName}>
                  {projectName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action buttons */}
          <div className="flex gap-4">
            {/* Preview button */}
            <button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300"
              onClick={() => setShowVideoPreview(!showVideoPreview)}
            >
              Preview
            </button>

            {/* Details button */}
            <button 
              onClick={() => {
                if (selectedProject === "LakeWoods Villas") {
                  // Navigate to Lakewood Villas dedicated page
                  const event = new CustomEvent('navigateToLakewood');
                  window.dispatchEvent(event);
                } else {
                  // Default behavior for other projects
                  console.log('Details for:', selectedProject);
                }
              }}
              className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300"
            >
              Details
            </button>
          </div>
        </motion.div>
      </div>

      {/* Video Preview Overlay */}
      <AnimatePresence>
        {showVideoPreview && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowVideoPreview(false)}
          >
            <motion.div
              className="relative w-[80vw] h-[80vh] max-w-4xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src="/saridena_constructions/videos/bg_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover rounded-lg"
                onLoadStart={() => console.log('Video loading started')}
                onCanPlay={() => console.log('Video can play')}
                onPlay={() => console.log('Video started playing')}
                onError={(e) => console.error('Video error:', e)}
                onLoadedData={() => console.log('Video data loaded')}
              />
              
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
                <h3 className="font-semibold font-heading">{selectedProject}</h3>
                <p className="text-sm opacity-80 font-content">Project Preview</p>
              </div>

              <button
                onClick={() => setShowVideoPreview(false)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}