"use client";

import { useChat } from "@ai-sdk/react";
import { Confetti } from "@neoconfetti/react";
import { ArrowUpIcon, RotateCwIcon } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { MessageAnimated } from "@/components/message-animated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createChat, getMessageText } from "@/lib/ai";
import { MESSAGE_ANIMATIONS } from "@/lib/message-animations";

const chat = createChat()
  .user("Buenas tardes, una mesa para dos por favor")
  .sleep(1200)
  .assistant("Perfecto. Aquí está el menú. ¿Qué desean beber?")
  .sleep(1200)
  .user("Tener mucha sed. Agua fría y un café para mi amiga")
  .sleep(1200)
  .assistant(
    "Ah entiendo! (btw: 'tener' is the infinitive. conjugate it to 'tengo'). Agua fría y un café. ¿Están listos para ordenar comida o necesitan más tiempo?"
  )
  .sleep(1200)
  .user("Yo quiero pollo con arroz por favor")
  .sleep(1200)
  .assistant("¡Bien! Pollo con arroz. ¿Y para su amiga?")
  .sleep(1200)
  .user("Ella quiere pescado con papas")
  .sleep(1200)
  .assistant("Muy bien! Sus platos estarán listos en quince minutos.")
  .sleep(1200)
  .user("Gracias. Cuando cuesta la comida?")
  .sleep(1200)
  .assistant(
    "Excelente pregunta! (btw: when asking 'how much', it's ¿Cuánto? - NOT ¿Cuando?. ¿Cuando? means when.). El total es 45 euros."
  )
  .sleep(1200)
  .user("Perfecto. Puedo pagar con tarjeta de crédito?")
  .sleep(1200)
  .assistant("¡Excelente! Sí, aceptamos tarjeta de crédito.")
  .sleep(1200)
  .user("Muchas gracias por su ayuda. La comida está muy deliciosa!")
  .sleep(1200)
  .assistant("¡De nada! Gracias a ti por practicar. ¡Excelente trabajo!");

const initialMessages = chat.get({ count: 0 });
const transport = chat.transport({ chunkDelayMs: 10 });

export function MessageScrollerDemo() {
  // const { messages, sendMessage, status, stop, setMessages } = useChat({
  const { messages, sendMessage, status, setMessages } = useChat({
    messages: initialMessages,
    transport,
  });

  const nextMessage = chat.next({ after: messages });
  const isBusy = status === "submitted" || status === "streaming";
  const popPreset = MESSAGE_ANIMATIONS.pop;
  const hasInitialized = useRef(false);

  const [conversationFinished, setConversationFinished] = useState(false);
  const assistantMessageCount = messages.filter(
    (m) => m.role === "assistant"
  ).length;
  const progressMap = [0, 16, 20, 35, 50, 55, 75, 100, 100];
  const completionPercentage = progressMap[assistantMessageCount] ?? 100;

  useEffect(() => {
    if (messages.length === 14 && status !== "streaming") {
      setConversationFinished(true);
    }
  }, [messages.length, status]);

  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0 && nextMessage) {
      hasInitialized.current = true;
      sendMessage(nextMessage);
    }
  }, [messages.length, nextMessage, sendMessage]);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nextMessage || isBusy) {
      return;
    }

    sendMessage(nextMessage);
  }

  return (
    <>
      {conversationFinished && <Confetti />}
      <Card className="h-100 w-full gap-0 md:h-140">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>¡Hola, Sarah!</CardTitle>
              <CardDescription>
                Practice ordering at a restaurant
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <CardAction>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label="Reset conversation"
                      disabled={isBusy}
                      onClick={() => {
                        setMessages(initialMessages);
                        setConversationFinished(false);
                      }}
                      size="icon"
                      variant="outline"
                    >
                      <RotateCwIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset</p>
                  </TooltipContent>
                </Tooltip>
              </CardAction>
            </div>
          </div>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
          <MessageScrollerProvider autoScroll scrollPreviousItemPeek={64}>
            <MessageScroller>
              <MessageScrollerViewport className="scrollbar-hide">
                <MessageScrollerContent className="p-(--card-spacing)">
                  {messages.map((message) => (
                    <MessageAnimated
                      animationPreset={popPreset}
                      assistantVariant="outline"
                      key={message.id}
                      message={message}
                      scrollAnchor={message.role === "user"}
                      userVariant="default"
                    />
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </CardContent>
        <div className="relative flex h-6 w-full items-center overflow-hidden bg-muted">
          <Progress
            className="h-full rounded-none"
            // className="flex h-full items-center justify-end bg-primary pr-2 transition-all duration-300"
            // style={{ width: `${completionPercentage}%` }}
            value={completionPercentage}
          />
          <span className="absolute right-0 font-semibold text-primary-foreground text-xs">
            {completionPercentage}%
          </span>
        </div>
        <CardFooter>
          <form className="w-full" onSubmit={handleFormSubmit}>
            <InputGroup>
              <InputGroupTextarea
                className="h-10 min-h-10 resize-none overflow-y-auto"
                placeholder="Ask me anything..."
                readOnly
                value={
                  !isBusy && nextMessage ? getMessageText(nextMessage) : ""
                }
              />
              <InputGroupAddon align="block-end" className="p-2">
                <InputGroupButton
                  className="ml-auto data-[hidden=true]:hidden"
                  data-hidden={isBusy}
                  disabled={!nextMessage || isBusy}
                  size="icon-sm"
                  type="submit"
                  variant="default"
                >
                  <ArrowUpIcon className="size-4" />
                  <span className="sr-only">Send</span>
                </InputGroupButton>
                {/* <InputGroupButton
                  className="ml-auto data-[hidden=true]:hidden"
                  data-hidden={!isBusy}
                  onClick={() => stop()}
                  size="icon-sm"
                  type="button"
                >
                  <StopCircleIcon className="size-4" />
                  <span className="sr-only">Stop</span>
                </InputGroupButton> */}
                <div
                  className="group/button ml-auto flex size-8 shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap data-[hidden=true]:hidden"
                  data-hidden={!isBusy}
                />
              </InputGroupAddon>
            </InputGroup>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
