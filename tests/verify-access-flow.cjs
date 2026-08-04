const fs = require("node:fs");

let source = fs.readFileSync("app/v11-renderer.ts", "utf8");
source = source
  .replace("// @ts-nocheck", "")
  .replace(
    'export function renderV11(pathname: string, search = "")',
    'function renderV11(pathname, search = "")',
  );

const runtime = {};
eval(`${source};runtime.renderV11 = renderV11;`);

const deployedSource = fs.readFileSync("dist/server/index.js", "utf8");
const deployedRuntime = {};
eval(deployedSource.replace("export default {", "deployedRuntime.worker = {"));

const checks = [
  ["/", "通行證與今日訪客"],
  ["/visitors/new", "送出申請"],
  ["/visitors/submitted", "模擬核准並產生 QR Code"],
  ["/visitors/pass", "剩餘有效時間"],
  ["/visitors/pass?expired=1", "PASS EXPIRED"],
  ["/access/employee", "NX-A-EMP-000128"],
];

async function verify() {
  for (const [route, expected] of checks) {
    const [pathname, query] = route.split("?");
    const search = query ? `?${query}` : "";
    const html = runtime.renderV11(pathname, search);
    if (!html.includes(expected)) {
      throw new Error(`${route} is missing expected content: ${expected}`);
    }
    const response = await deployedRuntime.worker.fetch(
      new Request(`https://nexspace.local${pathname}${search}`),
      {},
    );
    const deployedHtml = await response.text();
    if (deployedHtml !== html) {
      throw new Error(`${route} differs between Next.js source and Sites output`);
    }
  }
  console.log(
    `Verified ${checks.length} access and visitor flow states with source parity.`,
  );
}

verify().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
