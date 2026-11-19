/* ==========================================================================
   gbnpsf — site configuration
   Everything a school administrator may want to change without touching
   markup lives here. Backend endpoints are deliberately empty: the front end
   degrades to a clearly-labelled demo response until they are filled in.
   ========================================================================== */
window.GB_CONFIG = {
  siteUrl: "https://www.gbnpsf.cm", // used for canonical + social URLs
  school: {
    name: "Grace Bilingual Nursery and Primary School",
    shortName: "G.B.N.P.S.F",
    wordmark: "Grace Bilingual",
    tagline: "Nursery & Primary School · Foumban",
    slogan: "Two languages, one rooted childhood.",
    sloganFr: "Deux langues, une enfance bien enracinée.",
    founded: 2004,
    address: {
      line1: "Avenue des Bamouns, Quartier Njitapon",
      line2: "Foumban, West Region",
      country: "Cameroon",
      poBox: "P.O. Box 214, Foumban"
    },
    phone: "+237 6 90 00 00 00",
    phoneAdmissions: "+237 6 90 00 00 01",
    whatsapp: "+237 6 90 00 00 00",
    email: "hello@gbnpsf.cm",
    admissionsEmail: "admissions@gbnpsf.cm"
  },

  /* Replace these with the school's real profile URLs. */
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    whatsapp: "#",
    linkedin: "#"
  },

  /* Where forms post. Leave endpoint empty to run in demo mode. */
  forms: {
    endpoint: "",
    method: "POST",
    demoMessage: "Thank you — this form is running in preview mode, so nothing was sent yet. Connect an endpoint in js/config.js to receive submissions."
  },

  /* Reserved for the School Management System. The portal pages already read
     these values, so wiring a backend later is a configuration change. */
  api: {
    baseUrl: "",
    endpoints: {
      session: "/auth/session",
      studentResults: "/students/:id/results",
      feeStatement: "/students/:id/fees",
      librarySearch: "/library/search",
      courses: "/elearning/courses"
    }
  },

  newsletter: { endpoint: "" }
};
