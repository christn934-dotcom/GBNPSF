/* ==========================================================================
   gbnpsf — content data
   Events and gallery entries live here so the school office can add a row
   without touching page markup. Dates are ISO (YYYY-MM-DD).
   ========================================================================== */
window.GB_DATA = {
  /* ---------------------------------------------------------------- events */
  events: [
    {
      date: "2026-11-23",
      title: "Parent–teacher meetings · Nursery",
      time: "14:00 – 17:00",
      place: "Nursery block",
      tag: "Meetings",
      desc: "Fifteen-minute slots with each class teacher. Sign-up sheets are at the school office."
    },
    {
      date: "2026-11-27",
      title: "Open classroom morning",
      time: "08:30 – 10:30",
      place: "Primary block",
      tag: "Open day",
      desc: "Parents are invited to sit in on the first two lessons of the day."
    },
    {
      date: "2026-11-30",
      title: "End-of-term examinations begin",
      time: "All week",
      place: "All classes",
      tag: "Exams",
      desc: "Timetables are handed out on Friday 27 November. Pupils should arrive by 07:40."
    },
    {
      date: "2026-12-04",
      title: "Inter-house sports day",
      time: "08:00 – 15:00",
      place: "School field",
      tag: "Sport",
      desc: "Four houses, track and field, and a parents' relay. Refreshments on sale from the PTA."
    },
    {
      date: "2026-12-11",
      title: "Christmas concert and carol service",
      time: "17:00",
      place: "Assembly hall",
      tag: "Culture",
      desc: "Choir, nativity play and the French and English poetry recitals. Doors open at 16:30."
    },
    {
      date: "2026-12-18",
      title: "Term 1 ends · report cards issued",
      time: "From 11:00",
      place: "Classrooms",
      tag: "Term",
      desc: "Reports are handed to guardians in person. The office closes at 15:00."
    },
    {
      date: "2027-01-11",
      title: "Term 2 begins",
      time: "07:30",
      place: "All classes",
      tag: "Term",
      desc: "First assembly of the term in the courtyard, followed by a normal timetable."
    },
    {
      date: "2027-01-22",
      title: "Admissions open day",
      time: "09:00 – 13:00",
      place: "School campus",
      tag: "Admissions",
      desc: "Tour the campus, meet the head teacher and collect an application pack for 2027–2028."
    },
    {
      date: "2027-02-05",
      title: "Bilingual reading week",
      time: "All week",
      place: "Library and classrooms",
      tag: "Academics",
      desc: "Reading challenges in English and French, a book swap and visiting storytellers."
    },
    {
      date: "2027-02-19",
      title: "Science and mathematics fair",
      time: "10:00 – 16:00",
      place: "Assembly hall",
      tag: "Academics",
      desc: "Class projects on display, judged by staff and two visiting teachers from the lycée."
    }
  ],

  /* --------------------------------------------------------------- gallery */
  /* cat: campus · classroom · pupils · sport · arts · events
     Replace `.ph` slots with real photographs when they are ready. */
  photos: [
    { title: "The main courtyard", cat: "campus", label: "Upload School Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Nursery reading corner", cat: "classroom", label: "Upload Classroom Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Morning assembly", cat: "pupils", label: "Upload Students Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Football on the field", cat: "sport", label: "Upload Sports Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Choir rehearsal", cat: "arts", label: "Upload Arts Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Prize-giving day", cat: "events", label: "Upload Event Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Primary classroom", cat: "classroom", label: "Upload Classroom Image Here", hint: "1600 × 1200 · JPG" },
    { title: "The library", cat: "campus", label: "Upload Library Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Traditional dance club", cat: "arts", label: "Upload Arts Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Handball practice", cat: "sport", label: "Upload Sports Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Science lesson, CM2", cat: "classroom", label: "Upload Classroom Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Independence Day parade", cat: "events", label: "Upload Event Image Here", hint: "1600 × 1200 · JPG" },
    { title: "The nursery playground", cat: "campus", label: "Upload School Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Reading buddies", cat: "pupils", label: "Upload Students Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Art class", cat: "arts", label: "Upload Arts Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Sports day relay", cat: "sport", label: "Upload Sports Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Computer corner", cat: "classroom", label: "Upload Classroom Image Here", hint: "1600 × 1200 · JPG" },
    { title: "Graduation, Class 6", cat: "events", label: "Upload Event Image Here", hint: "1600 × 1200 · JPG" }
  ],

  videos: [
    { title: "A morning at Grace Bilingual", meta: "School film · 3 min", label: "Upload School Video Here" },
    { title: "Nursery: learning through play", meta: "Nursery · 2 min", label: "Upload Classroom Video Here" },
    { title: "Inter-house sports day 2026", meta: "Sport · 4 min", label: "Upload Sports Video Here" },
    { title: "Christmas concert highlights", meta: "Culture · 5 min", label: "Upload Event Video Here" }
  ]
};
