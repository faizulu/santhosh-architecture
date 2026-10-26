export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  setting: string;
  light: string;
  summary: string;
  body: string;
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "north-light-house",
    title: "North Light House",
    kind: "House",
    year: "2024",
    setting: "Courtyard",
    light: "Tall north window",
    summary: "A family house planned around a shaded court and a tall north window.",
    body: "Pale plaster wraps a two-storey house. The court holds one tree, and the upper room sits back under a timber soffit.",
    image: "/images/north-light.jpg",
    alt: "Pale green plaster house with a tall dark-framed window, a timber balcony, and a young tree in a stone court.",
  },
  {
    slug: "lane-house",
    title: "Lane House",
    kind: "House",
    year: "2023",
    setting: "Narrow plot",
    light: "Skylight",
    summary: "Rooms in a line, lit from a skylight and a window at the far end.",
    body: "Brick on one side and lime plaster on the other. A stone floor runs the length of the house toward a single opening.",
    image: "/images/lane-house.jpg",
    alt: "Narrow passage with a brick wall, lime plaster, a stone floor, and a skylight over a wooden table.",
  },
  {
    slug: "reading-room",
    title: "Reading Room",
    kind: "Interior",
    year: "2025",
    setting: "Library corner",
    light: "Side window",
    summary: "Shelves, a long table, and a window seat in one room.",
    body: "Timber shelves cover the long wall. The seat is at the window so reading stays in the daylight.",
    image: "/images/reading-room.jpg",
    alt: "Timber bookshelves, a wooden table, and a cushioned window seat in a quiet room.",
  },
  {
    slug: "workshop-block",
    title: "Workshop Block",
    kind: "Workplace",
    year: "2022",
    setting: "Shared yard",
    light: "Open bays",
    summary: "Three studios open onto a yard used for making.",
    body: "Brick bays sit under a corrugated roof. Doors fold back so the work tables can move between shade and sun.",
    image: "/images/workshop-block.jpg",
    alt: "Three brick workshop bays under a corrugated roof, with wooden tables in a shared yard.",
  },
  {
    slug: "garden-court",
    title: "Garden Court",
    kind: "House",
    year: "2021",
    setting: "Existing garden",
    light: "Verandah shade",
    summary: "A long verandah set beside a garden that stays intact.",
    body: "The house is low and linear. Brick and white plaster sit behind a deep verandah, and the trees stay in front.",
    image: "/images/garden-court.jpg",
    alt: "A long brick house with a deep verandah and white plaster end wall, set among dense trees.",
  },
  {
    slug: "upper-floor",
    title: "Upper Floor",
    kind: "Interior",
    year: "2024",
    setting: "Long balcony",
    light: "Full-height glazing",
    summary: "A compact apartment opened toward a long balcony.",
    body: "The dining table sits beside a sheer curtain and a run of glass. The balcony is planted so the city stays at a distance.",
    image: "/images/upper-floor.jpg",
    alt: "A pale dining room with a wooden table, a sheer curtain, and sliding doors onto a planted balcony.",
  },
];

export const homeProjects = projects.filter(
  (project) =>
    project.slug !== "north-light-house" && project.slug !== "upper-floor",
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
