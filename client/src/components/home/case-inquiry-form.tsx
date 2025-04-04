import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import {
  sendEmailNotification,
  formatInquiryNotification,
} from "@/lib/notifications";
import emailjs from "@emailjs/browser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Form validation schema
const caseInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  practiceArea: z.string().min(1, "Please select a practice area"),
  message: z
    .string()
    .min(
      20,
      "Please provide more details about your case (at least 20 characters)"
    ),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy",
  }),
});

type CaseInquiryFormValues = z.infer<typeof caseInquirySchema>;

// Initialize EmailJS - do this outside the component to avoid re-initialization on renders
const initEmailjs = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

initEmailjs();

export default function CaseInquiryForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  // Setup form with validation
  const form = useForm<CaseInquiryFormValues>({
    resolver: zodResolver(caseInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      practiceArea: "",
      message: "",
      termsAccepted: false,
    },
  });

  // Function to send EmailJS notification
  const sendEmailJsNotification = async (data: CaseInquiryFormValues) => {
    try {
      // Only attempt to send if EmailJS is configured
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        console.warn(
          "EmailJS configuration incomplete. Skipping email notification."
        );
        return;
      }

      console.log("Sending email notification with data:", {
        from_name: `${data.firstName} ${data.lastName}`,
        reply_to: data.email,
        phone_number: data.phone,
        case_type: data.practiceArea,
        message: data.message,
      });

      await sendEmailNotification({
        from_name: `${data.firstName} ${data.lastName}`,
        reply_to: data.email,
        phone_number: data.phone,
        case_type: data.practiceArea,
        message: data.message,
      });
      console.log("Email notification sent");
    } catch (error) {
      console.error("Failed to send email notification:", error);
      // Non-blocking, continue with form submission
    }
  };

  // Function to send Telegram notification
  const sendTelegramNotification = async (data: CaseInquiryFormValues) => {
    try {
      const message = formatInquiryNotification({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        caseType: data.practiceArea,
        message: data.message,
      });

      await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      console.log("Telegram notification sent");
    } catch (error) {
      console.error("Failed to send Telegram notification:", error);
      // Non-blocking, continue with form submission
    }
  };

  // Setup mutation for form submission
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: CaseInquiryFormValues) => {
      console.log("Submitting to API with data:", data);

      // 1. Submit to backend API - use the exact same schema as defined in shared/schema.ts
      const response = await apiRequest("POST", "/api/inquiries", data);

      // 2. Send notifications (non-blocking)
      await Promise.allSettled([
        sendEmailJsNotification(data),
        sendTelegramNotification(data),
      ]);

      return response;
    },
    onSuccess: () => {
      setFormSubmitted(true);
      form.reset();
      toast({
        title: "Inquiry Received",
        variant: "pirmary",
        description:
          "Thank you for contacting Pearson Specter. One of our attorneys will review your inquiry and contact you within 24 hours.",
      });
    },
    onError: (error) => {
      let message = "Failed to submit your inquiry. Please try again later.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "An error occurred",
        description: message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission using react-hook-form's SubmitHandler
  const onSubmit = form.handleSubmit((data) => {
    console.log("Submitting inquiry:", data);
    // Debug validation
    const {
      formState: { errors },
    } = form;
    if (Object.keys(errors).length > 0) {
      console.error("Form validation errors:", errors);
    }
    mutate(data);
  });

  return (
    <section id="case-inquiry" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-merriweather font-bold sm:text-4xl">
                  Ready to Discuss Your Case?
                </h2>
                <p className="mt-4 text-lg text-primary-100">
                  Complete our case inquiry form to schedule a free consultation
                  with one of our experienced attorneys.
                </p>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">
                        Confidential Evaluation
                      </h3>
                      <p className="mt-1 text-primary-100">
                        Your information remains private and protected by
                        attorney-client privilege.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">
                        No Obligation
                      </h3>
                      <p className="mt-1 text-primary-100">
                        Our initial consultation is free with no obligation to
                        proceed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">
                        Quick Response
                      </h3>
                      <p className="mt-1 text-primary-100">
                        Our team will review your case and respond within 24
                        hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {formSubmitted ? (
                  <div className="rounded-md bg-navy-50 p-6 mt-6 border-l-4 border-gold-500">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-gold-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-navy-900">
                          Inquiry Received
                        </h3>
                        <div className="mt-2 text-navy-700">
                          <p>
                            Thank you for contacting Pearson Specter. One of our
                            attorneys will review your inquiry and contact you
                            within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-100">
                                First name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="First name"
                                  {...field}
                                  className="bg-white"
                                />
                              </FormControl>
                              <FormMessage className="form-error" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary-100">
                                Last name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Last name"
                                  {...field}
                                  className="bg-white"
                                />
                              </FormControl>
                              <FormMessage className="form-error" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage className="form-error" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(123) 456-7890"
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage className="form-error" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="practiceArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">
                              Practice Area
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Select a practice area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="corporate-law">
                                  Corporate Law
                                </SelectItem>
                                <SelectItem value="litigation">
                                  Litigation
                                </SelectItem>
                                <SelectItem value="intellectual-property">
                                  Intellectual Property
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="form-error" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-primary-100">
                              Briefly describe your legal matter
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide details about your case"
                                rows={4}
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage className="form-error" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-accent-600"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-primary-100">
                                I agree to the{" "}
                                <a
                                  href="#"
                                  className="text-accent-300 hover:text-accent-200"
                                >
                                  Privacy Policy
                                </a>{" "}
                                and consent to be contacted about my inquiry
                              </FormLabel>
                              <FormMessage className="form-error" />
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-accent-500 hover:bg-accent-200 border-2 rounded-xl"
                        disabled={isPending}
                      >
                        {isPending ? "Submitting..." : "Submit Case Inquiry"}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
