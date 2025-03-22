import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MinusCircle, PlusCircle, Heart, ShoppingCart, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mark this page as dynamic to avoid static generation issues
export const dynamic = 'force-dynamic';

// Demo products - in a real app, this would come from a database or API
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Earbuds",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    gallery: [
      "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    category: "Electronics",
    description: "Experience crystal-clear sound with these premium wireless earbuds. Featuring active noise cancellation, long battery life, and a comfortable fit, they're perfect for music, calls, and workouts.",
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.2 Connectivity",
      "Up to 8 Hours Battery Life",
      "Water and Sweat Resistant",
      "Touch Controls",
      "Built-in Microphone"
    ],
    specifications: {
      "Brand": "AudioTech",
      "Model": "AT-200",
      "Connectivity": "Bluetooth 5.2",
      "Battery Life": "8 Hours (24 with case)",
      "Water Resistance": "IPX5",
      "Driver Size": "10mm",
      "Weight": "5g per earbud"
    },
    stock: 15,
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isFeatured: false,
    isOnSale: true,
    slug: "wireless-bluetooth-earbuds",
    variants: {
      colors: ["Black", "White", "Blue"],
    }
  }
];

// Get related products
const relatedProducts = [
  {
    id: "2",
    name: "Smart Watch Fitness Tracker",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    slug: "smart-watch-fitness-tracker",
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    isNew: true,
    isFeatured: false,
    isOnSale: true,
    slug: "bluetooth-speaker",
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Electronics",
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    slug: "wireless-charging-pad",
  }
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist'
    };
  }

  return {
    title: `${product.name} | Ecommerce Platform`,
    description: product.description?.substring(0, 160),
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                New
              </span>
            )}
            {product.isOnSale && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                Sale
              </span>
            )}
          </div>
          
          {product.gallery && (
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((img, i) => (
                <div key={i} className="aspect-square relative border rounded overflow-hidden cursor-pointer hover:border-primary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img} 
                    alt={`${product.name} - view ${i+1}`} 
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : i < product.rating 
                              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                              : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <Badge className="mt-1">In Stock: {product.stock}</Badge>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{product.description}</p>
          
          {product.variants && (
            <div className="space-y-4">
              {product.variants.colors && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map((color) => (
                      <div 
                        key={color} 
                        className="border rounded-full p-1 cursor-pointer hover:border-primary"
                        title={color}
                      >
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-r-none">
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <div className="h-9 px-3 flex items-center justify-center border-y w-12 text-center">
                  1
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-l-none">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="features" className="mt-8">
            <TabsList className="w-full">
              <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="pt-4">
              <ul className="space-y-2">
                {product.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-2">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-2 py-2 border-b last:border-0">
                    <div className="font-medium">{key}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-4">
                <p>Standard shipping takes 3-5 business days. Express shipping is available for an additional fee.</p>
                <p>Free shipping on orders over $100.</p>
                <p>International shipping available to select countries.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(relatedProduct => (
            <Link href={`/products/${relatedProduct.slug}`} key={relatedProduct.id} className="group">
              <Card className="overflow-hidden h-full border-none shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-square relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  {relatedProduct.isNew && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                      New
                    </span>
                  )}
                  {relatedProduct.isOnSale && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      Sale
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate group-hover:text-primary">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${relatedProduct.price.toFixed(2)}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 