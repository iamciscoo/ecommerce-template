import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Ecommerce Platform",
  description: "Learn more about our company and what we stand for",
};

export default function AboutPage() {
  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">About Our Company</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg mb-6">
          Welcome to our eCommerce platform, where innovation meets convenience. We are a cutting-edge 
          online marketplace specializing in providing high-quality products across various categories, 
          from electronics to fashion, home goods to accessories. Our mission is to bring the best products 
          to your doorstep, ensuring a seamless shopping experience from browsing to delivery.
        </p>

        <p className="text-lg mb-8">
          Founded with a customer-first approach, we strive to offer competitive pricing, secure transactions, 
          and reliable service. Our team is dedicated to curating a selection of products that combine quality, 
          functionality, and value, making everyday shopping a delight for our customers.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Why Choose Us?</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-secondary rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Quality Products</h3>
            <p>We rigorously select every item in our inventory to ensure it meets our high standards of quality and performance.</p>
          </div>
          
          <div className="p-6 bg-secondary rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Customer Support</h3>
            <p>Our knowledgeable team is always ready to assist you with product inquiries, order status, and after-sales service.</p>
          </div>
          
          <div className="p-6 bg-secondary rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Fast Delivery</h3>
            <p>We ensure quick and secure delivery of your orders, with real-time tracking available to keep you informed.</p>
          </div>
          
          <div className="p-6 bg-secondary rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Secure Shopping</h3>
            <p>Shop with confidence knowing that your transactions and personal information are protected with industry-standard security.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg mb-6">Discover a better way to shop online – where quality, value, and service come together.</p>
          <Button asChild size="lg">
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 