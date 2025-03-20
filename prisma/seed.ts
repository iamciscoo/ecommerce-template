import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { getPexelsImages } from '../src/lib/pexels';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data (only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log('Clearing existing data...');
    await prisma.cartItem.deleteMany();
    await prisma.wishlistItem.deleteMany();
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.address.deleteMany();
    await prisma.productVariantOption.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.optionValue.deleteMany();
    await prisma.optionType.deleteMany();
    await prisma.productAttribute.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.coupon.deleteMany();

    // Clear auth data
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
  }

  // Fetch images from Pexels API
  console.log('Fetching images from Pexels API...');
  const smartphoneImages = await getPexelsImages('smartphone', 3);
  const laptopImages = await getPexelsImages('laptop', 3);
  const electronicsImages = await getPexelsImages('electronics', 2);
  const clothingImages = await getPexelsImages('clothing', 2);

  // Create admin user
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
  });

  // Create regular user
  console.log('Creating regular user...');
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
    },
  });

  // Create categories
  console.log('Creating categories...');
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and accessories',
      image: electronicsImages[0]?.src.medium || 'https://placeholder.com/electronics',
    },
  });

  const smartphonesCategory = await prisma.category.create({
    data: {
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Latest smartphones and accessories',
      image: smartphoneImages[0]?.src.medium || 'https://placeholder.com/smartphone',
      parentId: electronicsCategory.id,
    },
  });

  const laptopsCategory = await prisma.category.create({
    data: {
      name: 'Laptops',
      slug: 'laptops',
      description: 'Powerful laptops for work and play',
      image: laptopImages[0]?.src.medium || 'https://placeholder.com/laptop',
      parentId: electronicsCategory.id,
    },
  });

  // Create clothing category
  await prisma.category.create({
    data: {
      name: 'Clothing',
      slug: 'clothing',
      description: 'Stylish clothing for all occasions',
      image: clothingImages[0]?.src.medium || 'https://placeholder.com/clothing',
    },
  });

  // Create option types and values
  console.log('Creating option types and values...');
  const colorOption = await prisma.optionType.create({
    data: {
      name: 'Color',
      values: {
        create: [
          { value: 'Black' },
          { value: 'White' },
          { value: 'Blue' },
          { value: 'Red' },
        ],
      },
    },
  });

  // Create size option type
  await prisma.optionType.create({
    data: {
      name: 'Size',
      values: {
        create: [
          { value: 'Small' },
          { value: 'Medium' },
          { value: 'Large' },
          { value: 'XL' },
        ],
      },
    },
  });

  const storageOption = await prisma.optionType.create({
    data: {
      name: 'Storage',
      values: {
        create: [
          { value: '64GB' },
          { value: '128GB' },
          { value: '256GB' },
          { value: '512GB' },
        ],
      },
    },
  });

  // Get the option values
  const colorValues = await prisma.optionValue.findMany({
    where: { optionTypeId: colorOption.id },
  });

  const storageValues = await prisma.optionValue.findMany({
    where: { optionTypeId: storageOption.id },
  });

  // Create smartphone product
  console.log('Creating smartphone product...');
  const smartphoneProduct = await prisma.product.create({
    data: {
      name: 'Flagship Smartphone X',
      slug: 'flagship-smartphone-x',
      description: 'The latest and greatest smartphone with cutting-edge features.',
      price: 999.99,
      compareAtPrice: 1099.99,
      cost: 700.00,
      sku: 'PHONE-FSX-01',
      inventory: 100,
      isFeatured: true,
      condition: 'new',
      categories: {
        create: [
          { categoryId: smartphonesCategory.id },
          { categoryId: electronicsCategory.id },
        ],
      },
      images: {
        create: smartphoneImages.map((image, index) => ({
          url: image.src.large || image.src.medium,
          alt: `Flagship Smartphone X - Image ${index + 1}`,
          position: index,
        })),
      },
      attributes: {
        create: [
          { name: 'Brand', value: 'TechCo' },
          { name: 'Screen Size', value: '6.7 inches' },
          { name: 'Camera', value: '48MP' },
          { name: 'Battery', value: '4500mAh' },
        ],
      },
    },
  });

  // Create variants for the smartphone
  console.log('Creating smartphone variants...');
  for (const colorValue of colorValues) {
    for (const storageValue of storageValues) {
      // Adjust prices based on storage
      let priceAdjustment = 0;
      if (storageValue.value === '128GB') priceAdjustment = 100;
      if (storageValue.value === '256GB') priceAdjustment = 200;
      if (storageValue.value === '512GB') priceAdjustment = 300;

      await prisma.productVariant.create({
        data: {
          name: `${colorValue.value} ${storageValue.value}`,
          price: 999.99 + priceAdjustment,
          inventory: 25,
          productId: smartphoneProduct.id,
          options: {
            create: [
              { optionValueId: colorValue.id },
              { optionValueId: storageValue.id },
            ],
          },
        },
      });
    }
  }

  // Create laptop product
  console.log('Creating laptop product...');
  const laptopProduct = await prisma.product.create({
    data: {
      name: 'UltraBook Pro',
      slug: 'ultrabook-pro',
      description: 'Thin, light, and powerful laptop for professionals.',
      price: 1499.99,
      compareAtPrice: 1699.99,
      cost: 1000.00,
      sku: 'LAPTOP-UBP-01',
      inventory: 50,
      isFeatured: true,
      condition: 'new',
      categories: {
        create: [
          { categoryId: laptopsCategory.id },
          { categoryId: electronicsCategory.id },
        ],
      },
      images: {
        create: laptopImages.map((image, index) => ({
          url: image.src.large || image.src.medium,
          alt: `UltraBook Pro - Image ${index + 1}`,
          position: index,
        })),
      },
      attributes: {
        create: [
          { name: 'Brand', value: 'CompTech' },
          { name: 'Processor', value: 'Intel Core i7' },
          { name: 'RAM', value: '16GB' },
          { name: 'Storage', value: '512GB SSD' },
        ],
      },
    },
  });

  // Create refurbished laptop
  console.log('Creating refurbished laptop product...');
  await prisma.product.create({
    data: {
      name: 'UltraBook Pro (Refurbished)',
      slug: 'ultrabook-pro-refurbished',
      description: 'Factory refurbished UltraBook Pro - like new condition with 1-year warranty.',
      price: 999.99,
      compareAtPrice: 1499.99,
      cost: 700.00,
      sku: 'LAPTOP-UBP-01-REF',
      inventory: 20,
      isFeatured: false,
      condition: 'refurbished',
      categories: {
        create: [
          { categoryId: laptopsCategory.id },
          { categoryId: electronicsCategory.id },
        ],
      },
      images: {
        create: laptopImages.length > 0 ? [
          {
            url: laptopImages[0].src.large || laptopImages[0].src.medium,
            alt: 'UltraBook Pro Refurbished - Front view',
            position: 0,
          }
        ] : [],
      },
      attributes: {
        create: [
          { name: 'Brand', value: 'CompTech' },
          { name: 'Processor', value: 'Intel Core i7' },
          { name: 'RAM', value: '16GB' },
          { name: 'Storage', value: '512GB SSD' },
          { name: 'Warranty', value: '1 Year Limited' },
        ],
      },
    },
  });

  // Create user address
  console.log('Creating user address...');
  await prisma.address.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '555-555-5555',
      isDefault: true,
      userId: user.id,
    },
  });

  // Create a coupon
  console.log('Creating coupon...');
  await prisma.coupon.create({
    data: {
      code: 'WELCOME10',
      description: '10% off your first order',
      discountType: 'percentage',
      discountAmount: 10.00,
      minimumAmount: 50.00,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      usageLimit: 1000,
    },
  });

  // Add item to user's cart
  console.log('Adding item to user cart...');
  await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId: smartphoneProduct.id,
      quantity: 1,
    },
  });

  // Add product to user's wishlist
  console.log('Adding item to user wishlist...');
  await prisma.wishlistItem.create({
    data: {
      userId: user.id,
      productId: laptopProduct.id,
    },
  });

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 