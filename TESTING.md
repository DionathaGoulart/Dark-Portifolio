# Testing Guide

This project uses **Jest** and **React Testing Library** for comprehensive testing of React components, custom hooks, and utility functions.

## 🧪 Testing Stack

- **Jest** - Test runner and assertion library
- **React Testing Library** - React component testing utilities
- **@testing-library/react-hooks** - Custom hooks testing
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom Jest matchers for DOM elements
- **ts-jest** - TypeScript support for Jest

## 📁 Test Structure

```
src/test/
├── setup.ts                    # Global test setup
├── __mocks__/
│   └── fileMock.js            # File import mocks
├── components/                 # React component tests
│   ├── ImageCard.test.tsx
│   └── MasonryGrid.test.tsx
├── hooks/                      # Custom hook tests
│   └── useImageOptimization.test.ts
├── utils/                      # Utility function tests
│   └── imageUtils.test.ts
└── pages/                      # Page component tests
    └── Home.test.tsx
```

## 🚀 Running Tests

### Available Scripts

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI (no watch mode)
npm run test:ci
```

### Coverage Reports

Coverage reports are generated in the `coverage/` directory:
- **HTML Report**: `coverage/lcov-report/index.html`
- **LCOV Report**: `coverage/lcov.info`

## 📋 Testing Guidelines

### Component Testing

Test components focus on **user behavior** rather than implementation details:

```typescript
// ✅ Good - Testing user behavior
test('calls onClick when image is clicked', async () => {
  const user = userEvent.setup()
  const handleClick = jest.fn()
  
  render(<ImageCard image={mockImage} onClick={handleClick} />)
  
  await user.click(screen.getByTestId('image-card'))
  expect(handleClick).toHaveBeenCalledWith(mockImage)
})

// ❌ Bad - Testing implementation details
test('calls setState when clicked', () => {
  // Don't test internal state management
})
```

### Hook Testing

Use `renderHook` for testing custom hooks:

```typescript
test('returns loading state initially', () => {
  const { result } = renderHook(() => useImageOptimization(urls, 'en'))
  
  expect(result.current.loading).toBe(true)
  expect(result.current.images.grid).toEqual([])
})
```

### Utility Testing

Test pure functions with various inputs:

```typescript
test('validates HTTP URLs correctly', () => {
  expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true)
  expect(isValidImageUrl('ftp://example.com/image.jpg')).toBe(false)
  expect(isValidImageUrl('not-a-url')).toBe(false)
})
```

## 🎯 Test Coverage Goals

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## 🔧 Mocking Strategy

### Component Mocks

Mock external dependencies and complex components:

```typescript
// Mock ImageLoader component
jest.mock('@/shared/components/ui/ImageLoader', () => ({
  ImageLoader: ({ src, alt, onLoad, onError, className }: any) => (
    <img
      src={src}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      className={className}
      data-testid="image-loader"
    />
  )
}))
```

### API Mocks

Mock external API calls:

```typescript
// Mock fetch
global.fetch = jest.fn()

// Mock specific API responses
beforeEach(() => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockData)
  })
})
```

### File Mocks

Mock static assets and files:

```typescript
// In jest.config.js
moduleNameMapping: {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/src/test/__mocks__/fileMock.js'
}
```

## 🧩 Test Utilities

### Custom Render Function

Create a custom render function for complex providers:

```typescript
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <I18nProvider>
        {ui}
      </I18nProvider>
    </ThemeProvider>
  )
}
```

### Test Data Factories

Create reusable test data:

```typescript
const createMockImage = (overrides = {}): ImageItem => ({
  id: 'test-id',
  url: 'https://example.com/test.jpg',
  alt: 'Test Image',
  title: 'Test Title',
  ...overrides
})
```

## 🐛 Debugging Tests

### Debug Output

Use `screen.debug()` to see the current DOM:

```typescript
test('debug example', () => {
  render(<MyComponent />)
  screen.debug() // Prints current DOM
})
```

### Query Helpers

Use the right query for your needs:

```typescript
// By role (preferred)
screen.getByRole('button', { name: 'Submit' })

// By test id (when needed)
screen.getByTestId('submit-button')

// By text content
screen.getByText('Submit')

// By label
screen.getByLabelText('Email address')
```

## 🚨 Common Pitfalls

### 1. Testing Implementation Details

```typescript
// ❌ Don't test internal state
expect(component.state.isLoading).toBe(true)

// ✅ Test user-visible behavior
expect(screen.getByText('Loading...')).toBeInTheDocument()
```

### 2. Not Waiting for Async Operations

```typescript
// ❌ Don't forget to wait
fireEvent.click(button)
expect(mockFunction).toHaveBeenCalled()

// ✅ Wait for async operations
await waitFor(() => {
  expect(mockFunction).toHaveBeenCalled()
})
```

### 3. Over-mocking

```typescript
// ❌ Don't mock everything
jest.mock('react', () => ({ ...jest.requireActual('react') }))

// ✅ Only mock what you need
jest.mock('@/shared/utils/api')
```

## 📊 CI/CD Integration

Tests run automatically on:
- **Push** to `main` and `develop` branches
- **Pull Requests** to `main` and `develop` branches

The CI pipeline includes:
1. **Linting** - ESLint checks
2. **Type Checking** - TypeScript compilation
3. **Testing** - Jest test suite with coverage
4. **Building** - Production build verification
5. **Deployment** - Vercel preview/production deployment

## 🔍 Coverage Reports

View detailed coverage reports:
1. Run `npm run test:coverage`
2. Open `coverage/lcov-report/index.html` in your browser
3. Navigate through files to see uncovered lines

## 📚 Additional Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Custom Jest Matchers](https://github.com/testing-library/jest-dom)
