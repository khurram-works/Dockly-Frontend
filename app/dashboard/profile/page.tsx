"use client";
import { useState, useEffect } from "react";
import { companyDetails } from "@/api/auth";
import { CompanyResponse } from "@/types/companyProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { updatePassword, updateCompanyProfile } from "@/api/auth";


export default function ProfilePage() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyResponse | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileSchema = z.object({
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
    chatbotName: z.string().min(8, "Chatbot Name must be 8 characters long."),
  });

  const passwordSchema = z
    .object({
      currentPassword: z.string().min(8, "Current password is required"),

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

  type ProfileSchema = z.infer<typeof profileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      slug: "",
      name: "",
      email: "",
      chatbotName: "",
    },
    mode: "onSubmit",
  });

  type PasswordSchema = z.infer<typeof passwordSchema>;

  const passwordForm = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: passwordReset
  } = passwordForm;

  useEffect(() => {
    const store = localStorage.getItem("company");

    if (store) {
      const company = JSON.parse(store);

      setId(company.id);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const response = await companyDetails(id);
        setCompanyData(response);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (companyData) {
      reset({
        slug: companyData.company.slug,
        name: companyData.company.name,
        email: companyData.company.email,
        chatbotName: companyData.company.chatbotName,
      });
    }
  }, [companyData, reset]);

  const onsubmit = async (data: ProfileSchema) => {
    try {
      console.log(data);
      const response = await updateCompanyProfile(data);
      if (response.success) {
        reset()
        toast.success("Profile updated successfully");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onConfirmSave = handleSubmit(onsubmit);

  const onPasswordSubmit = async (data: PasswordSchema) => {
    console.log(data);
    try {
      const { confirmPassword, ...formData } = data;
      const response = await updatePassword(formData);
      if (response.success) {
        passwordReset()
        toast.success("Password updated successfully");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onConfirmPasswordSave = handlePasswordSubmit(onPasswordSubmit);

  if (loading) {
    return (
      <main className="flex-1 p-gutter flex items-center justify-center">
        <p className="text-on-surface-variant">Loading Company Details...</p>
      </main>
    );
  }
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-background">
      <div className="max-w-container-max mx-auto w-full px-gutter py-lg">
        <div className="mb-8">
          <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background">
            Profile &amp; Settings
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Manage your account details, preferences, and workspace settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter items-start">
          {/* <div className="lg:col-span-4 flex-col gap-gutter hidden">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-6">
                <div className="w-32 h-32 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-display-lg text-display-lg font-bold shadow-sm transition-transform group-hover:scale-105">
                  NK
                </div>
                <div className="absolute inset-0 rounded-full bg-surface-tint/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">
                    photo_camera
                  </span>
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
                {fullName}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Admin · {company}
              </p>
              <div className="w-full flex flex-col gap-3">
                <button className="w-full border-2 border-secondary text-secondary font-label-md text-label-md rounded-lg px-4 py-2.5 hover:bg-secondary/5 transition-colors font-semibold">
                  Upload Photo
                </button>
                <button className="w-full text-on-surface-variant font-label-md text-label-md hover:text-error transition-colors px-4 py-2">
                  Remove Photo
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/30 pb-4">
                Account Overview
              </h3>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Company
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Nike
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Plan
                  </span>
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-md font-bold shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      star
                    </span>{" "}
                    Pro
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Member since
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    January 2025
                  </span>
                </div>
              </div>

              <div className="space-y-5 mb-8">
                <div>
                  <div className="flex justify-between font-label-md text-label-md mb-2">
                    <span className="text-on-surface-variant">
                      Documents used
                    </span>
                    <span className="text-on-surface font-semibold">
                      12 / 50
                    </span>
                  </div>
                  <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full w-[24%] transition-all duration-500"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-label-md text-label-md mb-2">
                    <span className="text-on-surface-variant">
                      Questions used
                    </span>
                    <span className="text-on-surface font-semibold">
                      1,284 / 5,000
                    </span>
                  </div>
                  <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full w-[25.6%] transition-all duration-500"></div>
                  </div>
                </div>
              </div>
              <button className="w-full bg-secondary text-on-secondary font-label-md text-label-md rounded-lg px-4 py-3 hover:bg-secondary/90 transition-colors shadow-sm font-semibold flex items-center justify-center gap-2">
                Upgrade Plan{" "}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div> */}

          <form
            onSubmit={(e) => e.preventDefault()}
            className="lg:col-span-8 flex flex-col gap-gutter"
          >
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">
                  business
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Company Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Company Slug
                  </label>
                  <input
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm"
                    type="text"
                    {...register("slug")}
                  />
                  {errors.slug && (
                    <p className="text-sm text-red-500">
                      {errors.slug?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm"
                    type="text"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Chatbot Name
                  </label>
                  <input
                    {...register("chatbotName")}
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm"
                  />
                  {errors.chatbotName && (
                    <p className="text-sm text-red-500">
                      {errors.chatbotName?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={!isDirty || !isValid || isSubmitting}
                      className="text-background font-label-md text-label-md rounded-lg px-6 py-2.5 hover:bg-secondary/90 transition-colors shadow-sm font-semibold"
                    >
                      {!isDirty ? "No changes" : "Save Changes"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    size="sm"
                    className="bg-background outline-none ring-0 border-none"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to save these changes?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will update your profile information.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await onConfirmSave();
                        }}
                      >
                        Update
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">
                  lock
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Change Password
                </h3>
              </div>
              <div className="max-w-auto space-y-5">
                <div className="relative">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Current Password
                  </label>
                  <input
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm pr-10"
                    {...passwordRegister("currentPassword")}
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <button
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showCurrentPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    New Password
                  </label>
                  <input
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm pr-10"
                    placeholder="Enter new password"
                    {...passwordRegister("password")}
                    type={showNewPassword ? "text" : "password"}
                  />
                  <button
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                  {passwordErrors.password && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Confirm New Password
                  </label>
                  <input
                    className="w-full bg-surface rounded-lg border border-outline-variant/50 px-4 py-2.5 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm pr-10"
                    placeholder="Confirm new password"
                    {...passwordRegister("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <button
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-secondary text-on-secondary font-label-md text-label-md rounded-lg px-6 py-2.5 hover:bg-secondary/90 transition-colors shadow-sm font-semibold">
                      Update Password
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    size="sm"
                    className="bg-background outline-none ring-0 border-none"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to update password?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will update your password and it won't be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await onConfirmPasswordSave();
                        }}
                      >
                        Update
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">
                  notifications_active
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Notification Preferences
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">
                      Document Processing
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                      Email me when a document finishes processing
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      // checked={false}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-sm"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">
                      Weekly Analytics
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                      Receive a weekly summary email of chatbot usage
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      // checked={false}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-sm"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">
                      Security Alerts
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-0.5">
                      Important notifications about account security
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      // checked={false}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full shadow-sm"></div>
                  </label>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button className="bg-secondary text-on-secondary font-label-md text-label-md rounded-lg px-6 py-2.5 hover:bg-secondary/90 transition-colors shadow-sm font-semibold">
                  Save Preferences
                </button>
              </div>
            </div> */}

            <div className="bg-surface-container-lowest rounded-2xl border border-error/30 shadow-[0px_4px_6px_-1px_rgba(15,23,42,0.05)] p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-error-container/5 pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="material-symbols-outlined text-error bg-error-container/50 p-2 rounded-lg">
                  warning
                </span>
                <h3 className="font-headline-md text-headline-md text-error">
                  Danger Zone
                </h3>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-outline-variant/30 bg-surface/50">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">
                      Delete all documents
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                      Permanently remove all uploaded documents. This action
                      cannot be undone.
                    </p>
                  </div>
                  <button className="shrink-0 border-2 border-error text-error font-label-md text-label-md rounded-lg px-4 py-2 hover:bg-error/10 transition-colors font-semibold">
                    Delete Documents
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-error/20 bg-error-container/10">
                  <div>
                    <p className="font-body-md text-body-md text-error font-semibold">
                      Delete Account
                    </p>
                    <p className="font-label-md text-label-md text-on-surface-variant mt-1">
                      Permanently delete your account, chatbot configurations,
                      and all associated data.
                    </p>
                  </div>
                  <button className="shrink-0 bg-error text-on-error font-label-md text-label-md rounded-lg px-4 py-2 hover:bg-error/90 transition-colors shadow-sm font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">
                      delete_forever
                    </span>{" "}
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="h-12"></div>
      </div>
    </main>
  );
}
