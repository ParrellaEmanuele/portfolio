import type { Content } from "@/content/types";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Nexus } from "./Nexus";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Work } from "./Work";

/** The one-page site, rendered once per language. */
export function HomePage({ c }: { c: Content }) {
  return (
    <div id="top">
      <Header c={c} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero c={c} />
        <Nexus c={c} />
        <Projects c={c} />
        <Work c={c} />
        <Skills c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
    </div>
  );
}
