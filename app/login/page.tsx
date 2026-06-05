'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

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
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(true);
  const LoginSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
  });

  type LoginFormData = z.infer<typeof LoginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center flex gap-1">
        <Image
          src="/logo.png"
          alt="Dockly Logo"
          width={32}
          height={32}
          className="h-12 w-auto  mx-auto mb-2"
        />
        <span className="text-headline-md font-black mt-1 text-on-surface">
          Dockly
        </span>
      </div>
      <div className="w-1/3 bg-surface-container-lowest rounded-xl shadow-[0px_20px_25px_-5px_rgba(15,23,42,0.1)] border border-outline-variant/30 p-8">
        <div className="text-center mb-8">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
            Welcome back
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Login to your company dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1.5">
                Email Address
              </label>
              <input
                className="w-full h-11 px-3 bg-surface-bright border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50"
                id="email"
                placeholder="name@company.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div> */}
            <FormField
                id="email"
                label="Email"
                placeholder="cybros@gmail.com"
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
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-secondary border-outline-variant rounded focus:ring-secondary bg-surface-bright"
                id="remember-me"
                type="checkbox"
              />
              <label className="ml-2 block font-label-md text-label-md text-on-surface-variant">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                className="font-label-md text-label-md text-secondary hover:text-secondary-container transition-colors"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <Button
              className="w-full h-12 flex justify-center items-center px-4 rounded-lg  shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Logging in..." : "Login to Dashboard"}
            </Button>
          </div>
        </form>
        <div className="mt-6 relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-outline-variant/50"></div>
          </div>
          <div className="relative flex justify-center font-label-sm text-label-sm">
            <span className="px-2 bg-surface-container-lowest text-on-surface-variant">
              — or —
            </span>
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant={"outline"}
            className="w-full h-11 flex justify-center items-center px-4 rounded-lg  text-on-surface font-label-md text-label-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary
          active:scale-95"
          >
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
            Continue with Google
          </Button>
        </div>
        <div className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
          Don't have an account?{" "}
          <Link
            className="font-label-md text-label-md text-secondary hover:text-secondary-container transition-colors"
            href="register"
          >
            Register your company
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center space-x-2 text-on-surface-variant/80">
        <span className="material-symbols-outlined text-[16px]">lock</span>
        <span className="font-label-sm text-label-sm">
          256-bit encrypted · Your data stays private
        </span>
      </div>
    </main>
  );
}
