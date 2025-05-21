import { test, expect } from '@playwright/test';
import { TodoPage } from 'pages/TodoPage';

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await todoPage.goto();
});
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
] as const;

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // Create 1st todo.
    await todoPage.addTodo(TODO_ITEMS[0]);

    // Make sure the list only has one todo item.
    await todoPage.expectTodoItemsToHaveTexts([TODO_ITEMS[0]]);

    // Create 2nd todo.
    await todoPage.addTodo(TODO_ITEMS[1]);

    // Make sure the list now has two todo items.
    await todoPage.expectTodoItemsToHaveTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await todoPage.checkNumberOfTodosInLocalStorage(2);
  });

  test('should clear text input field when an item is added', async ({ page }) => {
    // Create one todo item.
    await todoPage.addTodo(TODO_ITEMS[0]);

    // Check that input is empty.
    await todoPage.expectNewTodoInputToBeEmpty();
    await todoPage.checkNumberOfTodosInLocalStorage(1);
  });

  test('should append new items to the bottom of the list', async ({ page }) => {
    // Create 3 items.
    await todoPage.createDefaultTodos(TODO_ITEMS);

    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await todoPage.expectTodoCountToHaveText('3 items left');
    await todoPage.expectTodoCountToContainText('3');
    await todoPage.expectTodoItemCount(3);

    // Check all items in one call.
    await todoPage.expectTodoItemsToHaveTexts(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }) => {
    await todoPage.createDefaultTodos(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test.afterEach(async ({ page }) => {
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    // Complete all todos.
    await todoPage.markAllAsCompleted();

    // Ensure all todos have 'completed' class.
    await todoPage.expectAllTodoItemsToHaveSpecificClasses(['completed', 'completed', 'completed']);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);
  });

  test('should allow me to clear the complete state of all items', async ({ page }) => {
    // Check and then immediately uncheck.
    await todoPage.markAllAsCompleted();
    await todoPage.unmarkAllAsCompleted();

    // Should be no completed classes.
    await todoPage.expectAllTodoItemsToHaveSpecificClasses(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
    await todoPage.markAllAsCompleted();
    await todoPage.expectToggleAllToBeChecked();
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);

    // Uncheck first todo.
    await todoPage.unmarkTodoAsCompleted(0);

    // Reuse toggleAll locator and make sure its not checked.
    await todoPage.expectToggleAllNotToBeChecked();

    await todoPage.markTodoAsCompleted(0);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(3);

    // Assert the toggle all is checked again.
    await todoPage.expectToggleAllToBeChecked();
  });
});

test.describe('Item', () => {

  test('should allow me to mark items as complete', async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await todoPage.addTodo(item);
    }

    // Check first item.
    await todoPage.markTodoAsCompleted(0);
    await todoPage.expectTodoItemToHaveClass(0, 'completed');

    // Check second item.
    await todoPage.expectTodoItemToNotHaveClass(1, 'completed');
    await todoPage.markTodoAsCompleted(1);

    // Assert completed class.
    await todoPage.expectTodoItemToHaveClass(0, 'completed');
    await todoPage.expectTodoItemToHaveClass(1, 'completed');
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await todoPage.addTodo(item);
    }

    await todoPage.markTodoAsCompleted(0);
    await todoPage.expectTodoItemToHaveClass(0, 'completed');
    await todoPage.expectTodoItemToNotHaveClass(1, 'completed');
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await todoPage.unmarkTodoAsCompleted(0);
    await todoPage.expectTodoItemToNotHaveClass(0, 'completed');
    await todoPage.expectTodoItemToNotHaveClass(1, 'completed');
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(0);
  });

  test('should allow me to edit an item', async ({ page }) => {
    await todoPage.createDefaultTodos(TODO_ITEMS);

    const secondTodoItem = todoPage.getTodoItem(1);
    await secondTodoItem.dblclick();
    await expect(todoPage.getTodoItemEditTextbox(1)).toHaveValue(TODO_ITEMS[1]);
    await todoPage.getTodoItemEditTextbox(1).fill('buy some sausages');
    await todoPage.getTodoItemEditTextbox(1).press('Enter');

    // Explicitly assert the new text value.
    await todoPage.expectTodoItemsToHaveTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
    await todoPage.checkTodosInLocalStorage('buy some sausages');
  });
});

