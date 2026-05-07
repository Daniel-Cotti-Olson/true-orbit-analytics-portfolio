import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Target } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-20 px-8 border-t border-white/5 bg-indigo-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <Target className="text-gold" size={24} />
              </div>
              <div>
                <span className="text-2xl font-black gold-gradient block tracking-tighter uppercase leading-none">True Orbit</span>
                <span className="text-sm font-medium text-white/60 tracking-[0.3em] uppercase">Analytics</span>
              </div>
            </div>
          </div>
          <p className="text-white/50 max-w-sm leading-relaxed mb-8">
            Elite data intelligence and strategic reporting for ambitious enterprises. We transform your raw data into decisive action.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><Link href="#services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link href="#portfolio" className="hover:text-gold transition-colors">Case Study</Link></li>
            <li><Link href="#contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gold" />
              contact@trueorbitanalytics.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-gold" />
              Remote Nationwide
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
        <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em]">
          © 2026 True Orbit Analytics. Elite Data Analysis & Strategic Insights.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
