import { base } from './site.config.mjs';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  workers: 1,
  use: {
    trace: 'retain-on-failure',
    baseURL: 'http://127.0.0.1:4357',
    ...(process.env.CHROME_PATH ? { launchOptions: { executablePath: process.env.CHROME_PATH } } : {}),
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4357 --ignore-lock',
    url: `http://127.0.0.1:4357${base}`,
    reuseExistingServer: false,
  },
});
