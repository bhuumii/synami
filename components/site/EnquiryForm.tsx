"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  company: string;
  country: string;
  email: string;
  phone?: string;
  requirement?: string;
  message: string;
  website?: string;
};

/**
 * The enquiry form.
 *
 * Validation here uses React Hook Form's built-in rules rather than a Zod
 * resolver. `@hookform/resolvers` still depends on a package pinned to
 * Zod 3, and Sanity 6 brings Zod 4 — an unresolvable conflict. Dropping the
 * resolver removes the clash entirely and costs nothing, because the rules
 * below are simple and the SERVER still validates with Zod regardless.
 *
 * That server check is the one that matters. Anyone can POST straight to
 * /api/enquiry with curl; the browser rules are a courtesy to the visitor.
 *
 * `mode: "onBlur"` — errors appear when a field is left, not on every
 * keystroke. Validating as someone types shows "invalid email" before
 * they've finished typing their email.
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({ mode: "onBlur" });

  const onSubmit = async (values: Fields) => {
    setStatus("sending");
    setServerError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json?.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      reset();
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

  /* Success replaces the form. Leaving an empty form under a "thanks!"
     banner invites a second identical submission. */
  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-card border border-leaf/25 bg-paper p-10 text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-leaf text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-navy">
          Thank you — we&apos;ve got your enquiry
        </h3>
        <p className="mx-auto mt-3 text-stone">
          Our team will review it and get back to you shortly. If it&apos;s
          urgent, email us directly and we&apos;ll prioritise it.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 font-display text-sm font-medium text-leaf underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span className="text-leaf">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={cn(field, "mt-2", errors.name && "border-red-400")}
            {...register("name", {
              required: "Please enter your name",
              minLength: { value: 2, message: "Please enter your name" },
              maxLength: { value: 100, message: "That's too long" },
            })}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={label}>
            Company <span className="text-leaf">*</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={cn(field, "mt-2", errors.company && "border-red-400")}
            {...register("company", {
              required: "Please enter your company name",
              minLength: { value: 2, message: "Please enter your company name" },
            })}
          />
          {errors.company && (
            <p className="mt-2 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className={label}>
            Country <span className="text-leaf">*</span>
          </label>
          <input
            id="country"
            type="text"
            autoComplete="country-name"
            placeholder="Where you're based"
            className={cn(field, "mt-2", errors.country && "border-red-400")}
            {...register("country", {
              required: "Please enter your country",
              minLength: { value: 2, message: "Please enter your country" },
            })}
          />
          {errors.country && (
            <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>
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
            placeholder="you@company.com"
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
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Include country code"
            className={cn(field, "mt-2")}
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="requirement" className={label}>
            Product / requirement
          </label>
          <input
            id="requirement"
            type="text"
            placeholder="What you're looking for"
            className={cn(field, "mt-2")}
            {...register("requirement")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message <span className="text-leaf">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us about your requirement, volumes, target markets, or anything else that helps us respond usefully."
          className={cn(field, "mt-2 resize-y", errors.message && "border-red-400")}
          {...register("message", {
            required: "Please tell us a little more",
            minLength: {
              value: 10,
              message: "Please tell us a little more — at least 10 characters",
            },
          })}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

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
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>

        <p className="text-sm text-slate">
          Fields marked <span className="text-leaf">*</span> are required.
        </p>
      </div>
    </form>
  );
}
