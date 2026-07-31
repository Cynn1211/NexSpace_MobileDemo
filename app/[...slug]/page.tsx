import { renderV11 } from "../v11-renderer";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toSearch(params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") query.set(key, value);
    if (Array.isArray(value)) value.forEach((entry) => query.append(key, entry));
  }
  const result = query.toString();
  return result ? `?${result}` : "";
}

export default async function V11Route({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const path = `/${slug.join("/")}`;
  return <div dangerouslySetInnerHTML={{ __html: renderV11(path, toSearch(query)) }} />;
}
