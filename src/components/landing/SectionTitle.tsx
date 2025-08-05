import { motion } from "framer-motion";

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description: string;
  className?: string;
}

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function SectionTitle({ subtitle, title, description, className }: SectionTitleProps) {
  return (
    <motion.div 
      className={`text-center mb-12 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h3 
        className="text-lg font-semibold text-accent mb-2"
        variants={itemVariants}
      >
        {subtitle}
      </motion.h3>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <motion.p 
        className="max-w-3xl mx-auto text-muted-foreground"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
