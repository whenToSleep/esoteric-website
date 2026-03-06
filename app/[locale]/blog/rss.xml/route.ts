import { getPayload } from "payload";
import config from "@payload-config";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const payload = await getPayload({ config });

  const posts = await payload.find({
    collection: "posts",
    locale: locale as "ru" | "en" | "uk",
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 50,
    depth: 1,
  });

  const channelTitle =
    locale === "ru"
      ? "Мори Норман — Блог"
      : locale === "uk"
        ? "Морі Норман — Блог"
        : "Mori Norman — Blog";

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const items = (posts.docs as any[])
    .map((post) => {
      const title = (post.title as string) || "";
      const excerpt = (post.excerpt as string) || "";
      const slug = (post.slug as string) || "";
      const categoryTitle = post.category?.title || "";
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : "";

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${BASE_URL}/${locale}/blog/${slug}</link>
      <description><![CDATA[${excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${BASE_URL}/${locale}/blog/${slug}</guid>${categoryTitle ? `\n      <category><![CDATA[${categoryTitle}]]></category>` : ""}
    </item>`;
    })
    .join("\n");
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${channelTitle}</title>
    <link>${BASE_URL}/${locale}/blog</link>
    <description>${channelTitle}</description>
    <language>${locale}</language>
    <atom:link href="${BASE_URL}/${locale}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
