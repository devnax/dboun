## dboun

The `dboun` function is a utility designed to limit the rate at which a function is executed. It ensures that the provided function (`fn`) is called only after a specified delay (`delay`) has elapsed since the last invocation. By default, the delay is set to 400 milliseconds.

This is particularly useful for handling events that fire frequently, such as resizing, scrolling, or typing, by preventing the provided function from being called excessively.

## Usage Example
### Scenario: Search Input with Debounce
```typescript
// Define the function to handle search
function handleSearch(query: string): void {
    console.log("Searching for:", query);
}

// Create a debounced version of the search handler
const debouncedSearch = dboun(handleSearch, 300);

// Simulate typing in a search box
const input = document.querySelector('#searchBox');
input?.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLInputElement;
    debouncedSearch(target.value);
});
```
In this example:
- `handleSearch` is the function that handles the search logic.
- `debouncedSearch` ensures that `handleSearch` is executed only after 300 milliseconds of inactivity in typing.


## Parameters
1. **`fn`** (Function): The function to be executed after the debounce delay.
   - This is the callback function that will be invoked after the specified delay.

2. **`delay`** (Number, optional): The number of milliseconds to wait before invoking `fn`. Defaults to 400 milliseconds.
   - This determines the debounce interval.

## Returns
The `dboun` function returns a new debounced version of `fn`. The returned function delays the invocation of `fn` until after `delay` milliseconds have passed since the last time the returned function was called.

## How It Works
- When the returned function is called, it clears any existing timer set for the function (`clearTimeout(timeout)`).
- A new timer is then set (`setTimeout`) to invoke `fn` after the specified `delay`.
- If the returned function is called again before the delay period ends, the previous timer is cleared and reset.


## Practical Applications
1. **Input Handling**: Debouncing prevents excessive execution of event handlers when users type in an input field.
2. **Resize Events**: Manage performance by debouncing window resize event handlers.
3. **Scroll Events**: Avoid performance bottlenecks by controlling how often scroll event handlers are executed.

## Notes
- If you need immediate execution followed by a delay (throttle-like behavior), this function does not provide that functionality out of the box.
- Always ensure `delay` is appropriate for the use case to balance responsiveness and performance.

## Browser Compatibility
The `dboun` function uses modern JavaScript/TypeScript features, making it compatible with most modern environments. For older environments, consider transpiling the code.

## Testing
```typescript
// Test debounced function
const log = dboun((message: string) => console.log(message), 500);
log("Hello"); // Will not log immediately
log("Hello again"); // Resets the timer; only this message will log after 500ms
```

