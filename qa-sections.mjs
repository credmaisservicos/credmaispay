import { chromium } from "file:///C:/Users/focussdev/orca/credmaisapp/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ headless: true });
await mkdir("qa-output/sections", { recursive: true });

for (const viewport of [{ name: "desktop", width: 1440, height: 1000 }, { name: "mobile", width: 375, height: 812 }]) {
  const page = await browser.newPage({ viewport });
  for (const route of ["conta", "cartao", "empresas", "seguranca", "ajuda"]) {
    await page.goto(`http://127.0.0.1:5174/${route}`, { waitUntil: "networkidle" });
    const banner = page.locator(".campaign-banner");
    await banner.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await banner.screenshot({ path: `qa-output/sections/${viewport.name}-${route}-banner.png` });
  }
  await page.goto("http://127.0.0.1:5174/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `qa-output/sections/${viewport.name}-login.png`, fullPage: true });
  await page.close();
}

await browser.close();
