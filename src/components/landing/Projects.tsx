import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ImageLoader } from "@/components/ImageLoader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "Interior" | "Exterior" | "Floor Plan" | "Location and layout" | "Isometric View";
type ProjectTab = "Project specification" | "Amenities";

interface ProjectItem {
  name: string;
  image: string;
  type?: string;
  model?: string;
}

interface ProjectData {
  [key: string]: {
    [key in Category]?: ProjectItem[];
  };
}

const allProjects: ProjectData = {
  "LakeWoods Villas": {
    Interior: [
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/1.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/2.png" },
      { name: "Sleek Kitchen", image: "/saridena_constructions/photos/interior/3.png" },
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/4.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/5.png" },
      { name: "Sleek Kitchen", image: "/saridena_constructions/photos/interior/6.png" },
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/7.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/8.png" },
      { name: "Sleek Kitchen", image: "/saridena_constructions/photos/interior/9.png" },
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/10.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/11.png" },
      { name: "Sleek Kitchen", image: "/saridena_constructions/photos/interior/12.png" },
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/13.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/14.png" },
      { name: "Sleek Kitchen", image: "/saridena_constructions/photos/interior/15.png" },
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/16.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/17.png" },
      { name: "Sleek Kitchen", image: "/saridena_constructions/photos/interior/18.png" },
      { name: "Modern Living Room", image: "/saridena_constructions/photos/interior/19.png" },
      { name: "Cozy Bedroom", image: "/saridena_constructions/photos/interior/20.jpg" },
    ],
    Exterior: [
      { name: "Contemporary Villa", image: "/saridena_constructions/photos/exterior/7.png" },
      { name: "Beachfront Residence", image: "/saridena_constructions/photos/exterior/1.jpg" },
      { name: "Mountain Chalet", image: "/saridena_constructions/photos/exterior/2.jpg" },
      { name: "Contemporary Villa", image: "/saridena_constructions/photos/exterior/3.png" },
      { name: "Beachfront Residence", image: "/saridena_constructions/photos/exterior/4.jpg" },
      { name: "Mountain Chalet", image: "/saridena_constructions/photos/exterior/5.jpg" },
      { name: "Contemporary Villa", image: "/saridena_constructions/photos/exterior/6.jpg" },
    ],
    "Floor Plan": [
      { name: "Two-Story House Blueprint", image: "/saridena_constructions/photos/floorplan/2.jpg" },
      { name: "Apartment Layout", image: "/saridena_constructions/photos/floorplan/3.jpg" },
      { name: "Open-Concept Floor Plan", image: "/saridena_constructions/photos/floorplan/4.jpg" },
    ],
    "Location and layout": [
      { name: "Open-Concept Floor Plan", image: "/saridena_constructions/photos/floorplan/1.jpg" },
      { name: "LakeWoods Villas Map", image: "map_iframe", type: "map" }, // Special identifier for the map iframe
    ],
    "Isometric View": [
      { name: "Isometric View - Building Layout", image: "/saridena_constructions/photos/isometric/1.jpg" },
      { name: "Isometric View - Design Perspective", image: "/saridena_constructions/photos/isometric/2.jpg" },
      { name: "Isometric View - Overview", image: "/saridena_constructions/photos/isometric/3.jpg" }
    ],
  },
  "Another Project": {
    Interior: [
      { name: "Another Interior 1", image: "/saridena_constructions/photos/interior/1.png" },
      { name: "Another Interior 2", image: "/saridena_constructions/photos/interior/2.png" },
    ],
    Exterior: [
      { name: "Another Exterior 1", image: "/saridena_constructions/photos/exterior/1.jpg" },
    ],
  },
  "New Project": {
    Interior: [
      { name: "New Interior 1", image: "/saridena_constructions/photos/interior/1.png" },
      { name: "New Interior 2", image: "/saridena_constructions/photos/interior/2.png" },
    ],
    Exterior: [
      { name: "New Exterior 1", image: "/saridena_constructions/photos/exterior/1.jpg" },
    ],
  },
};

