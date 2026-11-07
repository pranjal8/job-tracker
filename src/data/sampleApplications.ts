import type { Application } from "../types";

export const applicationList: Application[] = [
  {
    id: 1,
    company: "Acme Labs",
    role: "Frontend Developer",
    status: "wishlist",
    link: "https://example.com/jobs/101",
    notes: "Saw it on a careers page",
  },
  {
    id: 2,
    company: "Northwind Digital",
    role: "React Developer",
    status: "wishlist",
    link: "https://example.com/jobs/102",
  },
  {
    id: 3,
    company: "Globex Systems",
    role: "Frontend Engineer",
    status: "applied",
    link: "https://example.com/jobs/103",
    notes: "Applied through referral",
  },
  {
    id: 4,
    company: "Initech",
    role: "UI Engineer",
    status: "applied",
    link: "https://example.com/jobs/104",
  },
  {
    id: 5,
    company: "Umbrella Software",
    role: "Senior Frontend Developer",
    status: "interview",
    link: "https://example.com/jobs/105",
    notes: "Technical round on Friday",
  },
  {
    id: 6,
    company: "Stark Web Studio",
    role: "React Engineer",
    status: "offer",
    link: "https://example.com/jobs/106",
  },
  {
    id: 7,
    company: "Wayne Interactive",
    role: "Frontend Developer",
    status: "rejected",
    link: "https://example.com/jobs/107",
  },
];
