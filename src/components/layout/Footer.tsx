"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Featured", href: "/products?featured=true" },
      { label: "New Arrivals", href: "/products?sort=newest" },
      { label: "Sale", href: "/products?discount=true" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally connect to your newsletter service
    if (email) {
      toast.success("Thanks for subscribing to our newsletter!");
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info and Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">ECOM</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Modern ecommerce platform with everything you need to build a
                better online store.
              </p>
              <div className="mt-2">
                <h3 className="mb-2 text-sm font-semibold">
                  Join our newsletter
                </h3>
                <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold">{group.title}</h3>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social and Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-t pt-6 md:flex-row md:space-y-0">
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ECOM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 