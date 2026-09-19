import React from 'react';
import { 
  Heart, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUp, 
  Sparkles 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/80 dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 pt-16 pb-12 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100 dark:border-slate-800 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-400 flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
                DZ
              </div>
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {personal.fullName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Full Stack & Mobile Developer dengan komitmen pada kode bersih, skalabilitas performa, dan desain yang menginspirasi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors"
                title="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/dandyzain"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#about" className="hover:text-indigo-600 transition-colors">Tentang Saya</a></li>
              <li><a href="#experience" className="hover:text-indigo-600 transition-colors">Pengalaman Kerja</a></li>
              <li><a href="#skills" className="hover:text-indigo-600 transition-colors">Keahlian Teknis</a></li>
              <li><a href="#projects" className="hover:text-indigo-600 transition-colors">Portofolio Proyek</a></li>
              <li><a href="#education" className="hover:text-indigo-600 transition-colors">Edukasi & Sertifikasi</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 transition-colors">Hubungi Saya</a></li>
            </ul>
          </div>

          {/* Direct WhatsApp CTA & Back to Top (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Konsultasi Cepat
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ingin berdiskusi langsung perihal ketersediaan proyek atau jadwal wawancara?
            </p>
            <a
              href={`https://wa.me/${personal.rawPhone}?text=Halo%20Dandy,%20saya%20tertarik%20bekerja%20sama.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Chat via WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} Dandy Rahmat Zain. Dibuat dengan React.js & Tailwind CSS (Pastel Edition).
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-semibold"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
