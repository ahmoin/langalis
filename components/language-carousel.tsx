import { getIconForLanguage } from "@/components/icons";
import { InfiniteSlider } from "@/components/infinite-slider";
import { Item } from "@/components/ui/item";

const languages = [
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Chinese",
  "Korean",
];

export function LanguageCarousel() {
  return (
    <div className="w-full bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 font-semibold text-muted-foreground text-sm">
          Learn in 50+ languages
        </p>
        <div className="mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <InfiniteSlider gap={0} speed={50} speedOnHover={20}>
            {languages.map((lang) => (
              <Item
                className="w-40 shrink-0 flex-row items-center gap-3 border-transparent py-3"
                key={lang}
              >
                <div className="h-12 w-12 shrink-0">
                  {getIconForLanguage(lang)}
                </div>
                <span className="font-medium text-foreground text-sm">
                  {lang}
                </span>
              </Item>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </div>
  );
}
