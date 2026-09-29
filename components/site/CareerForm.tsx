"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Check, Loader2, Paperclip, X } from "lucide-react";
import {
  MAX_RESUME_BYTES,
  ACCEPTED_RESUME_TYPES,
} from "@/lib/career-schema";
import { cn } from "@/lib/utils";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website?: string;
};

/** Read a File into base64, stripping the `data:...;base64,` prefix. */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsDataURL(file);
  });
}

export function CareerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({ mode: "onBlur" });

  const pickFile = (f: File | null) => {
    setFileError(null);
    if (!f) return setFile(null);

    if (!ACCEPTED_RESUME_TYPES.includes(f.type)) {
      setFileError("Please upload a PDF or Word document");
      return setFile(null);
    }
    if (f.size > MAX_RESUME_BYTES) {
      setFileError("That file is too large. Please keep it under 3 MB.");
      return setFile(null);
    }
    setFile(f);
  };

  const onSubmit = async (values: Fields) => {
    if (!file) {
      setFileError("Please attach your resume");
      return;
    }

    setStatus("sending");
    setServerError(null);

    try {
      const resumeData = await toBase64(file);

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          resumeName: file.name,
          resumeType: file.type,
          resumeData,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json?.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      reset();
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setStatus("sent");
    } catch {
      setServerError(
        "We couldn't send that. Please check your connection, or email us directly."
      );
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-card border border-line bg-paper px-4 py-3.5 text-base text-navy " +
    "placeholder:text-slate transition-colors duration-200 focus:border-leaf focus:outline-none";
  const label = "font-display text-sm font-medium text-navy";

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-card border border-leaf/25 bg-field p-10 text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-leaf text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-navy">
          Application received
        </h3>
        <p className="mx-auto mt-3 text-stone">
          Thank you for your interest in Synami Agriscience. We review every
          application and will be in touch if there&apos;s a fit.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 font-display text-sm font-medium text-leaf underline underline-offset-4"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={label}>
            First name <span className="text-leaf">*</span>
          </label>
          <input
            id="firstName"
            autoComplete="given-name"
            placeholder="First name"
            className={cn(field, "mt-2", errors.firstName && "border-red-400")}
            {...register("firstName", {
              required: "Please enter your first name",
              minLength: { value: 2, message: "Please enter your first name" },
            })}
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={label}>
            Last name <span className="text-leaf">*</span>
          </label>
          <input
            id="lastName"
            autoComplete="family-name"
            placeholder="Last name"
            className={cn(field, "mt-2", errors.lastName && "border-red-400")}
            {...register("lastName", { required: "Please enter your last name" })}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-leaf">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(field, "mt-2", errors.email && "border-red-400")}
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "That doesn't look like a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            Phone number <span className="text-leaf">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Include country code"
            className={cn(field, "mt-2", errors.phone && "border-red-400")}
            {...register("phone", {
              required: "Please enter your phone number",
              minLength: { value: 6, message: "Please enter a valid phone number" },
            })}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message <span className="text-leaf">*</span>
        </label>
        <textarea
          id="message"
          rows={7}
          placeholder="Tell us about yourself — your background, the kind of role you're looking for, and why Synami."
          className={cn(field, "mt-2 resize-y", errors.message && "border-red-400")}
          {...register("message", {
            required: "Please tell us a little about yourself",
            minLength: { value: 10, message: "Please tell us a little more" },
          })}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Resume. The native file input is hidden and driven by a styled
          button — the browser default can't be restyled and looks broken
          next to everything else. */}
      <div>
        <span className={label}>
          Resume <span className="text-leaf">*</span>
        </span>
        <p className="mt-1 text-sm text-slate">PDF or Word document, up to 3 MB.</p>

        <input
          ref={fileInput}
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
        />

        {file ? (
          <div className="mt-3 flex items-center justify-between gap-4 rounded-card border border-leaf/25 bg-field px-4 py-3.5">
            <span className="flex min-w-0 items-center gap-2.5 text-sm text-navy">
              <Paperclip className="h-4 w-4 shrink-0 text-leaf" />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-slate">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </span>
            </span>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="shrink-0 rounded-pill p-1.5 text-slate transition-colors hover:text-navy"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className={cn(
              "mt-3 inline-flex items-center gap-2 rounded-card border border-dashed px-5 py-3.5",
              "font-display text-sm font-medium transition-colors",
              fileError
                ? "border-red-400 text-red-600"
                : "border-line text-leaf hover:border-leaf hover:bg-field"
            )}
          >
            <Paperclip className="h-4 w-4" />
            Choose file
          </button>
        )}

        {fileError && <p className="mt-2 text-sm text-red-600">{fileError}</p>}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" && serverError && (
        <p
          role="alert"
          className="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex items-center gap-2 rounded-pill bg-leaf px-8 py-3.5",
            "font-display text-sm font-medium tracking-wide text-white",
            "shadow-[var(--shadow-rest)] transition-all duration-300",
            "hover:bg-leaf-deep hover:shadow-[var(--shadow-lift)]",
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "sending" ? "Sending…" : "Apply now"}
        </button>

        <p className="text-sm text-slate">
          Fields marked <span className="text-leaf">*</span> are required.
        </p>
      </div>
    </form>
  );
}
