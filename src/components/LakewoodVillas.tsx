import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, Home, MapPin, Bed, Square, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLoader } from "@/components/ImageLoader";

type Category = "Interior" | "Exterior" | "Floor Plan" | "Location and layout" | "Isometric View";

interface ProjectItem {
  name: string;
  image: string;
  type?: string;
  model?: string;
}

const categoryOrder: Category[] = ["Location and layout", "Exterior", "Floor Plan", "Interior", "Isometric View"];

// Exact same data structure as in Projects.tsx for LakeWoods Villas
const lakewoodProjectData: Record<Category, ProjectItem[]> = {
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
    { name: "LakeWoods Villas Map", image: "map_iframe", type: "map" },
  ],
  "Isometric View": [
    { name: "Isometric View - Building Layout", image: "/saridena_constructions/photos/isometric/1.jpg" },
    { name: "Isometric View - Design Perspective", image: "/saridena_constructions/photos/isometric/2.jpg" },
    { name: "Isometric View - Overview", image: "/saridena_constructions/photos/isometric/3.jpg" }
  ],
};

export function LakewoodVillas() {
  const [isInView, setIsInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("Location and layout");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; index: number } | null>(null);
  const [currentImages, setCurrentImages] = useState<ProjectItem[]>([]);

  useEffect(() => {
    setIsInView(true);
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToProjects = () => {
    // Navigate back to projects section using custom event
    const event = new CustomEvent('navigateToHome');
    window.dispatchEvent(event);
  };

  const handleViewOnMaps = (e: React.MouseEvent) => {
    e.preventDefault();
    // Switch to Location and layout tab
    setSelectedCategory("Location and layout");
    // Scroll to gallery section
    const gallerySection = document.getElementById('project-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const openLightbox = (image: string, alt: string, index: number) => {
    setSelectedImage({ src: image, alt, index });
    setCurrentImages(lakewoodProjectData[selectedCategory] || []);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage || !currentImages.length) return;
    
    const currentIndex = selectedImage.index;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
    } else {
      newIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newImage = currentImages[newIndex];
    setSelectedImage({ src: newImage.image, alt: newImage.name, index: newIndex });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, selectedImage]);

  const projectDetails = {
    name: "LakeWoods Villas",
    location: "Near Mrugavani National Park & Osman Sagar",
    type: "Ultra-Luxury Triplex Villas",
    status: "Exclusive Development",
    completionDate: "Premium Community",
    totalUnits: "29 Ultra-Luxury Villas",
    priceRange: "Ultra-Premium",
    specifications: {
      plotArea: "945 to 1,360 sq.yd",
      builtUpArea: "9,550 to 11,150 sq.ft",
      villaType: "Triplex Villas",
      vaastu: "100% Compliant",
      design: "No Shared Walls",
      privacy: "No Villa Faces Another"
    }
  };

  const amenities = [
    "25,000 sq.ft. Clubhouse",
    "Private Guest Rooms",
    "Amphitheatre",
    "Wellness Spaces",
    "Jogging Trails",
    "Pickleball Courts",
    "Green Zones",
    "24x7 Premium Security",
    "Eco-Smart Living",
    "Vaastu Compliant Design",
    "High Ceilings & Open Terraces",
    "Spatial Intelligence Design"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <motion.div
        className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50 hover:bg-background transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={handleBackToProjects}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
            
            {/* Centered Lakewoods Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <ImageLoader
                src="/saridena_constructions/photos/lakewoods_logo.jpg"
                alt="Lakewoods Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Empty space for balance */}
            <div className="w-32"></div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="relative h-[70vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <ImageLoader
            src="/saridena_constructions/photos/exterior/1.jpg"
            alt="Lakewood Villas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            className="text-center text-white max-w-4xl px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 font-heading">
              LAKEWOODS
              <br />
              <span className="text-primary">VILLAS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-content">
              A rare composition of earth, light, and intent
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-content">
              <MapPin className="h-5 w-5" />
              <span>{projectDetails.location}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center mb-16"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 font-heading">
                  WHY CHOOSE
                  <br />
                  <span className="text-primary">US?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-content">
                  LakeWoods Villas is not just a development, it's a rare composition of earth, light, and intent. 
                  With just 29 ultra-luxury triplex villas, this estate is not for the crowd. It isn't promoted. 
                  It isn't pushed. It doesn't call attention; it commands awareness.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-content">
                  Each villa is built on plots ranging from 945 to 1,360 sq. yd. with a super built-up area between 
                  9,550 and 11,150 sq. ft. Surrounded by the natural cover of Mrugavani National Park and the peaceful 
                  stretch of Osman Sagar, LakeWoods merges nature and design with effortless clarity.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed font-content">
                  100% Vaastu compliant, the homes are designed with vast open terraces, high ceilings, no shared walls, 
                  and spatial intelligence that creates privacy without walls. The question isn't "why here?" 
                  It's "are you meant to be here?"
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-primary/5 p-6 rounded-lg hover:bg-primary/15 hover:shadow-lg transition-all duration-300">
                  <Home className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground font-content">Total Villas</p>
                  <p className="text-xl font-bold font-content">{projectDetails.totalUnits}</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg hover:bg-primary/15 hover:shadow-lg transition-all duration-300">
                  <Calendar className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground font-content">Villa Type</p>
                  <p className="text-xl font-bold font-content">{projectDetails.specifications.villaType}</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg hover:bg-primary/15 hover:shadow-lg transition-all duration-300">
                  <Square className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground font-content">Plot Area</p>
                  <p className="text-xl font-bold font-content">{projectDetails.specifications.plotArea}</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg hover:bg-primary/15 hover:shadow-lg transition-all duration-300">
                  <Bed className="h-8 w-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground font-content">Built-up Area</p>
                  <p className="text-xl font-bold font-content">{projectDetails.specifications.builtUpArea}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation and Gallery - Exact copy from Projects.tsx */}
            <motion.div
              id="project-gallery"
              className="mb-16"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-heading">
                PROJECT GALLERY
              </h3>
              
              {/* Navigation Tabs - Exact copy from Projects.tsx */}
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
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Gallery Content - Collage style layout */}
              {selectedCategory === "Location and layout" ? (
                <div className="grid grid-cols-12 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                  {lakewoodProjectData["Location and layout"]?.map((project, index) => {
                    // Create collage pattern with varied sizes
                    const getColSpan = (index: number) => {
                      const patterns = [
                        'col-span-8', 'col-span-4', 'col-span-5', 'col-span-7',
                        'col-span-6', 'col-span-6', 'col-span-4', 'col-span-8'
                      ];
                      return patterns[index % patterns.length];
                    };
                    
                    const getRowSpan = (index: number) => {
                      const patterns = [
                        'row-span-2', 'row-span-1', 'row-span-1', 'row-span-1',
                        'row-span-1', 'row-span-2', 'row-span-2', 'row-span-1'
                      ];
                      return patterns[index % patterns.length];
                    };

                    return (
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`rounded-lg shadow-lg overflow-hidden group ${getColSpan(index)} ${getRowSpan(index)}`}
                      >
                        {project.type === "map" ? (
                          <div className="relative w-full h-full">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1904.0092653797528!2d78.32458454996164!3d17.36284131174712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95007f4f624f%3A0x6ce54ab1b762e7c5!2sLakeWoods%20Villas!5e0!3m2!1sen!2sin!4v1754996807271!5m2!1sen!2sin"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              className="pointer-events-none"
                            ></iframe>
                            <a
                              href="https://www.google.com/maps/place/LakeWoods+Villas/@17.36284131174712,78.32458454996164,17z"
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
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                            loading={index < 6 ? "eager" : "lazy"}
                            style={{ imageRendering: 'auto' }}
                            onClick={() => openLightbox(project.image, project.name, index)}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                  {lakewoodProjectData[selectedCategory]?.map((project, index) => {
                    // Create collage pattern with varied sizes
                    const getColSpan = (index: number) => {
                      const patterns = [
                        'col-span-6', 'col-span-6', 'col-span-4', 'col-span-8',
                        'col-span-5', 'col-span-7', 'col-span-3', 'col-span-9',
                        'col-span-8', 'col-span-4', 'col-span-6', 'col-span-6',
                        'col-span-7', 'col-span-5', 'col-span-4', 'col-span-8'
                      ];
                      return patterns[index % patterns.length];
                    };
                    
                    const getRowSpan = (index: number) => {
                      const patterns = [
                        'row-span-1', 'row-span-2', 'row-span-1', 'row-span-1',
                        'row-span-2', 'row-span-1', 'row-span-2', 'row-span-1',
                        'row-span-1', 'row-span-2', 'row-span-1', 'row-span-1',
                        'row-span-1', 'row-span-2', 'row-span-1', 'row-span-1'
                      ];
                      return patterns[index % patterns.length];
                    };

                    return (
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`rounded-lg shadow-lg overflow-hidden group ${getColSpan(index)} ${getRowSpan(index)}`}
                      >
                        <ImageLoader
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                          loading={index < 8 ? "eager" : "lazy"}
                          style={{ imageRendering: 'auto' }}
                          onClick={() => openLightbox(project.image, project.name, index)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Specifications */}
            <motion.div
              className="bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg mb-16 hover:bg-white hover:shadow-2xl transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-heading">
                VILLA SPECIFICATIONS
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(projectDetails.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium capitalize font-content">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="text-primary font-semibold font-content">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Features */}
            <motion.div
              className="bg-primary/5 p-8 md:p-12 rounded-lg shadow-lg mb-16 hover:bg-primary/15 hover:shadow-2xl transition-all duration-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-heading">
                EXCLUSIVE COMMUNITY
              </h3>
              <div className="prose prose-lg max-w-4xl mx-auto text-center">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-content">
                  The community is integrated with a 25,000 sq. ft. clubhouse, private guest rooms, amphitheatre, 
                  wellness spaces, jogging trails, pickleball courts, and green zones that breathe with the architecture.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-content">
                  <strong>No villa faces another.</strong> Every detail, from the air you breathe to the way the sun 
                  enters your home, is intentional. This is not about banners or billboards. LakeWoods does not exist 
                  in the usual real estate ecosystem.
                </p>
                <p className="text-lg text-primary font-semibold font-content">
                  It's not designed to attract, it's designed to awaken. Do you belong here?
                </p>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-heading">
                WORLD-CLASS AMENITIES
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <motion.div
                    key={amenity}
                    className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/15 hover:shadow-md transition-all duration-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm md:text-base font-content">{amenity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-primary/5 hover:bg-primary/10 transition-all duration-300"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-4xl font-bold mb-6 font-heading">
              Are You Meant to Be Here?
            </h3>
            <p className="text-lg text-muted-foreground mb-4 font-content">
              Featured Project: LakeWoods Villas
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mb-8 max-w-3xl mx-auto font-content">
              <div className="space-y-2">
                <p className="flex items-center gap-2"><span>🏡</span> Ultra-Luxury Triplex Villas</p>
                <p className="flex items-center gap-2"><span>📏</span> 945 to 1,360 sq.yd plots | 9,550 to 11,150 sq.ft homes</p>
                <p className="flex items-center gap-2"><span>📍</span> Near Mrugavani National Park & Osman Sagar</p>
                <p className="flex items-center gap-2"><span>🔐</span> Premium Community with 24x7 Security</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2"><span>🏛</span> 25,000 sq.ft Clubhouse | Private Guest Rooms</p>
                <p className="flex items-center gap-2"><span>🔋</span> Eco-Smart Living</p>
                <p className="flex items-center gap-2"><span>🧿</span> 100% Vaastu Compliant Design</p>
                <p className="flex items-center gap-2"><span>🎓</span> Close to top international schools & hospitals</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleViewOnMaps}>
                <span className="flex items-center gap-2">
                  📍 View on Google Maps
                </span>
              </Button>
              <Button size="lg" variant="outline" onClick={handleBackToProjects}>
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-60"
          >
            <X size={32} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60"
          >
            <ChevronLeft size={48} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60"
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-lg font-medium">{selectedImage.alt}</p>
              <p className="text-sm opacity-75">
                {selectedImage.index + 1} of {currentImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
