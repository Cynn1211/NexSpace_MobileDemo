import app from "../dist/server/index.js";

const seen = new Set(["/"]);
const queue = ["/"];
let linkCount = 0;

while (queue.length && seen.size < 180) {
  const path = queue.shift();
  const response = await app.fetch(new Request(`https://prototype.test${path}`));
  if (response.status !== 200) throw new Error(`Bad status for ${path}`);
  const html = await response.text();
  if (!html.includes("NexSpace")) throw new Error(`Blank response for ${path}`);
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href || href.startsWith("#")) throw new Error(`Dead link: ${path} -> ${href}`);
    if (href.startsWith("/")) {
      linkCount += 1;
      if (!seen.has(href)) {
        seen.add(href);
        queue.push(href);
      }
    }
  }
}

const spaceHtml = await (await app.fetch(new Request("https://prototype.test/space"))).text();
const photoCount = (spaceHtml.match(/images\.unsplash\.com/g) || []).length;
if (photoCount < 3) throw new Error("Room photos are missing");
console.log(`Validated ${seen.size} route variants and ${linkCount} internal links; ${photoCount} room photos found.`);
