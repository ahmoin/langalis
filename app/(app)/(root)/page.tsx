import { getIconForLanguage } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function Page() {
  const languages = [
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Mandarin",
    "Korean",
  ];

  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen bg-background">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
          <h1 className="mb-6 text-5xl text-foreground uppercase md:text-7xl">
            Learn Languages
            <br />
            <span className="text-primary">Your Way</span>
          </h1>

          <p className="mb-8 max-w-2xl text-muted-foreground text-xl">
            Practice speaking, reading, writing, and listening with personalized
            lessons designed for your learning style. Achieve fluency at your
            own pace.
          </p>

          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg">Start Learning Free</Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          <div className="mb-16">
            <p className="mb-8 font-semibold text-muted-foreground text-sm">
              Learn in 50+ languages
            </p>
            <ItemGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {languages.map((lang) => (
                <Item className="flex-col items-center bg-card" key={lang}>
                  <div className="h-12 w-12">{getIconForLanguage(lang)}</div>
                  <span className="font-medium text-foreground text-sm">
                    {lang}
                  </span>
                </Item>
              ))}
            </ItemGroup>
          </div>

          <ItemGroup className="mt-16 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            <Item className="flex-col bg-card p-8">
              <ItemMedia className="mb-4 text-4xl">📱</ItemMedia>
              <ItemContent>
                <ItemTitle>Learn Anywhere</ItemTitle>
                <ItemDescription>
                  Access lessons on your phone, tablet, or desktop anytime.
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item className="flex-col bg-card p-8">
              <ItemMedia className="mb-4 text-4xl">🎯</ItemMedia>
              <ItemContent>
                <ItemTitle>Stay Motivated</ItemTitle>
                <ItemDescription>
                  Earn streaks, unlock achievements, and track your progress.
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item className="flex-col bg-card p-8">
              <ItemMedia className="mb-4 text-4xl">👥</ItemMedia>
              <ItemContent>
                <ItemTitle>Practice Speaking</ItemTitle>
                <ItemDescription>
                  Chat with native speakers and real learners in our community.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
      </section>
    </div>
  );
}
