import { APP_URL } from "./app";

export const AUTHOR = {
  // Stable @id used to anchor the Person entity across all posts (E-E-A-T).
  id: `${APP_URL}/#author-manuel-coffin`,
  name: "Manuel Coffin",
  bio: "Builder of Faster Fixes. Independent developer working on Next.js and Postgres applications.",
  website: "https://www.manuelcoffin.fr",
  github: "https://github.com/manucoffin",
  linkedin: "https://www.linkedin.com/in/manuel-coffin",
} as const;
