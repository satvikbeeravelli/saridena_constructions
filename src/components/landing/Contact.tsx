import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function Contact() {
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

  const magazineVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }
  };

  return (
    <motion.section 
      id="contact" 
      className="py-12 md:py-24 bg-muted/30"
      ref={sectionRef}
    >
      <div className="container px-4">
        {/* Magazine-style header */}
        <motion.div
          className="mb-12 md:mb-20 text-center"
          variants={magazineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            GET IN
            <br />
            <span className="text-primary">TOUCH</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Ready to transform your architectural dreams into reality? Let's start the conversation about your perfect villa.
          </p>
        </motion.div>

        {/* Magazine-style contact grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start max-w-6xl mx-auto">
          <motion.div 
            className="p-8 md:p-12 rounded-lg shadow-2xl border-2 border-border/20 bg-card/80 backdrop-blur-lg hover:shadow-3xl transition-all duration-500"
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">SEND US A MESSAGE</h3>
            <form className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Project Inquiry" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your project..." rows={5} className="mt-1" />
              </div>
              <Button type="submit" className="w-full text-lg py-3 font-semibold">
                SUBMIT INQUIRY
              </Button>
            </form>
          </motion.div>

          <motion.div 
            className="p-8 md:p-12 rounded-lg shadow-2xl border-2 border-border/20 bg-card/80 backdrop-blur-lg hover:shadow-3xl transition-all duration-500"
            variants={infoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">CONTACT INFO</h3>
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg md:text-xl mb-1">Email Us</p>
                  <a href="mailto:info@saridena.com" className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors">info@saridena.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg md:text-xl mb-1">Call Us</p>
                  <a href="tel:+1234567890" className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <MapPin className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-lg md:text-xl mb-1">Visit Our Office</p>
                  <address className="not-italic text-base md:text-lg text-muted-foreground">
                    4th Floor, <br />
                    Hyndava Techno Park <br />
                    Hyderabad, Telangana, India
                  </address>
                  <div className="mt-6 w-full h-40 md:h-48 overflow-hidden rounded-lg border-2 shadow-lg relative group">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.364132382749!2d78.37205527578001!3d17.44227730122031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb930075c2b685%3A0x5bc8df8a8dd5561b!2sSaridena%20Constructions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1754119943453!5m2!1sen!2sin"
                      className="w-full h-full pointer-events-none"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <a
                      href="https://maps.app.goo.gl/6rtDxSb5oQHDvC4q7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm md:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      View in Larger Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 pt-8 border-t border-border/20">
              <h4 className="text-xl md:text-2xl font-bold mb-6">BUSINESS HOURS</h4>
              <p className="text-lg md:text-xl text-muted-foreground mb-2">Monday - Saturday: 9:30 AM - 6:00 PM</p>
              <p className="text-lg md:text-xl text-muted-foreground">Sunday: Closed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
