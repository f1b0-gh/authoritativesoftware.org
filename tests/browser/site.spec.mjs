import { sitePath } from '../../site.config.mjs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('read the introduction, open the example, and reach both adoption paths', async ({ page }, testInfo) => {
  await page.goto(sitePath('/'));
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Who stands');
  await page.screenshot({ path: `.local/home-${testInfo.project.name}.png`, fullPage: true });
  const disclosure = page.getByText('Does this guarantee that fixes will arrive?');
  await disclosure.click();
  await expect(page.locator('details p')).toBeVisible();
  await page.getByRole('link', { name: /Read the publisher guide/ }).click();
  await expect(page).toHaveURL(/\/use-it\/#for-publishers$/);
  await expect(page.getByRole('heading', { name: 'For publishers', exact: true })).toBeVisible();
  await page.goto(sitePath('/'));
  await page.getByRole('link', { name: /Read the consumer guide/ }).click();
  await expect(page).toHaveURL(/\/use-it\/#for-consumers$/);
});

test('all reading pages fit the viewport and pass automated accessibility checks', async ({ page }) => {
  for (const path of ['/', '/why-now/', '/understanding-authority/', '/use-it/', '/examples/', '/related-practices/', '/declaration/', '/about/']) {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(sitePath(path));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations, path).toEqual([]);
    expect(errors).toEqual([]);
  }
});

test('the declaration and guides remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4357${sitePath('/declaration/')}`);
  await expect(page.getByRole('heading', { name: 'Principles', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Implementation', exact: true })).toBeVisible();
  await page.goto(`http://127.0.0.1:4357${sitePath('/use-it/')}`);
  await expect(page.getByRole('heading', { name: 'For consumers', exact: true })).toBeVisible();
  await page.goto(`http://127.0.0.1:4357${sitePath('/examples/')}`);
  await expect(page.locator('[data-example-date="issued"]').first()).toHaveText('30 days ago');
  await expect(page.locator('[data-example-date="expired"]').first()).toHaveText('yesterday');
  await expect(page.locator('[data-example-date="commitment"]').first()).toHaveText('the end of next year');
  await context.close();
});

test('keyboard users can skip navigation', async ({ page }) => {
  await page.goto(sitePath('/'));
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('content reflows at a 320 pixel viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const path of ['/', '/declaration/', '/use-it/', '/examples/', '/related-practices/']) {
    await page.goto(sitePath(path));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
  }
});


test('missing routes return a useful 404 without a canonical URL', async ({ page }) => {
  const response = await page.goto(sitePath('/this-page-does-not-exist/'));
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("This page isn't here.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await page.getByRole('link', { name: 'Back to the introduction' }).click();
  await expect(page).toHaveURL(`http://127.0.0.1:4357${sitePath('/')}`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Who stands');
});


test('design system remains readable in dark mode and loads fonts locally', async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  const remoteFonts = [];
  page.on('request', request => { if (request.resourceType() === 'font' && new URL(request.url()).hostname !== '127.0.0.1') remoteFonts.push(request.url()); });
  for (const path of ['/', '/declaration/', '/about/', '/examples/', '/related-practices/', '/understanding-authority/']) {
    await page.goto(sitePath(path));
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator('html').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(15, 20, 27)');
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations, path).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
  }
  expect(remoteFonts).toEqual([]);
  expect(await page.evaluate(() => document.fonts.check('16px "IBM Plex Sans"') && document.fonts.check('18px "Source Serif 4"'))).toBe(true);
  await page.getByRole('link', { name: 'artifact', exact: true }).first().click();
  await expect(page).toHaveURL(/\/declaration\/#definition-artifact$/);
  await expect(page.locator('#definition-artifact')).toBeInViewport();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AUTHORITY.md');
  await page.screenshot({ path: `.local/declaration-dark-${testInfo.project.name}.png`, fullPage: true });
});

test('print preserves declaration identity, status, date and provision markers', async ({ page }) => {
  await page.goto(sitePath('/declaration/'));
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AUTHORITY.md');
  await expect(page.getByRole('note', { name: 'Declaration status' })).toBeVisible();
  await expect(page.locator('.as-status time')).toHaveAttribute('datetime', '2026-11-24');
  await expect(page.locator('.as-provision__label').filter({ hasText: 'Declaration text' })).toHaveCount(8);
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(255, 255, 255)');
});


test('supplied logo variants and cover palette are visible', async ({ page }) => {
  for (const scheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto(sitePath('/'));
    const logo = page.locator('.site-header .brand-mark img');
    await expect(logo).toBeVisible();
    await expect.poll(() => logo.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    const url = await logo.evaluate(img => img.currentSrc);
    const expected = await page.locator('.site-header .brand-mark').evaluate((picture, scheme) => scheme === 'dark' ? picture.querySelector('source').srcset : picture.querySelector('img').src, scheme);
    expect(url).toBe(expected);
    await expect(page.locator('.home-cover .brand-band')).toBeVisible();
    expect(await page.locator('.brand-band .c-soft').evaluate(el => getComputedStyle(el).fill)).toBe(scheme === 'dark' ? 'rgb(92, 116, 214)' : 'rgb(112, 136, 234)');
    await expect(page.locator('.site-header .brand')).toHaveCSS('font-family', /Source Serif 4/);
  }
});


test.describe('rolling fictional dates', () => {
  test.use({ timezoneId: 'America/Los_Angeles' });

  test('keeps dates consistent across pages, leap days and a new year', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2028-03-01T23:30:00-08:00'));
    await page.goto(sitePath('/examples/'));
    await expect(page.locator('main')).toContainText('1 March 2028');
    await expect(page.locator('[data-example-date="issued"]').first()).toHaveText('31 January 2028');
    await expect(page.locator('[data-example-date="expired"]').first()).toHaveText('29 February 2028');
    await expect(page.locator('[data-example-date="commitment"]').first()).toHaveText('31 December 2029');
    await expect(page.locator('[data-example-date="delegation"]')).toHaveText('30 May 2028');
    for (const path of ['/', '/use-it/', '/understanding-authority/', '/related-practices/']) {
      await page.goto(sitePath(path));
      await expect(page.locator('[data-example-date="commitment"]').first()).toHaveAttribute('datetime', '2029-12-31');
    }
    await page.clock.setFixedTime(new Date('2029-01-01T00:01:00-08:00'));
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    await expect(page.locator('[data-example-date="commitment"]').first()).toHaveText('31 December 2030');
    await page.goto(sitePath('/examples/'));
    await expect(page.locator('[data-example-date="issued"]').first()).toHaveText('2 December 2028');
    await expect(page.locator('[data-example-date="expired"]').first()).toHaveText('31 December 2028');
    await expect(page.locator('[data-example-date="reference"]').first()).toHaveText('1 January 2029');
  });
});
