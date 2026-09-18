import { chromium } from "file:///C:/Users/focussdev/orca/credmaisapp/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ headless: true });
const routes = ["/", "/conta", "/cartao", "/empresas", "/seguranca", "/ajuda", "/login"];
const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 1000 },
];
await mkdir("qa-output", { recursive: true });
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`http://127.0.0.1:5174${route}`, { waitUntil: "networkidle" });
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector("h1")?.textContent?.trim() || "",
      images: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
    }));
    const slug = route === "/" ? "home" : route.slice(1);
    await page.screenshot({ path: `qa-output/${viewport.name}-${slug}.png`, fullPage: route === "/" && viewport.name !== "desktop-1440" });
    report.push({ viewport: viewport.name, route, status: response?.status(), overflow: metrics.scrollWidth - metrics.width, h1: metrics.h1, brokenImages: metrics.images.length, errors });
    await page.close();
  }
  await context.close();
}

console.log(JSON.stringify(report, null, 2));
await browser.close();
