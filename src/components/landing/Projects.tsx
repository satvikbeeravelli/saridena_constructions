import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Interior");
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  }, [selectedCategory, carouselApi]);

  const projects: Record<Category, Project[]> = {
    Interior: [
      { name: "Modern Living Room", image: "src/photos/interior/1.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/2.png" },
      { name: "Sleek Kitchen", image: "src/photos/interior/3.png" },
      { name: "Modern Living Room", image: "src/photos/interior/4.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/5.png" },
      { name: "Sleek Kitchen", image: "src/photos/interior/6.png" },
      { name: "Modern Living Room", image: "src/photos/interior/7.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/8.png" },
      { name: "Sleek Kitchen", image: "src/photos/interior/9.png" },
      { name: "Modern Living Room", image: "src/photos/interior/10.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/11.png" },
      { name: "Sleek Kitchen", image: "src/photos/interior/12.png" },
      { name: "Modern Living Room", image: "src/photos/interior/13.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/14.png" },
      { name: "Sleek Kitchen", image: "src/photos/interior/15.png" },
      { name: "Modern Living Room", image: "src/photos/interior/16.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/17.png" },
      { name: "Sleek Kitchen", image: "src/photos/interior/18.png" },
      { name: "Modern Living Room", image: "src/photos/interior/19.png" },
      { name: "Cozy Bedroom", image: "src/photos/interior/20.jpg" },
    ],
    Exterior: [
      { name: "Contemporary Villa", image: "src/photos/exterior/7.png" },
      { name: "Beachfront Residence", image: "src/photos/exterior/1.jpg" },
      { name: "Mountain Chalet", image: "src/photos/exterior/2.jpg" },
      { name: "Contemporary Villa", image: "src/photos/exterior/3.png" },
      { name: "Beachfront Residence", image: "src/photos/exterior/4.jpg" },
      { name: "Mountain Chalet", image: "src/photos/exterior/5.jpg" },
      { name: "Contemporary Villa", image: "src/photos/exterior/6.jpg" },
    ],
    "Floor Plan": [
      { name: "Open-Concept Floor Plan", image: "src/photos/floorplan/1.jpg" },
      { name: "Two-Story House Blueprint", image: "src/photos/floorplan/2.jpg" },
      { name: "Apartment Layout", image: "src/photos/floorplan/3.jpg" },
      { name: "Open-Concept Floor Plan", image: "src/photos/floorplan/4.jpg" },
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
              {(Object.keys(projects) as Category[]).map((category) => (
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
        <AnimatePresence>
          {currentImageIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={projects[selectedCategory][currentImageIndex].image}
                alt="Fullscreen"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              />
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={() => setCurrentImageIndex(null)}
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