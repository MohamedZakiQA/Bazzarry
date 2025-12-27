# SauceDemo E-commerce Testing - Senior QA Assessment

**Test Website:** https://www.saucedemo.com/v1/
**Framework:** Playwright + TypeScript
**Design:** Page Object Model

---

## Automated Test Suite (6 Tests)

All tests are tagged for easy filtering (e.g., `npx playwright test --grep @smoke`).

| ID | Feature | Description | Tags |
|----|---------|-------------|------|
| **TC-001** | Add to Cart | Add single product and verify badge | `@p0`, `@smoke` |
| **TC-002** | Remove from Cart | Remove product and verify empty cart | `@p0`, `@smoke` |
| **TC-003** | Checkout (Happy) | Complete checkout with valid info | `@p0`, `@smoke` |
| **TC-004** | Checkout (Error) | Validate missing first name error | `@p1`, `@regression` |
| **TC-005** | Product Sync | Verify details consistent across pages | `@p0`, `@regression` |
| **TC-006** | End-to-End | Full journey: Add, Remove, Checkout | `@p2`, `@regression` |

---

## Project Structure

```
qa-assessment/
├── fixtures/             # baseTest.ts (loggedInPage fixture)
├── pages/                # Simplified Page Object Model classes
├── tests/                # Automated tests (TC-001 to TC-006)
└── utils/                # testData.ts
```

---

## Execution
cd qa-assessment
npm install && npm run install:browsers

```powershell
# Run all tests
npm test

# Run only Smoke tests (Critical paths)
npx playwright test --grep @smoke

# Run with visible browser
npm run test:headed
```

---

## Key Design Decisions

- **Direct Native Access**: Using native Playwright methods instead of excessive wrapper layers to reduce maintenance overhead and leverage built-in auto-waiting.
- **Tagged Execution**: Inclusion of `@p0/p1` and `@smoke/@regression` tags to enable risk-based test execution.
- **Explicit POs**: Page Objects are instantiated directly inside tests for maximum readability.
