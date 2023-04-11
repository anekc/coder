const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProductsFromFile();
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Debe incluir todos los parámetros.');
      return;
    }

    const foundCode = this.products.find((product) => product.code === code);
    if (foundCode) {
      console.error('El código ya existe previamente.');
      return;
    }

    const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

    const product = { id, title, description, price, thumbnail, code, stock };
    this.products.push(product);
    this.saveProductsToFile();
    console.log('Producto agregado:', product);
  }

  getProducts() {
    console.log('Productos:', this.products);
  }

  getProductById(id) {
    if (!id) {
      console.error('Debe ingresar un ID de búsqueda.');
      return;
    }

    const foundProduct = this.products.find((product) => product.id === id);
    if (!foundProduct) {
      console.error('Producto no encontrado.');
      return;
    }

    console.log('Producto encontrado:', foundProduct);
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync('./products.json');
      this.products = JSON.parse(data);
    } catch (error) {
      console.warn('No se pudo cargar los productos desde el archivo:', error.message);
    }
  }

  saveProductsToFile() {
    fs.writeFile('./products.json', JSON.stringify(this.products, null, 2), (error) => {
      if (error) {
        console.error('No se pudo guardar el producto en el archivo:', error.message);
      } else {
        console.log('Producto guardado en el archivo.');
      }
    });
  }
}

const productManager = new ProductManager();

productManager.getProducts();

productManager.addProduct({
  title: 'Producto de prueba',
  description: 'Este es un producto de prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25,
});

productManager.getProducts();

productManager.addProduct({
  title: 'Producto de prueba 2',
  description: 'Este es otro producto de prueba',
  price: 300,
  thumbnail: 'Sin imagen',
  code: 'def456',
  stock: 10,
});

productManager.getProducts();

productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(3);
