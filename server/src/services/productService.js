const prisma = require('../config/database');
const { AppError } = require('../middleware/errorHandler');

class ProductService {
  async getAllProducts(filters = {}) {
    const { status = 'approved', category, search } = filters;
    
    const where = { status };
    
    if (category && category !== 'All') {
      where.categories = { has: category }; // PostgreSQL array contains
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        reviews: {
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        vendor: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { launchDate: 'desc' },
    });

    // Categories are now native arrays, no need to parse
    return products;
  }

  async getProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        vendor: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Categories are now native arrays
    return product;
  }

  async createProduct(productData, vendorId) {
    const { categories, ...rest } = productData;
    
    const product = await prisma.product.create({
      data: {
        ...rest,
        categories: Array.isArray(categories) ? categories : [categories], // Ensure array
        vendorId,
      },
    });

    // Categories are already arrays
    return product;
  }

  async upvoteProduct(id) {
    const product = await prisma.product.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });

    return product;
  }

  async updateProductStatus(id, status) {
    const product = await prisma.product.update({
      where: { id },
      data: { status },
    });

    return product;
  }

  async getPendingProducts() {
    const products = await prisma.product.findMany({
      where: { status: 'pending' },
      include: {
        vendor: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { launchDate: 'desc' },
    });

    // Categories are now native arrays
    return products;
  }
}

module.exports = new ProductService();
