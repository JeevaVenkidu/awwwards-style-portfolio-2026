import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

// Form Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, submitting, success, error

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    if (submitStatus === "submitting" || submitStatus === "success") return;
    setSubmitStatus("submitting");

    // Create the promise for email sending
    const promise = async () => {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables not set");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: `📩 New Portfolio Contact Message

                      ━━━━━━━━━━━━━━━━━━━━━━
                      👤 Name    : ${data.name}
                      📧 Email   : ${data.email}
                      📝 Subject : ${data.subject}
                      ━━━━━━━━━━━━━━━━━━━━━━

                      💬 Message:
                      ${data.message}

                      ━━━━━━━━━━━━━━━━━━━━━━
`,
        },
        publicKey,
      );
    };

    try {
      await promise();
      setSubmitStatus("success");
      toast.success("Message sent successfully!");
      reset();

      // Reset button after success animation
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Email sending error:", error);
      setSubmitStatus("error");
      toast.error("Failed to send. Please try again.");

      // Reset button after error animation
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[var(--color-background-primary)] relative z-10 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(0,212,255,0.15)_0%,rgba(0,0,0,0)_70%)]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(255,106,0,0.15)_0%,rgba(0,0,0,0)_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-[image:var(--image-gradient-brand)]">
              Touch
            </span>
          </h2>
          <p className="text-[var(--color-text-body)] text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out. I'm always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border-soft)] p-8 rounded-2xl backdrop-blur-sm hover:border-[var(--color-accent-primary)] transition-colors duration-300">
              <h3 className="text-2xl font-bold text-[var(--color-text-heading)] mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-accent-primary)]/10 rounded-lg text-[var(--color-accent-primary)]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-[var(--color-text-heading)] font-medium mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:jeeva6316x@gmail.com"
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
                    >
                      jeeva6316x@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-accent-secondary)]/10 rounded-lg text-[var(--color-accent-secondary)]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-[var(--color-text-heading)] font-medium mb-1">
                      Phone
                    </h4>
                    <span className="text-[var(--color-text-muted)]">
                      +91 63838 52216
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-status-info)]/10 rounded-lg text-[var(--color-status-info)]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-[var(--color-text-heading)] font-medium mb-1">
                      Location
                    </h4>
                    <span className="text-[var(--color-text-muted)]">
                      Selam, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--color-background-surface)] to-[var(--color-background-secondary)] border border-[var(--color-border-soft)] p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-[var(--color-text-heading)] mb-2">
                Let's Connect
              </h3>
              <p className="text-[var(--color-text-muted)]">
                I'm currently available for freelance projects and open to
                full-time opportunities.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit, (errors) => {
                const firstError = Object.values(errors)[0];
                if (firstError) {
                  toast.error(firstError.message);
                }
              })}
              className="space-y-6 bg-[var(--color-background-glass)] border border-[var(--color-border-soft)] p-8 rounded-2xl backdrop-blur-[var(--blur-glass)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-[var(--color-text-body)]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="w-full bg-[var(--color-background-surface)] border border-[var(--color-border-default)] rounded-lg px-4 py-3 text-[var(--color-text-heading)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] focus:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all placeholder:text-[var(--color-text-disabled)] disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                    disabled={submitStatus === "submitting"}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[var(--color-text-body)]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    className="w-full bg-[var(--color-background-surface)] border border-[var(--color-border-default)] rounded-lg px-4 py-3 text-[var(--color-text-heading)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] focus:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all placeholder:text-[var(--color-text-disabled)] disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                    disabled={submitStatus === "submitting"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-[var(--color-text-body)]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  className="w-full bg-[var(--color-background-surface)] border border-[var(--color-border-default)] rounded-lg px-4 py-3 text-[var(--color-text-heading)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-all placeholder:text-[var(--color-text-disabled)] disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Project Inquiry"
                  disabled={submitStatus === "submitting"}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[var(--color-text-body)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full bg-[var(--color-background-surface)] border border-[var(--color-border-default)] rounded-lg px-4 py-3 text-[var(--color-text-heading)] focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-all placeholder:text-[var(--color-text-disabled)] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                  disabled={submitStatus === "submitting"}
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className={`w-full font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-[0_0_25px_rgba(0,212,255,0.35)]
                  ${submitStatus === "submitting" ? "bg-[var(--color-background-surface)] text-[var(--color-text-muted)] cursor-wait opacity-80" : ""}
                  ${submitStatus === "success" ? "bg-[var(--color-status-success)] text-[#0a0a0a]" : ""}
                  ${submitStatus === "error" ? "bg-[var(--color-status-danger)] text-white" : ""}
                  ${submitStatus === "idle" ? "bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary-hover)] text-[var(--color-background-primary)]" : ""}
                `}
              >
                <AnimatePresence mode="wait">
                  {submitStatus === "submitting" && (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="animate-spin" size={20} />
                      <span>Sending...</span>
                    </motion.div>
                  )}

                  {submitStatus === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={20} />
                      <span>Sent ✅</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: [0, -10, 10, -10, 0] }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <AlertCircle size={20} />
                      <span>Try Again</span>
                    </motion.div>
                  )}

                  {submitStatus === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={20} />
                      <span>Send Message</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
