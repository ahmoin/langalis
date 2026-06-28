import { Play, Smartphone, Target, Users } from "lucide-react";
import { LanguageCarousel } from "@/components/language-carousel";
import { MessageScrollerDemo } from "@/components/message-scroller-demo";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { siteConfig } from "@/lib/config";

export default function Page() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen bg-background">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 py-24 md:flex-row md:items-start">
          <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
            <h1 className="mb-6 text-5xl text-foreground md:text-7xl">
              Learn Languages
              <br />
              <span className="text-primary">Your Way</span>
            </h1>

            <p className="mb-8 max-w-2xl text-pretty text-muted-foreground text-xl">
              {siteConfig.description}
            </p>

            <div className="mb-16 flex flex-col gap-4 sm:flex-row">
              <Button
                className="font-bold text-primary-foreground dark:text-foreground"
                size="xl"
              >
                Get started
              </Button>
              <Button className="font-bold" size="xl" variant="outline">
                Watch Video
                <Play className="ml-2 size-5" />
              </Button>
            </div>
          </div>

          <div className="flex w-full md:hidden md:w-1/2 md:items-center md:justify-center">
            <MessageScrollerDemo />
          </div>
          <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
            <MessageScrollerDemo />
          </div>
        </div>

        <LanguageCarousel />

        <div className="mx-auto max-w-6xl px-6 py-24">
          <ItemGroup className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            <Item className="flex-col bg-card p-8">
              <div className="mb-4 flex w-full items-center gap-4">
                <ItemMedia>
                  <Smartphone className="size-10 text-primary" />
                </ItemMedia>
                <ItemTitle className="text-xl">Learn Anywhere</ItemTitle>
              </div>
              <ItemDescription>
                Access lessons on your phone, tablet, or desktop anytime.
              </ItemDescription>
            </Item>

            <Item className="flex-col bg-card p-8">
              <div className="mb-4 flex w-full items-center gap-4">
                <ItemMedia>
                  <Target className="size-10 text-primary" />
                </ItemMedia>
                <ItemTitle className="text-xl">Stay Motivated</ItemTitle>
              </div>
              <ItemDescription>
                Earn streaks, unlock achievements, and track your progress.
              </ItemDescription>
            </Item>

            <Item className="flex-col bg-card p-8">
              <div className="mb-4 flex w-full items-center gap-4">
                <ItemMedia>
                  <Users className="size-10 text-primary" />
                </ItemMedia>
                <ItemTitle className="text-xl">Practice Speaking</ItemTitle>
              </div>
              <ItemDescription>
                Pwered by the latest AI technology to have chats that adapts.
              </ItemDescription>
            </Item>
          </ItemGroup>
        </div>
      </section>
    </div>
  );
}
