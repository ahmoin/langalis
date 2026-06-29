import { Smartphone, Target, Users } from "lucide-react";
import {
  Item,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export function DashboardSection() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-screen bg-background">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 py-24 md:flex-row md:items-start">
          <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
            <h1 className="mb-6 text-5xl text-foreground md:text-7xl">
              Your dashboard
            </h1>
          </div>
        </div>

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
