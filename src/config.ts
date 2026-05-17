export const SITE = {
  website: "https://tshieldshuemer.github.io/", // replace this with your deployed domain
  author: "Tim Shields-Huemer",
  profile: "https://github.com/tshieldshuemer/",
  desc: "Personal site of Tim Shields-Huemer — writing, projects, and interests.",
  title: "Tim Shields-Huemer",
  ogImage: "Collage.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