const categoryOrder: Category[] = ["Location and layout", "Exterior", "Floor Plan", "Interior", "Isometric View"];

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
  const [selectedCategory, setSelectedCategory] = useState<Category>("Location and layout");
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedProjectTab, setSelectedProjectTab] = useState<ProjectTab>("Project specification");
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

  const currentProjectData = allProjects[selectedProject];

  // Preload first few images for better performance
  useEffect(() => {
    const currentCategoryImages = currentProjectData?.[selectedCategory];
    
    if (currentCategoryImages) {
      // Preload first 3 images
      currentCategoryImages.slice(0, 3).forEach((project) => {
        if (project.image && !project.image.includes('iframe')) {
          const img = new Image();
          img.src = project.image;
        }
      });
    }
  }, [selectedProject, selectedCategory, currentProjectData]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  }, [selectedCategory, carouselApi]);

  useEffect(() => {
    // When project changes, reset selected category to the first available category for that project
    if (categoryOrder.length > 0) {
      setSelectedCategory(categoryOrder[0]);
    }
  }, [selectedProject]);

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
        {/* Magazine-style header layout */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 md:mb-12 lg:mb-16">
          {/* Left side - Heading */}
          <motion.div
            variants={magazineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold tracking-tight mb-4 md:mb-6">
              OUR
              <br />
              <span className="text-primary">PROJECTS</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl">
              Experience our portfolio of luxury villas, each meticulously crafted with precision and artistic vision.
            </p>
          </motion.div>

          {/* Right side - Project selector and action buttons */}
          <motion.div
            variants={magazineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <Select onValueChange={(value) => setSelectedProject(value)} defaultValue={selectedProject}>
              <SelectTrigger className="w-full max-w-[320px] ml-auto">
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
            <div className="flex gap-4 justify-end">
              {/* Preview button */}
              <button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 md:px-4 py-2 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300"
                onClick={() => setShowVideoPreview(!showVideoPreview)}
              >
                Preview
              </button>

              {/* Details button */}
              <button 
                onClick={() => {
                  const navigationElement = document.querySelector('[role="tablist"]') || 
                                          document.querySelector('.border-b-2') ||
                                          document.querySelector('.flex.justify-center.overflow-x-auto');
                  if (navigationElement) {
                    navigationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-3 md:px-4 py-2 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300"
              >
                Details
              </button>
            </div>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">{/* Content wrapper */}

        <div className="mb-6 md:mb-8 lg:mb-12">
          <nav className="flex justify-center overflow-x-auto">
            <div className="border-b-2 flex min-w-max">
              {categoryOrder.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`py-2 md:py-3 lg:py-3 px-2 md:px-4 lg:px-5 text-xs sm:text-sm md:text-sm lg:text-base font-medium rounded-none whitespace-nowrap ${
                    selectedCategory === category
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentImageIndex(null);
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </nav>
        </div>
        {selectedCategory === "Location and layout" ? (
          <div className="flex flex-wrap justify-center gap-4">
            {currentProjectData["Location and layout"]?.map((project, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg shadow-lg overflow-hidden w-full md:w-1/2 lg:w-1/3"
              >
                {project.type === "map" ? (
                  <div className="relative w-full h-60 group">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.0534597203205!2d78.3265527!3d17.3611604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9500700340b9%3A0x55a866128dbfe12c!2sSaridena%20Lakewoods!5e0!3m2!1sen!2sin!4v1754636342761!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="pointer-events-none"
                    ></iframe>
                    <a
                      href="https://www.google.com/maps/search/Saridena+Lakewoods,+Gandipet,+Hyderabad" // Replace with actual LakeWoods Villas link if different
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      View in Larger Map
                    </a>
                  </div>
                ) : (
                  <ImageLoader
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 md:h-56 lg:h-60 high-quality-image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setCurrentImageIndex(index)}
                    loading={index < 3 ? "eager" : "lazy"}
                    style={{ imageRendering: 'auto' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
            }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent>
              {currentProjectData[selectedCategory]?.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-lg shadow-lg overflow-hidden image-container"
                    >
                      <ImageLoader
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 md:h-56 lg:h-60 high-quality-image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setCurrentImageIndex(index)}
                        loading={index < 3 ? "eager" : "lazy"}
                        style={{ imageRendering: 'auto' }}
                      />
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        <div className="mb-8 md:mb-10 lg:mb-12 mt-8 md:mt-10 lg:mt-12">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-center mb-6 md:mb-8">
            Project View
          </h3>
          <nav className="flex justify-center">
            <div className="border-b-2">
              <Button
                variant="ghost"
                className={`py-2 md:py-2 lg:py-3 px-3 md:px-4 lg:px-5 text-xs md:text-sm lg:text-base font-medium rounded-none ${
                  selectedProjectTab === "Project specification"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setSelectedProjectTab("Project specification")}
              >
                Project specification
              </Button>
              <Button
                variant="ghost"
                className={`py-2 md:py-2 lg:py-3 px-3 md:px-4 lg:px-5 text-xs md:text-sm lg:text-base font-medium rounded-none ${
                  selectedProjectTab === "Amenities"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setSelectedProjectTab("Amenities")}>
                Amenities
              </Button>
            </div>
          </nav>
        </div>

        {selectedProjectTab === "Project specification" && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold">Project Specification Details</h3>
            <p className="mt-2 text-muted-foreground">
              Details about the project specifications will go here.
            </p>
          </div>
        )}

        {selectedProjectTab === "Amenities" && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold">Amenities Available</h3>
            <p className="mt-2 text-muted-foreground">
              Information about the amenities will be listed here.
            </p>
          </div>
        )}

        <AnimatePresence>
          {currentImageIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCurrentImageIndex(null)}
            >
              <motion.img
                src={currentProjectData[selectedCategory]?.[currentImageIndex]?.image}
                alt={currentProjectData[selectedCategory]?.[currentImageIndex]?.name}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain cursor-pointer high-quality-image"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
                loading="eager"
                decoding="async"
                style={{ imageRendering: 'auto' }}
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(null);
                }}
                aria-label="Close fullscreen image"
              >
                &times;
              </button>
              <button
                className="absolute left-4 text-white text-5xl font-bold p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0
                      ? (currentProjectData[selectedCategory]?.length || 0) - 1
                      : (prevIndex as number) - 1
                  );
                }}
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                className="absolute right-4 text-white text-5xl font-bold p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === (currentProjectData[selectedCategory]?.length || 0) - 1
                      ? 0
                      : (prevIndex as number) + 1
                  );
                }}
                aria-label="Next image"
              >
                &#8250;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </div>{/* End content wrapper */}
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
                <h3 className="font-semibold">{selectedProject}</h3>
                <p className="text-sm opacity-80">Project Preview</p>
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