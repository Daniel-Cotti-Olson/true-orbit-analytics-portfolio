"use client";

import { 
  TrendingUp, 
  Search, 
  Target,
  Mail,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    title: "Sales Trend Snapshot",
    description: "A meticulous analysis of your sales data to identify overall trends and key performance indicators (KPIs). Perfect for a high-level health check of your business.",
    icon: TrendingUp,
    deliverable: "1-page PDF report with key metrics and visualization"
  },
  {
    title: "Deep Dive Insights",
    description: "An in-depth analysis including product performance and customer segmentation to identify strategic growth opportunities.",
    icon: Search,
    deliverable: "3-5 page detailed analysis with actionable insights"
  },
  {
    title: "Strategic Growth Plan",
    description: "A comprehensive financial analysis with a forward-looking strategic plan to help you make elite, long-term decisions.",
    icon: Target,
    deliverable: "5-10 page report, advanced metrics, and a strategy session"
  },
];

export default function Home() {
  const [hoveredContact, setHoveredContact] = useState<boolean>(false);
const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-indigo-luxury text-white selection:bg-gold selection:text-indigo-950" style={{paddingTop: "60px"}}>

        {/* Logo Banner */}
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1e1b4b",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
          paddingBottom: "1.5rem",
        }}>
          <img
            src="/logo.svg"
            alt="True Orbit Logo"
            style={{width: "100%", maxWidth: "700px", padding: "1.5rem"}}
          />
          <div style={{
            color: "#D4AF37",
            fontSize: "clamp(0.6rem, 2vw, 1rem)",
            fontWeight: 900,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            padding: "0.5rem 2rem",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: "9999px",
            backgroundColor: "rgba(212,175,55,0.1)",
          }}>
            Elite Data Management & Strategic Insights
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tighter uppercase"
            >
              <span className="gold-gradient">Transform Your Data</span> <br />
              <span className="gold-gradient">Into Decisions</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 mb-14 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Professional data analysis and strategic reporting to solve your most complex business challenges with precision and clarity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full max-w-4xl aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative"
            >
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/1ASpWpeZJMA?si=N9TVM2Qjh3JX9Q8V&amp;controls=0" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-40 px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-24">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
                Expert Data <br />
                <span className="gold-gradient">Services</span>
              </h2>
              <div className="w-24 h-1.5 bg-gold rounded-full mb-8"></div>
              <p className="text-white/60 text-xl max-w-2xl font-medium">We provide the technical foundation your business needs to scale with confidence through data-backed intelligence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-40 px-8 relative overflow-hidden bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center lg:justify-end z-20"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative z-30 rounded-[2rem] overflow-hidden border border-white/10 w-full max-w-[400px] aspect-[4/5] shadow-2xl bg-white/5"
                >
                  <img 
                    src="/Sales_Analysis_Report.png" 
                    alt="Sales Analysis Report Preview" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/20 blur-[100px] rounded-full z-10"></div>
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full z-10"></div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
                  Elite <br />
                  <span className="gold-gradient">Case Study</span>
                </h2>
                <h3 className="text-3xl font-black mb-6 text-white uppercase tracking-tight">Project "Clarity"</h3>
                <p className="text-white/60 text-xl md:text-2xl mb-16 leading-relaxed font-medium">
                  <strong>The Challenge:</strong> A growing enterprise was "drowning in data," with thousands of sales records but no way to interpret weekly performance. <br /><br />
                  <strong>Our Solution:</strong> We performed a comprehensive deep-dive analysis, identifying hidden patterns and seasonal trends to generate executive intelligence reports. <br /><br />
                  <strong>The Result:</strong> Actionable intelligence delivered every Monday morning, enabling rapid decisions on inventory and strategy.
                </p>
                
                <a 
                  href="/Sales_Analysis_Report.pdf" 
                  target="_blank"
                  className="inline-flex items-center gap-4 bg-gold text-indigo-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gold-light hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all uppercase tracking-widest"
                >
                  View Full Report <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-40 px-8 relative overflow-hidden bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 relative z-10 text-left">
            <div>
              <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.85]">
                Secure Your <br />
                <span className="gold-gradient">Financial Future</span>
              </h2>
              <p className="text-white/60 text-2xl mb-16 leading-relaxed font-medium">
                Ready to orbit your business to new heights? Contact us today for a free initial consultation and discovery call.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-start gap-4 w-full">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-2xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-2">Email Us</p>
                    <a href="mailto:contact@trueorbitanalytics.com" className="text-xl md:text-2xl font-black text-gold hover:text-gold-light transition-colors underline">
                      contact@trueorbitanalytics.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="text-gold text-6xl mb-6">✓</div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Intelligence Received</h3>
                <p className="text-white/60 text-xl">We'll be in touch shortly to discuss your data strategy.</p>
              </div>
            ) : (
              <motion.form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/10 space-y-10 shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
              >
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.3em] ml-1">First Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-gold outline-none transition-all text-white text-lg font-medium" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black text-white/30 uppercase tracking-[0.3em] ml-1">Last Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-gold outline-none transition-all text-white text-lg font-medium" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.3em] ml-1">Business Email</label>
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-gold outline-none transition-all text-white text-lg font-medium" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.3em] ml-1">Service Interest</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-gold outline-none transition-all text-white/40 text-lg font-medium appearance-none">
                    <option>Select a Service</option>
                    <option>Sales Trend Snapshot</option>
                    <option>Deep Dive Insights</option>
                    <option>Strategic Growth Plan</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-white/30 uppercase tracking-[0.3em] ml-1">Message</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:border-gold outline-none transition-all text-white text-lg font-medium"></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold text-indigo-950 py-7 rounded-3xl font-black text-xl hover:bg-gold-light hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all uppercase tracking-widest"
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
