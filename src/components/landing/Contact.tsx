import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } }
  };

  return (
    <motion.section 
      id="contact" 
      className="py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready to discuss your dream villa? Contact us today for a consultation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="p-8 rounded-lg shadow-lg border border-border/20 bg-card/50 backdrop-blur-lg"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@example.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" type="text" placeholder="Project Inquiry" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your project..." rows={5} />
              </div>
              <Button type="submit" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </motion.div>

          <motion.div 
            className="p-8 rounded-lg shadow-lg border border-border/20 bg-card/50 backdrop-blur-lg flex flex-col justify-between"
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <a href="mailto:info@saridena.com" className="text-muted-foreground hover:text-primary transition-colors">info@saridena.com</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Visit Our Office</p>
                    <address className="not-italic text-muted-foreground">
                      4th Floor, <br />
                      Hyndava Techno Park <br />
                      Hyderabad, Telangana, India
                    </address>
                    <div className="mt-4 w-full h-32 overflow-hidden rounded-lg border shadow-sm relative group">
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
                        className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View in Larger Map
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">Business Hours</h4>
              <p className="text-muted-foreground">Monday - Saturday: 9:30 AM - 6:00 PM</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
