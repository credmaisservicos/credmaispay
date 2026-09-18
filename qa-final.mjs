import { chromium } from "file:///C:/Users/focussdev/orca/credmaisapp/node_modules/playwright/index.mjs";

const browser = await chromium.launch({ headless: true });
const routes = ["/", "/conta", "/cartao", "/empresas", "/seguranca", "/ajuda", "/login"];
const report = [];

for (const viewport of [{ name: "mobile", width: 375, height: 812 }, { name: "desktop", width: 1440, height: 1000 }]) {
  const page = await browser.newPage({ viewport });
  for (const route of routes) {
    const errors = [];
    const listener = (message) => { if (message.type() === "error") errors.push(message.text()); };
    page.on("console", listener);
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`http://127.0.0.1:5174${route}`, { waitUntil: "networkidle" });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (const progress of [.2, .4, .6, .8, 1]) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), Math.round(height * progress));
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(300);
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      unloadedImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
      headings: document.querySelectorAll("h1").length,
      tinyTargets: [...document.querySelectorAll("a,button,summary,input,select,textarea")].filter((element) => {
        const box = element.getBoundingClientRect();
        const labelBox = element.closest("label")?.getBoundingClientRect();
        if (labelBox && labelBox.width >= 36 && labelBox.height >= 36) return false;
        return box.width > 0 && box.height > 0 && (box.width < 36 || box.height < 36);
      }).map((element) => ({ tag: element.tagName, text: element.textContent?.trim().slice(0, 28), width: Math.round(element.getBoundingClientRect().width), height: Math.round(element.getBoundingClientRect().height) })),
    }));
    report.push({ viewport: viewport.name, route, status: response?.status(), errors, ...metrics });
    page.removeListener("console", listener);
  }
  await page.close();
}

const interaction = await browser.newPage({ viewport: { width: 375, height: 812 } });
await interaction.goto("http://127.0.0.1:5174/login", { waitUntil: "networkidle" });
await interaction.getByRole("button", { name: "Meu negócio" }).click();
await interaction.getByRole("button", { name: "Mostrar senha" }).click();
await interaction.getByRole("textbox", { name: "CNPJ" }).fill("12345678000190");
await interaction.getByLabel("Senha", { exact: true }).fill("demonstracao");
await interaction.getByRole("button", { name: "Acessar minha conta" }).click();
const loginFeedback = await interaction.locator(".login-feedback").innerText();
await interaction.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
await interaction.getByRole("button", { name: "Abrir menu" }).click();
const mobileMenuVisible = await interaction.getByRole("link", { name: "Acessar conta" }).isVisible();

console.log(JSON.stringify({ report, interactions: { loginFeedback, mobileMenuVisible } }, null, 2));
await interaction.close();
await browser.close();
