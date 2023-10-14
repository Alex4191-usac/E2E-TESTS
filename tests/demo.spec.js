const { expect, test } = require('@playwright/test');

//beforeEach 
test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
});

test('should load TODO APP', async ({ page }) => {
    await expect(page).toHaveTitle('React • TodoMVC');
});

const TODO_ITEMS = [
    'gane AYD1',
    'perdi AYD1',
    'termine el proyecto AYD1'
]

test.describe('New Todo', () => {
    test('should add a new todo to the list', async ({ page }) => {
        //<input class="new-todo" placeholder="What needs to be done?">
        const newTodo = page.getByPlaceholder('What needs to be done?')

        await newTodo.fill(TODO_ITEMS[0]);
        //press to do actions with keyboard
        await newTodo.press('Enter');

        //<label data-testid="todo-title">hola</label>
        //make shure the list only has one todo item
        await expect(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0]
        ]);
    
    });
});

//createDefaulttodos

async function createDefaultTodos(page) {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    for (const todo of TODO_ITEMS) {
        await newTodo.fill(todo);
        await newTodo.press('Enter');
    }
};

test.describe('Mark all as completed', () => {
    test.beforeEach(async ({ page }) => {
        await createDefaultTodos(page);
    });

    test('should allow me to mark all items as completed', async ({ page }) => {
        await page.getByLabel('Mark all as complete').check();
        await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
    });


});