import puppeteer, { executablePath, launch } from "puppeteer";
import clipboardy from "clipboardy";
import dotenv from "dotenv";

dotenv.config();

export const automatedVideoId = (videos) => {
  return new Promise(async (resolve, reject) => {
    const browser = await launch({
      headless: "new",
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    try {
      await page.setViewport({
        width: 1200,
        height: 800,
      });

      await page.goto("https://app.heygen.com/");

      await Promise.all([
        page.waitForSelector("#username"),
        page.waitForSelector("#password"),
        page.waitForSelector(".css-iak95n"),
      ]);

      await page.type("#username", "uttarakhandrajbhawan@gmail.com");
      await page.type("#password", "123Chatbot45@!");

      await page.evaluate(() => {
        document.querySelector(".css-iak95n").click();
      });

      await page.waitForSelector(".css-1u4cuof");
      await page.evaluate(() => {
        document.getElementsByClassName("css-1u4cuof")[4].click();
      });

      var videoIds = [];

      for (let i = 0; i < videos; i++) {
        await page.waitForSelector(".css-94i6cr");
        await page.evaluate((index) => {
          document.getElementsByClassName("css-94i6cr")[index].click();
        }, i);

        await page.waitForSelector(".css-1v4tmii-text");
        await page.evaluate(() => {
          document.getElementsByClassName("css-1v4tmii-text")[1].click();
        });

        const clipboardContent = clipboardy.readSync();

        videoIds.push(clipboardContent);
        console.log(clipboardContent);

        await page.goBack();
      }

      resolve({ videoIds });
    } catch (e) {
      reject(e);
    } finally {
      await browser.close();
    }
  });
};
