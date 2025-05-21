import { type Page, type Locator, expect } from '@playwright/test';

export class TodoPage {
  private readonly newTodoInput: Locator = this.page.getByPlaceholder('What needs to be done?');
  private readonly todoItems: Locator = this.page.getByTestId('todo-item');
  private readonly todoTitles: Locator = this.page.getByTestId('todo-title');
  private readonly todoCount: Locator = this.page.getByTestId('todo-count');
  private readonly toggleAllCheckbox: Locator = this.page.getByLabel('Mark all as complete');
  private readonly clearCompletedButton: Locator = this.page.getByRole('button', { name: 'Clear completed' });
  private readonly allFilterLink: Locator = this.page.getByRole('link', { name: 'All' });
  private readonly activeFilterLink: Locator = this.page.getByRole('link', { name: 'Active' });
  private readonly completedFilterLink: Locator = this.page.getByRole('link', { name: 'Completed' });

  constructor(private readonly page: Page) { }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(itemText: string) {
    await this.newTodoInput.fill(itemText);
    await this.newTodoInput.press('Enter');
  }

  async createDefaultTodos(items: readonly string[]) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  getTodoItem(index: number): Locator {
    return this.todoItems.nth(index);
  }

  getTodoItemCheckbox(index: number): Locator {
    return this.getTodoItem(index).getByRole('checkbox');
  }

  getTodoItemEditTextbox(index: number): Locator {
    return this.getTodoItem(index).getByRole('textbox', { name: 'Edit' });
  }

  async markTodoAsCompleted(index: number) {
    await this.getTodoItemCheckbox(index).check();
  }

  async unmarkTodoAsCompleted(index: number) {
    await this.getTodoItemCheckbox(index).uncheck();
  }

  async dblClickTodoItem(index: number) {
    await this.getTodoItem(index).dblclick();
  }

  async editTodo(index: number, newText: string, submitMethod: 'Enter' | 'Blur' = 'Enter') {
    await this.dblClickTodoItem(index);
    const editor = this.getTodoItemEditTextbox(index);
    await editor.fill(newText);
    if (submitMethod === 'Enter') {
      await editor.press('Enter');
    } else {
      await editor.dispatchEvent('blur');
    }
  }

  async markAllAsCompleted() {
    await this.toggleAllCheckbox.check();
  }

  async unmarkAllAsCompleted() {
    await this.toggleAllCheckbox.uncheck();
  }

  async clearCompletedTodos() {
    await this.clearCompletedButton.click();
  }

  async navigateToAll() {
    await this.allFilterLink.click();
  }

  async navigateToActive() {
    await this.activeFilterLink.click();
  }

  async navigateToCompleted() {
    await this.completedFilterLink.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async checkNumberOfTodosInLocalStorage(expected: number) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
  }

  async checkNumberOfCompletedTodosInLocalStorage(expected: number) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).filter((todo: any) => todo.completed).length === e;
    }, expected);
  }

  async checkTodosInLocalStorage(title: string) {
    return await this.page.waitForFunction(t => {
      return JSON.parse(localStorage['react-todos']).map((todo: any) => todo.title).includes(t);
    }, title);
  }

  async expectTodoItemsToHaveTexts(texts: readonly string[]) {
    await expect(this.todoTitles).toHaveText(texts);
  }

  async expectTodoItemToHaveClass(index: number, className: string | RegExp | (string | RegExp)[]) {
    await expect(this.getTodoItem(index)).toHaveClass(className);
  }

  async expectTodoItemToNotHaveClass(index: number, className: string | RegExp | (string | RegExp)[]) {
    await expect(this.getTodoItem(index)).not.toHaveClass(className);
  }

  async expectAllTodoItemsToHaveSpecificClasses(classes: (string | RegExp)[]) {
    await expect(this.todoItems).toHaveClass(classes);
  }

  async expectTodoCountToContainText(text: string) {
    await expect(this.todoCount).toContainText(text);
  }

  async expectTodoCountToHaveText(text: string) {
    await expect(this.todoCount).toHaveText(text);
  }

  async expectNewTodoInputToBeEmpty() {
    await expect(this.newTodoInput).toBeEmpty();
  }

  async expectToggleAllToBeChecked() {
    await expect(this.toggleAllCheckbox).toBeChecked();
  }

  async expectToggleAllNotToBeChecked() {
    await expect(this.toggleAllCheckbox).not.toBeChecked();
  }

  async expectClearCompletedButtonToBeVisible() {
    await expect(this.clearCompletedButton).toBeVisible();
  }

  async expectClearCompletedButtonToBeHidden() {
    await expect(this.clearCompletedButton).toBeHidden();
  }

  async expectFilterLinkToBeSelected(filterName: 'All' | 'Active' | 'Completed') {
    let linkLocator: Locator;
    if (filterName === 'All') linkLocator = this.allFilterLink;
    else if (filterName === 'Active') linkLocator = this.activeFilterLink;
    else linkLocator = this.completedFilterLink;
    await expect(linkLocator).toHaveClass('selected');
  }

  async expectTodoItemCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }
}