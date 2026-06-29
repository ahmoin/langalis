"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentProps, type SyntheticEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NO_NUMBERS_REGEX = /\d/;
const PASSWORD_VALIDATION_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export function UserAuthForm({
  initialState = "login",
  className,
  ...props
}: ComponentProps<"div"> & {
  initialState: "signup" | "login";
}) {
  const router = useRouter();

  const signUpSchema = z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .refine((value) => !NO_NUMBERS_REGEX.test(value), {
        message: "Name must not contain numbers",
      }),

    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        PASSWORD_VALIDATION_REGEX,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  });

  const logInSchema = z.object({
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required"),

    password: z.string().min(1, "Password is required"),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const logInForm = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, setState] = useState<"signup" | "login">(initialState);

  async function onSignUpFormSubmit(data: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        // biome-ignore lint/suspicious/noEmptyBlockStatements: loading state is handled manually before the function call
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/");
          setIsLoading(false);
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
    setIsLoading(false);
  }

  async function onLogInFormSubmit(data: z.infer<typeof logInSchema>) {
    setIsLoading(true);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        // biome-ignore lint/suspicious/noEmptyBlockStatements: loading state is handled manually before the function call
        onRequest: () => {},
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push("/");
          setIsLoading(false);
        },
        onError: (ctx: { error: { message: string } }) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      }
    );
    setIsLoading(false);
  }

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (state === "signup") {
      await signUpForm.handleSubmit(onSignUpFormSubmit)();
    } else {
      await logInForm.handleSubmit(onLogInFormSubmit)();
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold text-2xl tracking-tight">
          {state === "login" ? "Log in" : "Sign up"} to Zomath
        </h1>
      </div>
      <div className={cn("grid gap-6", className)} {...props}>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              });
            }}
            type="button"
          >
            {isLoading ? <Spinner /> : <Icons.google className="mr-2 size-4" />}{" "}
            {state === "login" ? "Log in" : "Sign up"} with Google
          </Button>
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
              });
            }}
            type="button"
          >
            {isLoading ? <Spinner /> : <Icons.gitHub className="mr-2 size-4" />}{" "}
            {state === "login" ? "Log in" : "Sign up"} with GitHub
          </Button>
        </div>
        <FieldSeparator>Or continue with</FieldSeparator>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            {state === "signup" && (
              <>
                <Controller
                  control={signUpForm.control}
                  name="name"
                  render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                          id={field.name}
                        />
                        <FieldDescription>Enter your name</FieldDescription>
                        {isInvalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  control={signUpForm.control}
                  name="email"
                  render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                          id={field.name}
                          type="email"
                        />
                        <FieldDescription>
                          Enter your email address
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  control={signUpForm.control}
                  name="password"
                  render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={isInvalid}
                          id={field.name}
                          placeholder="Enter your password"
                          type="password"
                        />
                        <FieldDescription>
                          Must contain uppercase, lowercase, number, and be 8+
                          characters
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </>
            )}
            {state === "login" && (
              <>
                <Controller
                  control={logInForm.control}
                  name="email"
                  render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={isInvalid}
                          autoComplete="off"
                          id={field.name}
                          type="email"
                        />
                        <FieldDescription>
                          Enter your email address
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
                <Controller
                  control={logInForm.control}
                  name="password"
                  render={({ field, fieldState }) => {
                    const isInvalid = fieldState.invalid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={isInvalid}
                          id={field.name}
                          placeholder="Enter your password"
                          type="password"
                        />
                        {isInvalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </>
            )}
            <Field>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Spinner />}
                {state === "login" ? "Log in" : "Sign up"} with Email
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
      <FieldDescription className="px-6 text-center">
        {state === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Button
          className="underline hover:opacity-75"
          onClick={() => setState(state === "login" ? "signup" : "login")}
          variant="link"
        >
          {state === "login" ? "Sign up" : "Log in"}
        </Button>
      </FieldDescription>
      <FieldDescription className="px-6 text-center">
        By {state === "login" ? "logging in" : "signing up"}, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </FieldDescription>
    </>
  );
}
