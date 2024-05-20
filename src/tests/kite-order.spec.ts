import { isProdEnv } from "@/lib/helpers";
import { expect, test } from "@playwright/test";

test("Kite order", async ({ page, browserName, isMobile }) => {
  await test.step("Add kites to the cart", async () => {
    // await page.goto("https://papirsarkany.vercel.app/sarkanyok");
    await page.goto("http://127.0.0.1:3000/sarkanyok");

    // add to cart
    await page.getByText("Kosárba").first().click();
    await page.getByText("Kosárba").nth(2).click();

    const cartItemIndicatorInnerText = await page
      .getByTestId("cart-dropdown")
      .first()
      .locator(".d-indicator")
      .innerText();
    expect(
      cartItemIndicatorInnerText,
      'Cart item quantity indicator should be equal to "2".',
    ).toEqual("2");
  });

  await test.step('Navigate to "/kosar" (cart) page', async () => {
    // click on cart dropwdown
    await page.getByTestId("cart-dropdown").first().click();

    // navigate to '/kosar' page
    await page.getByRole("link", { name: "Kosár", exact: true }).click();
  });

  await test.step("Modify cart items", async () => {
    // increase kite-01 quantity
    await page.getByText("+").first().click();

    const spinButtonInputValue = await page
      .getByRole("spinbutton")
      .first()
      .inputValue();
    expect(
      spinButtonInputValue,
      "First cart item quantity should be equal to 2.",
    ).toEqual("2");

    // remove kite-02
    await page.getByText("-").nth(2).click();

    const numberOfSpinButtons = await page.getByRole("spinbutton").count();
    expect(
      numberOfSpinButtons,
      "Number of unique kites should be equal to 1 in the cart.",
    ).toEqual(1);
  });

  await test.step("Fill out the order form", async () => {
    // proceed to payment info
    await page.getByRole("button", { name: "Tovább a fizetéshez" }).click();

    // fill payment info
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill("ducsai4698@gmail.com");
    await page.locator('input[name="email"]').press("Tab");
    await page.locator('input[name="lastName"]').fill("Kulka");
    await page.locator('input[name="lastName"]').press("Tab");
    await page.locator('input[name="firstName"]').fill("János");
    await page.locator('input[name="firstName"]').press("Tab");
    await page.getByPlaceholder("+").fill("+36201234567");
    await page.getByLabel("Személyes átvételingyenes").check();

    // proceed to shipping info
    await page.getByRole("button", { name: "Tovább" }).click();

    // fill shipping info
    await page.getByLabel("Átvételkor készpénzel").check();
    await page.locator('input[name="billingPostcode"]').click();
    await page.locator('input[name="billingPostcode"]').fill("2094");
    await page.locator('input[name="billingPostcode"]').press("Tab");
    await page.locator('input[name="billingCity"]').fill("Nagykovácsi");
    await page.locator('input[name="billingCity"]').press("Tab");
    await page.getByPlaceholder("Utca, házszám").fill("Kazal utca 6.");

    // proceed to order summary
    await page.getByPlaceholder("Utca, házszám").press("Enter");

    // fill comment
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("e2e test by playwright");
  });

  // Only runs in Chrome Desktop to avoid sending multiple emails.
  if (browserName === "chromium" && !isMobile && isProdEnv()) {
    await test.step("Place the order", async () => {
      // finish order
      await page.getByRole("button", { name: "Megrendelem" }).click();
      await page.goto("https://papirsarkany.vercel.app/sikeres-rendeles");
    });
  }
});
