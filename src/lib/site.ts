export const site = {
  name: "Gaurav Kumar",
  assistant: "GauravLLM",
  role: "UX/ui + Product designer",
  email: "hello@gauravkumar.design",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "X", href: "https://x.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
] as const;