test.describe('Editing', () => {
  test.beforeEach(async ({ page }) => {
    await todoPage.createDefaultTodos(TODO_ITEMS);
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should hide other controls when editing', async ({ page }) => {
    const todoItem = todoPage.getTodoItem(1);
    await todoPage.dblClickTodoItem(1);
    await expect(todoPage.getTodoItemCheckbox(1)).not.toBeVisible();
    await expect(todoPage.getTodoItem(1).locator('label', {
      hasText: TODO_ITEMS[1],
    })).not.toBeVisible();
    await todoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should save edits on blur', async ({ page }) => {
    await todoPage.editTodo(1, 'buy some sausages', 'Blur');

    await todoPage.expectTodoItemsToHaveTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
    await todoPage.checkTodosInLocalStorage('buy some sausages');
  });

  test('should trim entered text', async ({ page }) => {
    await todoPage.editTodo(1, '    buy some sausages    ');

    await todoPage.expectTodoItemsToHaveTexts([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
    await todoPage.checkTodosInLocalStorage('buy some sausages');
  });

  test('should remove the item if an empty text string was entered', async ({ page }) => {
    await todoPage.editTodo(1, '');

    await todoPage.expectTodoItemsToHaveTexts([
      TODO_ITEMS[0],
      TODO_ITEMS[2],
    ]);
  });

  test('should cancel edits on escape', async ({ page }) => {
    await todoPage.dblClickTodoItem(1);
    const editor = todoPage.getTodoItemEditTextbox(1);
    await editor.fill('buy some sausages');
    await editor.press('Escape');
    await todoPage.expectTodoItemsToHaveTexts(TODO_ITEMS);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.expectTodoCountToContainText('1');

    await todoPage.addTodo(TODO_ITEMS[1]);
    await todoPage.expectTodoCountToContainText('2');

    await todoPage.checkNumberOfTodosInLocalStorage(2);
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    await todoPage.createDefaultTodos(TODO_ITEMS);
  });

  test('should display the correct text', async ({ page }) => {
    await todoPage.markTodoAsCompleted(0);
    await todoPage.expectClearCompletedButtonToBeVisible();
  });

  test('should remove completed items when clicked', async ({ page }) => {
    await todoPage.markTodoAsCompleted(1);
    await todoPage.clearCompletedTodos();
    await todoPage.expectTodoItemCount(2);
    await todoPage.expectTodoItemsToHaveTexts([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({ page }) => {
    await todoPage.markTodoAsCompleted(0);
    await todoPage.clearCompletedTodos();
    await todoPage.expectClearCompletedButtonToBeHidden();
  });
});

test.describe('Persistence', () => {
  test('should persist its data', async ({ page }) => {
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await todoPage.addTodo(item);
    }

    await todoPage.markTodoAsCompleted(0);
    await todoPage.expectTodoItemsToHaveTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(todoPage.getTodoItemCheckbox(0)).toBeChecked();
    await todoPage.expectAllTodoItemsToHaveSpecificClasses(['completed', '']);

    // Ensure there is 1 completed item.
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    // Now reload.
    await todoPage.reloadPage();
    await todoPage.expectTodoItemsToHaveTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await expect(todoPage.getTodoItemCheckbox(0)).toBeChecked();
    await todoPage.expectAllTodoItemsToHaveSpecificClasses(['completed', '']);
  });
});

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    await todoPage.createDefaultTodos(TODO_ITEMS);
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
    await todoPage.checkTodosInLocalStorage(TODO_ITEMS[0]);
  });

  test('should allow me to display active items', async ({ page }) => {
    await todoPage.markTodoAsCompleted(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);
    await todoPage.navigateToActive();
    await todoPage.expectTodoItemCount(2);
    await todoPage.expectTodoItemsToHaveTexts([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async ({ page }) => {
    await todoPage.markTodoAsCompleted(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await test.step('Showing all items', async () => {
      await todoPage.navigateToAll();
      await todoPage.expectTodoItemCount(3);
    });

    await test.step('Showing active items', async () => {
      await todoPage.navigateToActive();
    });

    await test.step('Showing completed items', async () => {
      await todoPage.navigateToCompleted();
    });

    await todoPage.expectTodoItemCount(1);
    await todoPage.goBack();
    await todoPage.expectTodoItemCount(2);
    await todoPage.goBack();
    await todoPage.expectTodoItemCount(3);
  });

  test('should allow me to display completed items', async ({ page }) => {
    await todoPage.markTodoAsCompleted(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);
    await todoPage.navigateToCompleted();
    await todoPage.expectTodoItemCount(1);
  });

  test('should allow me to display all items', async ({ page }) => {
    await todoPage.markTodoAsCompleted(1);
    await todoPage.checkNumberOfCompletedTodosInLocalStorage(1);
    await todoPage.navigateToActive();
    await todoPage.navigateToCompleted();
    await todoPage.navigateToAll();
    await todoPage.expectTodoItemCount(3);
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    await todoPage.expectFilterLinkToBeSelected('All');

    await todoPage.navigateToActive();
    await todoPage.expectFilterLinkToBeSelected('Active');

    await todoPage.navigateToCompleted();
    await todoPage.expectFilterLinkToBeSelected('Completed');
  });
});
