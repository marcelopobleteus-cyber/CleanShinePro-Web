// Paginas que se descargan cuando se abren (la portada va incluida)
export const PAGE_LOADERS = {
  booking: () => import('./BookingPage'),
  services: () => import('./ServicesPage'),
  process: () => import('./HowItWorksPage'),
  partners: () => import('./PartnersPage'),
  contact: () => import('./ContactPage'),
  'service-areas': () => import('./ServiceAreasPage'),
  about: () => import('./AboutPage'),
  privacy: () => import('./PrivacyPage'),
  blog: () => import('./BlogPage'),
  city: () => import('./LocalServicePage'),
  post: () => import('./BlogPostPage'),
  notfound: () => import('./NotFoundPage'),
};
