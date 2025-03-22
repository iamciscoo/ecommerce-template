"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, CreditCard, Truck, Wallet } from "lucide-react";
import { toast } from "sonner";

type CheckoutStep = "shipping" | "payment" | "confirmation";

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutContent() {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState<"creditCard" | "bank" | "cash">("creditCard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Redirect to home if cart is empty
    if (typeof window !== "undefined" && totalItems === 0 && step !== "confirmation") {
      window.location.href = "/";
    }
  }, [totalItems, step]);

  const handleShippingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("confirmation");
      clearCart();
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (step === "confirmation") {
    return (
      <div className="container max-w-4xl py-12">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
            <CardDescription className="text-lg mt-4">
              Thank you for your purchase. Your order has been received and is now being processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-12">
            <div className="rounded-lg border bg-card p-6 text-card-foreground mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Details</h3>
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-2">
                  <div className="font-medium">Order Number</div>
                  <div>ORD-{Math.floor(100000 + Math.random() * 900000)}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Date</div>
                  <div>{new Date().toLocaleDateString()}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Email</div>
                  <div>{shippingInfo.email || "customer@example.com"}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="font-medium">Payment Method</div>
                  <div>
                    {paymentMethod === "creditCard"
                      ? "Credit Card"
                      : paymentMethod === "bank"
                      ? "Bank Transfer"
                      : "Cash on Delivery"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center mb-8">
            <div className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === "shipping" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                1
              </div>
              <span className="text-xs mt-1">Shipping</span>
            </div>
            <div className="h-px w-12 bg-border mx-1"></div>
            <div className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                2
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
            <div className="h-px w-12 bg-border mx-1"></div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                3
              </div>
              <span className="text-xs mt-1">Confirmation</span>
            </div>
          </div>

          {/* Shipping Form */}
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit}>
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                    <CardTitle>Shipping Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-6 text-right">
                <Button type="submit" size="lg">
                  Continue to Payment
                </Button>
              </div>
            </form>
          )}

          {/* Payment Method */}
          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit}>
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                    <CardTitle>Payment Method</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue="creditCard"
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as any)}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="creditCard" id="creditCard" />
                      <Label htmlFor="creditCard" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Credit Card</span>
                          </div>
                          <div className="flex space-x-1">
                            <div className="h-6 w-10 rounded bg-muted"></div>
                            <div className="h-6 w-10 rounded bg-muted"></div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          <span>Bank Transfer</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          <span>Cash on Delivery</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "creditCard" && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardHolder">Cardholder Name</Label>
                        <Input id="cardHolder" placeholder="Name on card" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVV</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="mt-6 space-y-4 rounded-md border p-4 bg-muted/50">
                      <h3 className="font-medium">Bank Transfer Instructions</h3>
                      <p className="text-sm text-muted-foreground">
                        Please transfer the total amount to the following bank account. Your order
                        will be processed once payment is confirmed.
                      </p>
                      <div className="text-sm">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="font-medium">Bank Name:</div>
                          <div>National Bank</div>
                          <div className="font-medium">Account Name:</div>
                          <div>E-commerce Platform Inc.</div>
                          <div className="font-medium">Account Number:</div>
                          <div>1234567890</div>
                          <div className="font-medium">Reference:</div>
                          <div>Your email address</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <div className="mt-6 space-y-4 rounded-md border p-4 bg-muted/50">
                      <h3 className="font-medium">Cash on Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Pay in cash when your order is delivered. Please note that a small COD fee
                        may apply.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("shipping")}
                >
                  Back to Shipping
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.length > 0 ? (
                <div className="max-h-80 overflow-auto space-y-4 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 min-w-16 overflow-hidden rounded-md border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  Your cart is empty
                </div>
              )}

              <Separator />

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 