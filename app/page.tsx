// app/page.tsx
import { client } from "./lib/sanity";
import Hero from "./components/Hero";
import { ProjectDoc } from "@/types"; // Import shared types

export default async function Home() {
  const projects = await client.fetch<ProjectDoc[]>(`*[_type == "project"]`);
  return <Hero projects={projects} />;
}

export const revalidate = 10; // Incremental Static Regeneration every 10 seconds