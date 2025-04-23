import { test, expect, Page } from "@playwright/test";

test.describe("検索機能のテスト", () => {
  test("エリア検索が正しく機能すること", async ({ page }) => {
    const prefectures = ["東京都", "島根県"];
    for (const prefecture of prefectures) {
      await page.goto("http://localhost:3000");
      await page.selectOption("select#prefecture", prefecture);

      await page.click('button:has-text("検索")');

      await Promise.race([
        page
          .locator('h1:has-text("該当スクール：")')
          .waitFor({ timeout: 10000 }),
        page.locator("text=検索結果がありません").waitFor({ timeout: 10000 }),
      ]);

      await verifySearchResults(page, `検索条件: ${prefecture}`);
    }
  });
});

async function verifySearchResults(
  page: Page,
  testContext: string = "エリア検索"
) {
  await page.waitForLoadState("networkidle");

  const headerLocator = page.locator('h1:has-text("該当スクール：")');
  const noResultLocator = page.locator("text=検索結果がありません");

  await Promise.race([
    headerLocator.waitFor({ timeout: 10000 }),
    noResultLocator.waitFor({ timeout: 10000 }),
  ]);

  if (await headerLocator.isVisible()) {
    const text = await headerLocator.textContent();
    console.log(`${testContext}の検索結果: ${text}`);
    const m = text?.match(/該当スクール：.*?(\d+).*?件/);
    if (!m) throw new Error(`フォーマット異常: ${text}`);
    const count = parseInt(m[1], 10);
    console.log(`検索結果件数: ${count}件`);

    const cards = await page
      .locator(".w-full.max-w-4xl.mx-auto.border")
      .count();
    expect(cards).toBeGreaterThan(0);
  } else {
    console.log(`${testContext} - 検索結果なし`);
    expect(await noResultLocator.isVisible()).toBeTruthy();
  }
}
