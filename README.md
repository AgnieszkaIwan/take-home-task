## Rules

- add/remove/modify existing code to achieve the end result (some code needs a refactor)
- don't install additional packages
- you need to use `zustand`, but it's up to you to decide what state should be global
- write the code like it's a real feature

### Cards

- add expand/collapse functionality
- make sure the "Delete" button works
- add animations

### Deleted Cards

- display the number of deleted cards
- reveal deleted cards after user clicks the "Reveal" button - deleted card variant shouldn't contain the description
- write the code, so in the future you will be able to add "revert" functionality

### Behavior

- cards by default should be collapsed
- expanded/deleted cards' state needs to be persisted after "refreshing" (regardless of isVisible property)
- "refresh" functionality needs to be implemented using `react-query`

### Miscellaneous

- add a "Refresh" button (just like the "Reveal" button)
- create generic `<ToggleButton />`

### Additional

You may leave a message explaining your coding choices, but it's not necessary.
Testing framework isn't installed, so instead just explain whether you think it's a good or bad idea to write tests for this feature or how to approach it.

# Coding Choices and Testing Approach

## Coding Choices

### 1. Global State Management

The `expandedCards` and `deletedCards` state are stored globally, making it easier to handle persistence and restoration after a page refresh.

### 2. Generic `ToggleButton` Component

To ensure modularity and reusability, I created a generic `ToggleButton` component. This approach helps in avoiding code duplication and makes the code more maintainable.

- The `ToggleButton` is used for both expanding/collapsing the cards and revealing deleted cards, ensuring a consistent UI/UX while reducing the complexity of the components.

### 3. Persistence Using `zustand/persist`

State persistence is handled through `zustand/persist` middleware, allowing us to store expanded and deleted card states in `localStorage` and maintain those states across page refreshes.

- Additionally I have decided to implement resetting the state on refresh, a `resetState` function was added, which provides flexibility in managing the initial state of the application.

### 4. Flexible `Card` Component (`canExpand`, `canDelete`)

The `Card` component was extended with properties `canExpand` and `canDelete` to adapt to different requirements. This approach allows us to display deleted cards without options for expanding or deleting them again.

- This flexibility makes the `Card` component more versatile and reusable in different contexts of the application.

### 5. Animation for Expanding Cards

Animations were implemented using simple CSS transitions (`max-height`, `transition`). This enhances user experience by making card expansion smoother. Initial height and `max-height` were carefully adjusted to avoid issues with cards being invisible.

## Testing Approach

### Should We Write Tests for This Solution?

In my opinion, writing tests for this functionality would be **a good idea** for several reasons:

#### 1. Unit Tests

- **Component States**: Unit tests should be written to ensure that state management functions (`toggleCardExpand`, `deleteCard`, `resetState`) work as expected.
- **Zustand Logic**: Testing Zustand logic would help verify that the global state is properly updated after each operation.

#### 2. Component Tests

- **Card Component**: The `Card` component is a key part of the application, so it should be tested to ensure that it reacts properly to state changes (`canExpand`, `canDelete`, and whether the appropriate buttons are rendered).
- **ToggleButton Component**: Tests should ensure that the `ToggleButton` correctly toggles states (`isToggled`) and displays the appropriate icon.

#### 3. Integration Tests

- **Application Behavior After Refresh**: Integration tests would verify whether the state of cards is properly maintained or reset after a page refresh.
- **React Query Interaction**: It would also be useful to test if the refresh functionality (`refetch`) properly updates the components.

#### 4. End-to-End (E2E) Tests

- **User Flow**: E2E tests (e.g., with Cypress) would be useful for testing the entire user flow, including expanding cards, deleting them, refreshing, and revealing deleted cards.
- **State Persistence**: E2E tests could verify that the application's state is persisted correctly across sessions.

### Summary: Is Testing Worth It?

- **Yes**, writing unit, integration, and end-to-end tests for this application is highly recommended. It would help ensure code quality and detect regressions.
- Even though a testing framework is not installed, unit and component tests would be relatively straightforward to implement using tools like **Jest** and **React Testing Library**.
- For larger teams, tests would also serve as a form of documentation for the expected behavior of each feature, simplifying future maintenance and development.
