import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

type Category = "Interior" | "Exterior" | "Floor Plan" | "Location and layout";
type ProjectTab = "Project specification" | "Amenities";

interface Project {
  name: string;
  image: string;
}

const categoryOrder: Category[] = ["Location and layout", "Exterior", "Floor Plan", "Interior"];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Location and layout");
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedProjectTab, setSelectedProjectTab] = useState<ProjectTab>("Project specification");

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  }, [selectedCategory, carouselApi]);

  const projects: Record<Category, Project[]> = {
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
      { name: "Open-Concept Floor Plan", image: "/saridena_constructions/photos/floorplan/1.jpg" },
      { name: "Two-Story House Blueprint", image: "/saridena_constructions/photos/floorplan/2.jpg" },
      { name: "Apartment Layout", image: "/saridena_constructions/photos/floorplan/3.jpg" },
      { name: "Open-Concept Floor Plan", image: "/saridena_constructions/photos/floorplan/4.jpg" },
    ],
    "Location and layout": [
      { name: "Contemporary Villa", image: "/saridena_constructions/photos/exterior/7.png" },
      { name: "Beachfront Residence", image: "/saridena_constructions/photos/exterior/1.jpg" },
      { name: "Mountain Chalet", image: "/saridena_constructions/photos/exterior/2.jpg" },
      { name: "Contemporary Villa", image: "/saridena_constructions/photos/exterior/3.png" },
      { name: "Beachfront Residence", image: "/saridena_constructions/photos/exterior/4.jpg" },
      { name: "Mountain Chalet", image: "/saridena_constructions/photos/exterior/5.jpg" },
      { name: "Contemporary Villa", image: "/saridena_constructions/photos/exterior/6.jpg" },
    ],
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

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
        <Carousel
          opts={{
            align: "start",
          }}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent>
            {projects[selectedCategory].map((project, index) => (
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
                onClick={() => setSelectedProjectTab("Amenities")}
              >
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
                src={projects[selectedCategory][currentImageIndex].image}
                alt={projects[selectedCategory][currentImageIndex].name}
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
                      ? projects[selectedCategory].length - 1
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
                    prevIndex === projects[selectedCategory].length - 1
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