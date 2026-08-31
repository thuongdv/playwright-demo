import { expect, Locator, Page } from "fixtures/base-fixture";
import { Product } from "models/product";
import NumberUtils from "utils/number-utils";

export default class ProductCategoryPage {
  readonly productList: Locator = this.page.locator(".row.products");
  readonly productListItems: Locator = this.productList.locator(".content-product");

  readonly productAddedMessage: Locator = this.page.getByText("Product added");

  constructor(private readonly page: Page) {}

  async addRandomProductToCart(numberOfProducts: number): Promise<Product[]> {
    await expect(this.productListItems).toHaveCountGTE(numberOfProducts);

    const randomProducts = NumberUtils.getRandomNumbersInRange(
      0,
      (await this.productListItems.count()) - 1,
      numberOfProducts,
    );

    const products: Product[] = [];

    for (const index of randomProducts) {
      const productItem = this.productListItems.nth(index);
      const product = await this.getProductInfo(productItem);
      products.push(product);

      await this.addProductToCart(productItem);
    }

    return products;
  }

  private async addProductToCart(product: Locator): Promise<void> {
    const addToCartButton = product.getByText("Add to cart");
    await addToCartButton.first().click();

    await expect(this.productAddedMessage).toBeVisible();
    await expect(this.productAddedMessage).not.toBeVisible();
  }

  private async getProductInfo(product: Locator): Promise<Product> {
    const title = await product.locator(".product-title").innerText();
    const price = await product.locator(".price").innerText();

    return {
      title: title?.trim() || "",
      price: NumberUtils.extractNumber(price || ""),
    };
  }
}
