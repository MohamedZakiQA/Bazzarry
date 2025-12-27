# QA Handover & Manual Testing Portfolio
**Project:** SauceDemo Cart & Checkout
**Role:** Senior QA Engineer Assessment
**Prepared by:** Mohamed Zaki
**Date:** December 27, 2025

---

## Table of Contents
1. [Requirement Analysis & Insights](#1-requirement-analysis--insights)
2. [Testing Strategy & Types](#2-testing-strategy--types)
3. [Test Case Prioritization](#3-test-case-prioritization)
4. [Manual Test Cases (ISTQB V4.0)](#4-manual-test-cases-istqb-v40)
5. [Known Issues & Bug Report](#5-known-issues--bug-report)

---

## 1. Requirement Analysis & Insights

### 🔍 Strategic Review
A comprehensive review of the "Manage Product Discounts" story revealed that the primary business objective is the **Cart & Checkout** lifecycle.

### 💡 Key Discoveries
- **Title Discrepancy**: Identified that while the title mentions "Discounts," the Acceptance Criteria and Story are 100% focused on Cart/Checkout. The strategy was pivoted to ensure these business-critical areas are prioritized.
- **Clarification Questions**:
  - *Cart Dynamics*: Does the system support multiple quantities of the same item? (Assumed: No).
  - *Data Persistence*: Does the cart survive logout? (Assumed: No).
  - *Edge Case*: Is checkout allowed with an empty cart? (Assumed: Should be blocked).

### 📋 Testing Assumptions
1. **Single Quantity**: Each product can only be added once (enforced by UI).
2. **Session Limit**: Checkout must be completed efficiently to avoid observed timeout redirects.
3. **No Complex Validation**: Current form accepts most text inputs, focusing on "Missing Field" validation.

---

## 2. Testing Strategy & Types

To ensure the "30-second explainability" of this project, the following testing types were selected:

- **Functional Testing**: Validating each feature against Acceptance Criteria (Add, Remove, Checkout).
- **End-to-End (E2E) Testing**: Verifying the "Happy Path" journey from Login to Purchase.
- **Regression Testing**: Ensuring that the core automated suite runs on every change.
- **Smoke Testing**: Quick manual/automated check of the critical "Standard User" login path.
- **UI Testing**: Ensuring visual feedback (cart badges, button state changes) is consistent.

---

## 3. Test Case Prioritization

### 🎯 Prioritization Logic
The suite is categorized into **P0, P1, and P2** tiers based on:
1. **Business Risk**: Can the user finish the order?
2. **Acceptance Criteria**: Does it directly satisfy the requirement document?
3. **Data Integrity**: Are the prices and names consistent?

| Priority | Status | Count | Logic |
|----------|--------|-------|-------|
| **P0**   | Critical| 5     | Must work for release (Revenue Path) |
| **P1**   | High    | 1     | Important user experience (Validation) |

---

## 4. Manual Test Cases (ISTQB V4.0)

| TC ID | Scenario | Priority | Precondition | Steps | Expected Result |
|-------|----------|----------|--------------|-------|-----------------|
| **TC-001** | Add Product to Cart | P0 | Logged in | 1. Click "Add to Cart" on Backpack | Button changes to "Remove", Badge shows "1" |
| **TC-002** | Remove from Cart | P0 | Item in cart | 1. Click "Remove" in Cart Page | Item disappears, Badge cleared |
| **TC-003** | Complete Checkout| P0 | Items in cart| 1. Fill Info<br>2. Click Finish | "Thank you for your order!" message |
| **TC-004** | Missing First Name| P1 | Info Page | 1. Leave First Name empty<br>2. Click Continue | Error: "First Name is required" |
| **TC-005** | Detail Consistency| P0 | Product View | 1. Compare Price on Home vs Cart vs Finish | Price stays $29.99 on all pages |
| **TC-006** | Full E2E Journey | P0 | Logged in | 1. Add 3, Remove 1, Checkout | Badge 3 -> 2 -> Order Success |

---

## 5. Known Issues & Bug Report

### 🔴 High Severity: Session Timeout
- **Description**: During the checkout process, the user session times out after approximately 60 seconds of inactivity.
- **Observed Behavior**: User is force-redirected to the login page.
- **Impact**: All cart data and half-filled forms are lost.
- **Recommendation**: Implement a session heartbeat or extend the timeout during the checkout funnel to prevent customer drop-off.

---
**Senior QA Handover Complete**
*Playwright Automation scripts included in the `tests/` directory.*
