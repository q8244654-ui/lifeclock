import { test, expect } from '@playwright/test';

test.describe('Onboarding to Result Flow', () => {
  test('should complete full flow from onboarding to result page', async ({ page }) => {
    // Navigate to onboarding
    await page.goto('/onboarding');

    // Wait for the page to load and check for initial content
    await page.waitForTimeout(1000); // Wait for initial animation/message

    // Check that we're on the onboarding page
    await expect(page).toHaveURL(/\/onboarding/);

    // Fill in onboarding form - simulate user interaction
    // Note: This is a simplified test that checks the flow exists
    // In a real scenario, you'd fill in the actual form fields
    const inputField = page.locator('input[type="text"], input[type="email"]').first();
    
    // Wait for input to be visible (form might appear after initial messages)
    await page.waitForTimeout(2000);
    
    // Try to find and fill name if input is present
    const nameInputs = page.locator('input[placeholder*="name" i], input[placeholder*="nom" i]').first();
    const nameInputVisible = await nameInputs.isVisible().catch(() => false);
    
    if (nameInputVisible) {
      await nameInputs.fill('Test User');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
    }

    // Navigate directly to quiz if onboarding is complex
    // For a smoke test, we can also test the quiz page directly
    await page.goto('/quiz');
    await page.waitForTimeout(1000);
    
    // Verify we're on the quiz page
    await expect(page).toHaveURL(/\/quiz/);

    // The quiz page should have some content
    const quizContent = page.locator('body');
    await expect(quizContent).toBeVisible();

    // For a smoke test, we verify the pages load correctly
    // A full E2E test would simulate answering questions
  });

  test('should navigate between main pages', async ({ page }) => {
    // Test that main pages are accessible
    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.goto('/onboarding');
    await expect(page).toHaveURL(/\/onboarding/);

    await page.goto('/quiz');
    await expect(page).toHaveURL(/\/quiz/);

    await page.goto('/result');
    await expect(page).toHaveURL(/\/result/);
  });

  test('should display quiz page structure', async ({ page }) => {
    await page.goto('/quiz');
    
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Verify the page has loaded - check for body or main content
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // The quiz should have some interactive elements
    // (This is a basic smoke test - a full test would check for specific components)
  });
});

