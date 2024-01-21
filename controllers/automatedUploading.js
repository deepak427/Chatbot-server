import { executablePath, launch } from "puppeteer";
import dotenv from "dotenv";

dotenv.config();
export const runUploading = (title, speech) => {
  return new Promise(async (resolve, reject) => {
    const browser = await launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : executablePath(),
    });
    const page = await browser.newPage();
    try {
      await page.setViewport({
        width: 1200,
        height: 800,
      });

      await page.goto("https://app.heygen.com/");

      await Promise.all([
        await page.waitForSelector("#username"),
        await page.waitForSelector("#password"),
        await page.waitForSelector(".css-iak95n"),
      ]);

      await page.type("#username", "uttarakhandrajbhawan@gmail.com");
      await page.type("#password", "123Chatbot45@!");

      await page.evaluate(() => {
        document.querySelector(".css-iak95n").click();
      });

      await page.waitForSelector(".css-1s0wd3s");
      await page.evaluate(() => {
        document.querySelector(".css-1s0wd3s").click();
      });

      await page.waitForSelector(".css-wku58s");
      await page.evaluate(() => {
        document.querySelector(".css-wku58s").click();
      });

      await Promise.all([
        await page.waitForSelector(
          ".css-1etqo8o-title-input-text-title-input-only"
        ),
        await page.waitForSelector(".css-l3f8vc"),
      ]);

      await page.evaluate(() => {
        const textarea = document.getElementsByClassName("css-l3f8vc")[1];
        const inputarea = document.getElementsByClassName(
          "css-1etqo8o-title-input-text-title-input-only"
        )[0];
        textarea.value = "";
        inputarea.value = "";
      });

      await page.type(".css-l3f8vc", speech);

      await page.type(".css-1etqo8o-title-input-text-title-input-only", title);

      await page.keyboard.press("Enter");

      await page.waitForSelector(".css-8zrzh9");
      await page.evaluate(() => {
        document.querySelector(".css-8zrzh9").click();
      });

      const currentUrl = page.url();

      //   await page.waitForSelector(".css-ec8bs4", { timeout: 36000000 });
      //   await page.evaluate(() => {
      //     document.querySelector(".css-ec8bs4").click();
      //   });

      browser.close();
      return resolve({ currentUrl });
    } catch (e) {
      return reject(e);
    }
  });
};
