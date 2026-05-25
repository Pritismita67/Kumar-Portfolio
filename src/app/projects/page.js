import Footer from "@/components/Footer";
import Projects from "./Project";

export const metadata = {
  title: "Projects | Kumar Pritish",
  description: "Explore projects built by Kumar Pritish — Full Stack Developer & UI/UX Designer.",
};

export default function ProjectsPage() {
  return (
    <>
      <Projects />
      <Footer />
    </>
  );
}