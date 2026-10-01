import { CraftTabs } from "@/components/CraftTabs";
import { Hero } from "@/components/Hero";
import { ClassesSection } from "@/components/classes/ClassesSection";
import { CraftsSection } from "@/components/crafts/CraftsSection";
import { parseTab } from "@/lib/tabs";
import { classes } from "@/mocks/classes";
import { crafts } from "@/mocks/crafts";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { tab } = await searchParams;

  return (
    <main id="main" className="flex-1">
      <CraftTabs
        initialTab={parseTab(tab)}
        intro={<Hero />}
        crafts={<CraftsSection crafts={crafts} />}
        classes={<ClassesSection classes={classes} />}
      />
    </main>
  );
}
