import { type Page, type Locator, expect } from "@playwright/test";

export class TodoPage {
  private readonly newTodoInput: Locator = this.page.getByPlaceholder("What needs to be done?");
  private readonly todoItems: Locator = this.page.getByTestId("todo-item");
  private readonly todoTitles: Locator = this.page.getByTestId("todo-title");
  private readonly todoCount: Locator = this.page.getByTestId("todo-count");
  private readonly toggleAllCheckbox: Locator = this.page.getByLabel("Mark all as complete");
  private readonly clearCompletedButton: Locator = this.page.getByRole("button", { name: "Clear completed" });
  private readonly allFilterLink: Locator = this.page.getByRole("link", { name: "All" });
  private readonly activeFilterLink: Locator = this.page.getByRole("link", { name: "Active" });
  private readonly completedFilterLink: Locator = this.page.getByRole("link", { name: "Completed" });

  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("https://demo.playwright.dev/todomvc");
  }

  async addTodo(itemText: string): Promise<void> {
    await this.newTodoInput.fill(itemText);
    await this.newTodoInput.press("Enter");
  }

  async createDefaultTodos(items: readonly string[]): Promise<void> {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  getTodoItem(index: number): Locator {
    return this.todoItems.nth(index);
  }

  getTodoItemCheckbox(index: number): Locator {
    return this.getTodoItem(index).getByRole("checkbox");
  }

  getTodoItemEditTextbox(index: number): Locator {
    return this.getTodoItem(index).getByRole("textbox", { name: "Edit" });
  }

  async markTodoAsCompleted(index: number): Promise<void> {
    await this.getTodoItemCheckbox(index).check();
  }

  async unmarkTodoAsCompleted(index: number): Promise<void> {
    await this.getTodoItemCheckbox(index).uncheck();
  }

  async dblClickTodoItem(index: number): Promise<void> {
    await this.getTodoItem(index).dblclick();
  }

  async editTodo(index: number, newText: string, submitMethod: "Enter" | "Blur" = "Enter"): Promise<void> {
    await this.dblClickTodoItem(index);
    const editor = this.getTodoItemEditTextbox(index);
    await editor.fill(newText);
    if (submitMethod === "Enter") {
      await editor.press("Enter");
    } else {
      await editor.dispatchEvent("blur");
    }
  }

  async markAllAsCompleted(): Promise<void> {
    await this.toggleAllCheckbox.check();
  }

  async unmarkAllAsCompleted(): Promise<void> {
    await this.toggleAllCheckbox.uncheck();
  }

  async clearCompletedTodos(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async navigateToAll(): Promise<void> {
    await this.allFilterLink.click();
  }

  async navigateToActive(): Promise<void> {
    await this.activeFilterLink.click();
  }

  async navigateToCompleted(): Promise<void> {
    await this.completedFilterLink.click();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async expectTodoItemsToHaveTexts(texts: readonly string[]): Promise<void> {
    await expect(this.todoTitles).toHaveText(texts);
  }

  async expectTodoItemToHaveClass(index: number, className: string | RegExp | (string | RegExp)[]): Promise<void> {
    await expect(this.getTodoItem(index)).toHaveClass(className);
  }

  async expectTodoItemToNotHaveClass(index: number, className: string | RegExp | (string | RegExp)[]): Promise<void> {
    await expect(this.getTodoItem(index)).not.toHaveClass(className);
  }

  async expectAllTodoItemsToHaveSpecificClasses(classes: (string | RegExp)[]): Promise<void> {
    await expect(this.todoItems).toHaveClass(classes);
  }

  async expectTodoCountToContainText(text: string): Promise<void> {
    await expect(this.todoCount).toContainText(text);
  }

  async expectTodoCountToHaveText(text: string): Promise<void> {
    await expect(this.todoCount).toHaveText(text);
  }

  async expectNewTodoInputToBeEmpty(): Promise<void> {
    await expect(this.newTodoInput).toBeEmpty();
  }

  async expectToggleAllToBeChecked(): Promise<void> {
    await expect(this.toggleAllCheckbox).toBeChecked();
  }

  async expectToggleAllNotToBeChecked(): Promise<void> {
    await expect(this.toggleAllCheckbox).not.toBeChecked();
  }

  async expectClearCompletedButtonToBeVisible(): Promise<void> {
    await expect(this.clearCompletedButton).toBeVisible();
  }

  async expectClearCompletedButtonToBeHidden(): Promise<void> {
    await expect(this.clearCompletedButton).toBeHidden();
  }

  async expectFilterLinkToBeSelected(filterName: "All" | "Active" | "Completed"): Promise<void> {
    let linkLocator: Locator;
    if (filterName === "All") linkLocator = this.allFilterLink;
    else if (filterName === "Active") linkLocator = this.activeFilterLink;
    else linkLocator = this.completedFilterLink;
    await expect(linkLocator).toHaveClass("selected");
  }

  async expectTodoItemCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }
}
