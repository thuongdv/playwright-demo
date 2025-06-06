import { test, expect } from "@playwright/test";

test("should load the book app and display books", async ({ page }) => {
  await page.goto("https://books-pwakit.appspot.com/");
  const searchBox = page.getByRole("searchbox", { name: "Search Books" });
  await searchBox.fill("playwright");
  await searchBox.press("Enter");
  await page.waitForTimeout(5_000);

  const books = await page.locator("book-item a").allTextContents();
  expect(books.length).toBeGreaterThan(0);
  console.log("Found " + books.length + " books");
  for (const book of books) {
    expect(book).toMatch(/playwright/i);
  }
});
