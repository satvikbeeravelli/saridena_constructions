import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "Interior" | "Exterior" | "Floor Plan" | "Location and layout" | "3D Model";
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
    "3D Model": [
      { name: "LakeWoods Villas 3D Model", image: "", type: "model", model: "https://your-aws-s3-bucket.s3.amazonaws.com/model.glb" }
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

const categoryOrder: Category[] = ["Location and layout", "Exterior", "Floor Plan", "Interior", "3D Model"];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ModelViewer = ({ modelUrl }: { modelUrl: string }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen();
    }
  };

  if (timeLeft === 0) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold">Session Expired</h3>
        <p className="mt-2 text-muted-foreground">
          Your 3D model viewing session has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96">
      <iframe
        ref={iframeRef}
        src={`https://3d-viewer.com?model=${modelUrl}`} // Placeholder viewer URL
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded">
        Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      <div className="absolute bottom-2 right-2">
        <Button onClick={handleFullscreen}>View in Fullscreen</Button>
      </div>
    </div>
  );
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string>("LakeWoods Villas");
  const [selectedCategory, setSelectedCategory] = useState<Category>("Location and layout");
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedProjectTab, setSelectedProjectTab] = useState<ProjectTab>("Project specification");

  const currentProjectData = allProjects[selectedProject];

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
      className="py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="container lg:w-3/4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Demo Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our expertise in interior, exterior, and layout design.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <Select onValueChange={(value) => setSelectedProject(value)} defaultValue={selectedProject}>
            <SelectTrigger className="w-[280px]">
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
        </div>

        <div className="mb-12">
          <nav className="flex justify-center">
            <div className="border-b-2">
              {categoryOrder.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`py-4 px-6 text-lg font-medium rounded-none ${
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
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-60 object-fill"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setCurrentImageIndex(index)}
                    loading="lazy"
                  />
                )}
              </motion.div>
            ))}
          </div>
        ) : selectedCategory === "3D Model" ? (
          <div className="flex justify-center">
            {currentProjectData["3D Model"]?.map((project, index) => (
              <div key={index} className="w-full">
                {project.model && <ModelViewer modelUrl={project.model} />}
              </div>
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
                      className="rounded-lg shadow-lg overflow-hidden"
                    >
                      <motion.img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-60 object-fill"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setCurrentImageIndex(index)}
                        loading="lazy"
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

        <div className="mb-12 mt-12">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-center mb-8">
            Project View
          </h3>
          <nav className="flex justify-center">
            <div className="border-b-2">
              <Button
                variant="ghost"
                className={`py-4 px-6 text-lg font-medium rounded-none ${
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
                className={`py-4 px-6 text-lg font-medium rounded-none ${
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
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
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
      </div>
    </motion.section>
  );
}