"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/auth";

// ─────────────────────────────────────────────
// Local helper component — defined in the same file because it's only
// used here. No need to create a separate file for something this small.
//
// Props are typed explicitly so TypeScript catches mistakes at compile time.
// ─────────────────────────────────────────────
interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;

  registration: UseFormRegisterReturn;
  error?: FieldError;

  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  registration,
  error,
  isPassword = false,
  showPassword = false,
  onTogglePassword,
}: FormFieldProps) {
  return (
    <div className="space-y-xs">
      <label htmlFor={id} className="block text-label-md text-on-surface">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...registration}
          className={`
            w-full rounded-lg border border-outline-variant
            bg-surface-bright px-4 py-3
            text-body-md text-on-surface
            placeholder:text-outline
            focus:border-secondary
            focus:ring-2
            focus:ring-secondary/20
            focus:outline-none
            transition-all shadow-sm
            ${isPassword ? "pr-12" : ""}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────
export default function RegisterPage() {
  // Form state — one useState per field.
  // In a real app you'd use react-hook-form or zod for validation,
  // but for now this is clean and understandable.
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registrationSchema = z
    .object({
      slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .max(50, "Slug must be less than 50 characters")
        .regex(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Only lowercase letters, numbers, and hyphens allowed. Cannot start or end with a hyphen.",
        ),
      name: z.string().min(1, "Full name is required"),
      email: z.email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
          "Password must contain uppercase, lowercase, number and special character",
        ),

      confirmPassword: z
        .string()
        .min(8, "Confirm password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type RegistrationFormData = z.infer<typeof registrationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      slug: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const { confirmPassword, ...formData } = data;

      const response = await registerUser(formData);
      console.log(response);

      if (response.success) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    /*
      min-h-screen flex: makes the two panels fill the full viewport height.
      selection: classes set the text highlight color when users select text —
      this is a nice detail from your Stitch HTML we're preserving.
    */
    <div
      className="min-h-screen flex bg-surface-container-lowest text-on-surface 
                    selection:bg-secondary-container selection:text-on-secondary-container"
    >
      {/* ══════════════════════════════════════════
          LEFT PANEL — Marketing / Branding
          hidden on mobile, shown from lg breakpoint.
          w-1/2 means it takes exactly half the viewport width on desktop.
          ══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex w-1/2 relative 
                bg-linear-to-br from-secondary-container to-secondary 
                flex-col overflow-hidden h-screen"
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── Top: Logo ── */}
        {/* 
    pt-8 px-10 instead of pt-12 px-12 — saves 32px of vertical space.
    shrink-0 ensures this never gets compressed.
  */}
        <div className="relative z-10 pt-8 px-10 flex items-center gap-xs shrink-0">
          <Image
            src="/logo.png"
            alt="Dockly Logo"
            width={28}
            height={28}
            className="h-7 w-auto"
          />
          <span className="text-headline-md font-bold text-on-secondary tracking-tight">
            Dockly
          </span>
        </div>

        {/* ── Middle: Value prop ── */}
        {/*
    flex-1 min-h-0: takes available space but CAN shrink.
    py-6 instead of py-xl (4rem) — this was eating 128px total, now 48px.
    The headline drops from text-headline-xl (48px) to text-headline-xl-mobile (32px)
    because 48px on a half-screen panel is simply too large and pushes the image out.
  */}
        <div className="relative z-10 px-10 flex-1 min-h-0 flex flex-col justify-center">
          <h1 className="text-headline-xl-mobile text-on-secondary mb-4">
            Start automating your customer support today
          </h1>
          <ul className="space-y-3">
            {[
              "Upload unlimited PDFs",
              "Get your public chatbot link instantly",
              "AI answers customer questions 24/7",
            ].map((item) => (
              <li key={item} className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary-fixed mt-0.5 text-[20px]">
                  check_circle
                </span>
                <span className="text-body-md text-on-secondary opacity-90">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom: Product screenshot ── */}
        {/*
    shrink-0 with h-72 gives the image a solid 288px of height.
    This is enough to show the chat header + a few messages — the
    most visually compelling part of your product screenshot.
    
    No translate — we just let it sit naturally at the bottom.
    The rounded-t-xl on the inner div creates the "floating card" top edge.
    overflow-hidden on the outer div clips the image to the rounded corners.
    
    px-8 (less than px-10) gives the image slightly more width which makes
    it look more substantial and fills the panel better.
  */}
        <div className="relative z-10 px-8 pb-0 shrink-0">
          <div
            className="rounded-t-xl overflow-hidden w-full
                    shadow-[0_-16px_32px_-8px_rgba(0,0,0,0.25)]
                    border-t border-x border-white/20"
          >
            <Image
              src="/screen.png"
              alt="Dockly Chat Interface"
              width={600}
              height={400}
              /*
          h-72 = 288px — enough to show header + messages clearly.
          object-top ensures we always show from the top of the image
          (chat header, assistant name, first message) rather than
          a random middle crop.
          
          If your screenshot is very tall, increase to h-80 (320px).
          If it's still too tight, decrease to h-56 (224px).
        */
              className="w-full h-72 object-cover object-top
                   opacity-95 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — Registration Form
          w-full on mobile (takes all space since left panel is hidden).
          w-1/2 on lg+ (takes right half).
          h-screen overflow-y-auto: the form panel scrolls independently
          if the content is taller than the screen.
          ══════════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto bg-surface-container-lowest">
        {/* ── Top bar: Mobile logo + "Already have account" link ── */}
        <div className="w-full flex justify-between items-center p-gutter md:px-xl">
          {/*
            Mobile logo — only visible below lg breakpoint (lg:hidden).
            On desktop the left panel shows the logo, so we hide it here.
          */}
          <div className="flex lg:hidden items-center gap-xs">
            <span
              className="material-symbols-outlined text-secondary text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              chat_bubble
            </span>
            <span className="text-headline-md font-bold text-on-surface">
              Dockly
            </span>
          </div>

          {/* Invisible spacer — pushes the login link to the right on desktop */}
          <div className="hidden lg:block" />

          <p className="text-label-md text-on-surface-variant">
            Already have an account?{" "}
            {/*
              Link component from Next.js — always use this instead of <a> for
              internal navigation. It handles client-side routing, prefetching,
              and doesn't cause a full page reload.
            */}
            <Link
              href="/login"
              className="text-secondary hover:underline font-semibold ml-xs"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* ── Form container — centered vertically and horizontally ── */}
        {/*
          flex-grow makes this div take all remaining height after the top bar.
          items-center justify-center centers the form card.
          p-gutter sm:p-xl: tighter padding on mobile, more breathing room on sm+.
        */}
        <div className="grow flex items-center justify-center p-gutter sm:p-xl">
          <div className="w-full max-w-105">
            {/* ── Form heading ── */}
            <div className="mb-xl text-center sm:text-left">
              <h2 className="text-headline-xl-mobile sm:text-headline-md text-on-surface mb-xs">
                Create your account
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Set up your company workspace in minutes.
              </p>
            </div>

            {/* ── Registration form ── */}
            {/*
              onSubmit on the form element, not on the button.
              This handles both button clicks AND pressing Enter in any field.
              We use our FormField helper component for each input.
            */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
              <FormField
                id="slug"
                label="Company Slug"
                placeholder="acme-corp"
                registration={register("slug")}
                error={errors.slug}
              />

              <FormField
                id="name"
                label="Full Name"
                placeholder="Jane Doe"
                registration={register("name")}
                error={errors.name}
              />

              <FormField
                id="email"
                label="Work Email"
                type="email"
                placeholder="jane@company.com"
                registration={register("email")}
                error={errors.email}
              />

              <FormField
                id="password"
                label="Password"
                placeholder="********"
                registration={register("password")}
                error={errors.password}
                isPassword
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword((prev) => !prev)}
              />

              <FormField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="********"
                registration={register("confirmPassword")}
                error={errors.confirmPassword}
                isPassword
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </form>

            {/* ── Divider ── */}
            {/*
              The "or sign up with" divider is built with flexbox:
              two flex-grow divs create the lines, the text sits between them.
              This is cleaner than absolute positioning and works at any width.
            */}
            <div className="mt-lg mb-lg relative flex items-center gap-4">
              <div className="grow border-t border-outline-variant" />
              <span className="text-label-sm text-outline-variant uppercase tracking-wider whitespace-nowrap">
                or sign up with
              </span>
              <div className="grow border-t border-outline-variant" />
            </div>

            {/* ── Google OAuth button ── */}
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-xs 
                         bg-surface-bright border border-outline-variant 
                         text-on-surface text-label-md 
                         py-3 px-4 rounded-lg shadow-sm 
                         hover:bg-surface-container transition-colors duration-200"
            >
              {/*
                Google's SVG logo — we inline it because it's a brand asset
                with specific colors that shouldn't change with themes.
                Using an <img> would require a separate file; inline SVG
                keeps everything in one place.
              */}
              <svg
                className="w-5 h-5 shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.8 15.71 17.59V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.59C14.72 18.25 13.47 18.66 12 18.66C9.15 18.66 6.74 16.74 5.86 14.16H2.18V17.02C4.01 20.65 7.72 23 12 23Z"
                  fill="#34A853"
                />
                <path
                  d="M5.86 14.16C5.63 13.49 5.5 12.76 5.5 12C5.5 11.24 5.63 10.51 5.86 9.84V6.98H2.18C1.43 8.48 1 10.19 1 12C1 13.81 1.43 15.52 2.18 17.02L5.86 14.16Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.34C13.62 5.34 15.07 5.89 16.21 6.98L19.35 3.84C17.46 2.08 14.97 1 12 1C7.72 1 4.01 3.35 2.18 6.98L5.86 9.84C6.74 7.26 9.15 5.34 12 5.34Z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>

            {/* ── Fine print / legal links ── */}
            <p className="mt-lg text-center text-label-sm text-on-surface-variant leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-secondary hover:underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-secondary hover:underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
