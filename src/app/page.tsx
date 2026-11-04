import { BentoGrid } from "@/components/sections/bento-grid";
import { BypassStory } from "@/components/sections/bypass-story";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Manifesto } from "@/components/sections/manifesto";
import { Navbar } from "@/components/sections/navbar";
import { Projects } from "@/components/sections/projects";
import { SyntaxAIStory } from "@/components/sections/syntaxai-story";
import { BootSequence } from "@/components/system/boot-sequence";
import { CommandPalette } from "@/components/system/command-palette";
import { ScrollProgress } from "@/components/system/scroll-progress";
import { SectionRail } from "@/components/system/section-rail";
import { ShaderBackground } from "@/components/system/shader-background";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowCursor } from "@/components/ui/glow-cursor";

export default function Home() {
  return (
    <>
      {/* Atmosphere */}
      <AuroraBackground />
      <ShaderBackground />
      <GlowCursor />

      {/* System UI */}
      <BootSequence />
      <ScrollProgress />
      <Navbar />
      <SectionRail />
      <CommandPalette />

      {/* Story: intro → manifesto → experience → case studies → projects → journey → profile → contact */}
      <main>
        <Hero />
        <Manifesto />
        <Experience />
        <BypassStory />
        <SyntaxAIStory />
        <Projects />
        <Journey />
        <BentoGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
