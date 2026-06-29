"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageContent } from "@/components/ui/message";
import { MessageScrollerItem } from "@/components/ui/message-scroller";
import type { MessageAnimationPreset } from "@/lib/message-animations";
import { MESSAGE_ANIMATIONS } from "@/lib/message-animations";

interface MessageAnimatedPart {
  text?: string;
  type: string;
}

interface MessageAnimatedMessage {
  id: string;
  parts?: readonly MessageAnimatedPart[];
  role: string;
  text?: string;
}

interface MessageAnimatedTextPart {
  key: string;
  text: string;
}

const PARAGRAPH_SEPARATOR = /\n\s*\n/;
const MotionMessageScrollerItem = motion.create(MessageScrollerItem);

function MessageAnimated({
  message,
  animationPreset = MESSAGE_ANIMATIONS["slide-up"],
  assistantVariant = "ghost",
  scrollAnchor,
  userVariant = "muted",
  ...props
}: Omit<
  ComponentProps<typeof MotionMessageScrollerItem>,
  "animate" | "children" | "exit" | "initial" | "messageId" | "variants"
> & {
  animationPreset?: MessageAnimationPreset;
  assistantVariant?: ComponentProps<typeof Bubble>["variant"];
  message: MessageAnimatedMessage;
  userVariant?: ComponentProps<typeof Bubble>["variant"];
}) {
  const shouldReduceMotion = useReducedMotion();
  const isUserMessage = message.role === "user";

  if (isUserMessage) {
    return (
      <MotionMessageScrollerItem
        animate="animate"
        exit={shouldReduceMotion ? undefined : "exit"}
        initial={shouldReduceMotion ? false : "initial"}
        messageId={message.id}
        scrollAnchor={scrollAnchor ?? true}
        variants={animationPreset.variants}
        {...props}
      >
        <MessageAnimatedRow
          assistantVariant={assistantVariant}
          message={message}
          userVariant={userVariant}
        />
      </MotionMessageScrollerItem>
    );
  }

  return (
    <MotionMessageScrollerItem
      animate="animate"
      exit={shouldReduceMotion ? undefined : "exit"}
      initial={shouldReduceMotion ? false : "initial"}
      messageId={message.id}
      scrollAnchor={scrollAnchor}
      variants={animationPreset.variants}
      {...props}
    >
      <MessageAnimatedRow
        assistantVariant={assistantVariant}
        message={message}
        userVariant={userVariant}
      />
    </MotionMessageScrollerItem>
  );
}

function MessageAnimatedRow({
  message,
  assistantVariant,
  userVariant,
}: {
  assistantVariant: ComponentProps<typeof Bubble>["variant"];
  message: MessageAnimatedMessage;
  userVariant: ComponentProps<typeof Bubble>["variant"];
}) {
  const isUserMessage = message.role === "user";
  const textParts = getMessageAnimatedTextParts(message);

  return (
    <Message align={isUserMessage ? "end" : "start"}>
      <MessageContent>
        {textParts.map((part) => {
          const paragraphs = part.text
            .split(PARAGRAPH_SEPARATOR)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

          return (
            <Bubble
              key={part.key}
              variant={isUserMessage ? userVariant : assistantVariant}
            >
              <BubbleContent className="space-y-2">
                {paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    className="whitespace-pre-wrap"
                    key={`${part.key}-${paragraphIndex}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </BubbleContent>
            </Bubble>
          );
        })}
      </MessageContent>
    </Message>
  );
}

function getMessageAnimatedTextParts(
  message: MessageAnimatedMessage
): MessageAnimatedTextPart[] {
  if (message.parts) {
    return message.parts.flatMap((part, index) => {
      if (part.type !== "text" || typeof part.text !== "string") {
        return [];
      }

      return [{ key: `${message.id}-${index}`, text: part.text }];
    });
  }

  return typeof message.text === "string"
    ? [{ key: `${message.id}-text`, text: message.text }]
    : [];
}

export { MessageAnimated, type MessageAnimatedMessage };
