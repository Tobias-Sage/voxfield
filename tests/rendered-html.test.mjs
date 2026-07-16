import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function getVercelHandler() {
  const handlerUrl = new URL(
    "../.vercel/output/functions/__server.func/index.mjs",
    import.meta.url,
  );
  handlerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: handler } = await import(handlerUrl.href);
  return handler;
}

async function render(handler, path) {
  return handler.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      waitUntil() {},
    },
  );
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

test("server-renders every public route in English", async () => {
  const handler = await getVercelHandler();
  const expectations = new Map([
    ["/", "Make every word land"],
    ["/courses", "Turn “speak with confidence”"],
    ["/insights", "Good communication often begins"],
    ["/contact", "What do you want to make clearer"],
    ["/terms", "Terms &amp; Conditions"],
    ["/privacy", "Privacy Policy"],
  ]);

  for (const [path, headline] of expectations) {
    const response = await render(handler, path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const text = visibleText(await response.text());
    assert.match(text, new RegExp(headline));
    assert.doesNotMatch(text, /[\u3400-\u9fff]/);
  }
});

test("English content, local interactions, and social image are present", async () => {
  const sourceFiles = [
    "app/layout.tsx",
    "app/page.tsx",
    "app/data.ts",
    "app/components/SiteChrome.tsx",
    "app/components/Interactive.tsx",
    "app/courses/page.tsx",
    "app/insights/page.tsx",
    "app/contact/page.tsx",
    "app/terms/page.tsx",
    "app/privacy/page.tsx",
  ];
  const sources = await Promise.all(
    sourceFiles.map((file) => readFile(new URL(file, projectRoot), "utf8")),
  );
  const source = sources.join("\n");

  assert.doesNotMatch(source, /[\u3400-\u9fff]/);
  assert.match(source, /lang="en"/);
  assert.match(source, /Annual <span>Save 20%<\/span>/);
  assert.match(source, /Filter by course category/);
  assert.match(source, /Please enter a valid email address/);
  assert.match(source, /Local demo submitted successfully/);
  assert.match(source, /href="\/terms"/);
  assert.match(source, /href="\/privacy"/);
  await access(new URL("public/og.png", projectRoot));
  await access(new URL("public/images/hero-speaker.png", projectRoot));
  await access(new URL(".vercel/output/config.json", projectRoot));
  await access(new URL(".vercel/output/static/og.png", projectRoot));
  await access(
    new URL(".vercel/output/static/images/hero-speaker.png", projectRoot),
  );
});
