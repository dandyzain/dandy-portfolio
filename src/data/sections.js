// Page sections in order. `nav` = label key in uiCopy.nav; `inNav` = shown in the top bar.
export const SECTIONS = [
  { id: 'about', index: '01', nav: 'about', inNav: true },
  { id: 'experience', index: '02', nav: 'experience', inNav: true },
  { id: 'skills', index: '03', nav: 'skills', inNav: false },
  { id: 'projects', index: '04', nav: 'work', inNav: true },
  { id: 'education', index: '05', nav: 'credentials', inNav: true },
  { id: 'contact', index: '06', nav: 'contact', inNav: true },
];

export const SECTION_IDS = ['hero', ...SECTIONS.map((s) => s.id)];

export const sectionIndex = (id) => SECTIONS.find((s) => s.id === id)?.index;

export const whatsappLink = (phone, text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
