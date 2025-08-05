import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionTitle } from "./SectionTitle";
import { HardHat, Home, DraftingCompass, Wrench, Building, Lightbulb } from "lucide-react";

const services = [
  {
    icon: <Home className="h-10 w-10 text-accent" />,
    title: "Custom Villa Construction",
    description: "From foundation to finish, we build bespoke villas tailored to your unique lifestyle and preferences.",
  },
  {
    icon: <DraftingCompass className="h-10 w-10 text-accent" />,
    title: "Architectural Design",
    description: "Our in-house architects collaborate with you to create stunning, functional, and timeless designs.",
  },
  {
    icon: <HardHat className="h-10 w-10 text-accent" />,
    title: "Project Management",
    description: "We provide end-to-end project oversight, ensuring your project is on time, on budget, and to the highest quality.",
  },
  {
    icon: <Wrench className="h-10 w-10 text-accent" />,
    title: "Renovations & Remodeling",
    description: "Transform your existing space with our expert renovation services, from minor updates to complete overhauls.",
  },
  {
    icon: <Building className="h-10 w-10 text-accent" />,
    title: "Sustainable Building",
    description: "Implementing eco-friendly practices and materials for energy-efficient and environmentally responsible constructions.",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-accent" />,
    title: "Smart Home Integration",
    description: "Integrating cutting-edge smart home technologies for enhanced comfort, security, and efficiency.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function Services() {
  return (
    <section id="services">
      <div className="container lg:w-3/4">
        <SectionTitle
          subtitle="Our Expertise"
          title="Comprehensive Construction Services"
          description="We offer a full spectrum of services to bring your vision to life, ensuring quality and excellence at every stage of the process."
        />
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full text-center pt-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader className="items-center">
                  <div className="bg-accent/10 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription className="pt-2">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
