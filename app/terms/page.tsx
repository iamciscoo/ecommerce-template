import { Metadata } from "next";

// Mark this page as dynamic to avoid static generation issues
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Terms of Service | Ecommerce Platform",
  description: "Our terms of service for using the platform",
};

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-8">
            Last updated: March 15, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                Welcome to our eCommerce platform. These Terms of Service (&quot;Terms&quot;) govern your use of our website, services, and products.
                By accessing or using our platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
              <p>
                To access certain features of our platform, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="mt-4">
                You are responsible for maintaining the confidentiality of your account and password, and you agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Products and Purchases</h2>
              <p>
                All product descriptions, pricing, and availability are subject to change without notice. We reserve the right to modify or discontinue any product or service without notice.
              </p>
              <p className="mt-4">
                When you place an order, you offer to purchase the product at the price and terms indicated. Our acceptance of your order takes place when we send you an order confirmation email.
              </p>
              <p className="mt-4">
                We reserve the right to refuse or cancel any orders placed for products listed at an incorrect price, whether or not the order has been confirmed and your payment processed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
              <p>
                We will make our best efforts to ship products within the timeframe indicated on our platform. However, shipping times are estimates and not guaranteed. We are not responsible for delays in delivery once the package has been handed over to the shipping carrier.
              </p>
              <p className="mt-4">
                Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier. You are responsible for filing any claims with carriers for damaged and/or lost shipments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
              <p>
                We accept returns of unused products in their original packaging within 30 days of delivery. Some products may not be eligible for return, as specified on the product page.
              </p>
              <p className="mt-4">
                To initiate a return, please contact our customer service department. Refunds will be processed within 14 business days of receiving the returned item.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p>
                All content on our platform, including text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of our company or our content suppliers and is protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall our company, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable for any indirect, punitive, incidental, special, consequential or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data or other intangible losses, that result from the use of, or inability to use, the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on our platform. Your continued use of our platform following the posting of any changes constitutes acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-4">
                Email: legal@example.com<br />
                Address: 123 Commerce St, Suite 100, Anytown, USA 12345<br />
                Phone: +1 (555) 123-4567
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 