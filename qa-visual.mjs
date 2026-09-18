import { chromium } from "file:///C:/Users/focussdev/orca/credmaisapp/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ headless: true });
await mkdir("qa-output/refined", { recursive: true });
const checks = [];

for (const viewport of [{ name: "mobile", width: 375, height: 812 }, { name: "desktop", width: 1440, height: 1000 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const stops = [0, .14, .28, .42, .56, .7, .84, 1];
  for (let index = 0; index < stops.length; index += 1) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), Math.round((fullHeight - viewport.height) * stops[index]));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `qa-output/refined/${viewport.name}-${index + 1}.png` });
  }
  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    unloadedImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
    tinyTargets: [...document.querySelectorAll("a,button,summary,input,select,textarea")].filter(element => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && (box.width < 36 || box.height < 36);
    }).map(element => {
      const box = element.getBoundingClientRect();
      return { tag: element.tagName, text: element.textContent.trim().slice(0, 35), className: element.className, width: Math.round(box.width), height: Math.round(box.height) };
    }),
  }));
  checks.push({ viewport: viewport.name, errors, ...metrics });
  await page.close();
}

console.log(JSON.stringify(checks, null, 2));
await browser.close();
