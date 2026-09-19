import React from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function EducationCerts() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-butter dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap size={14} />
            <span>Pendidikan & Kredensial</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Fondasi Akademik & Sertifikasi Profesional
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Kombinasi gelar sarjana ilmu komputer dan sertifikasi spesialisasi yang terus diperbarui.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Education Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5 mb-2">
              <BookOpen className="text-indigo-600 dark:text-indigo-400" size={20} />
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Riwayat Akademik
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-pastel-lavender-light dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {idx === 0 ? 'Perguruan Tinggi' : 'Pendidikan Vokasi'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Calendar size={13} />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-2">
                    {edu.institution}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    {edu.degree}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
                    <MapPin size={13} className="text-rose-400" />
                    <span>{edu.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Certifications Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <Award className="text-rose-500" size={20} />
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Sertifikasi & Lisensi Resmi
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {certifications.length} Sertifikat Terverifikasi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-pastel-sm hover:shadow-pastel-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cert.badgeColor}`}>
                        {cert.category}
                      </span>
                      <Sparkles size={14} className="text-amber-400" />
                    </div>

                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                      {cert.title}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="truncate">{cert.issuer}</span>
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
