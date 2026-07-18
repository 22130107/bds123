import { getNews } from "../../../../actions/news-actions";
import { getNewsCategories } from "../../../../actions/news-category-actions";
import { generateSlug } from "../../../../lib/slugify";
import { notFound } from "next/navigation";
import NewsClient from "../../news-client";

export const dynamic = 'force-dynamic';

export default async function NewsCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getNewsCategories();
  const matched = categories.find(c => generateSlug(c.name) === slug);
  if (!matched) notFound();

  const allNews = await getNews('published');
  const filteredNews = allNews.filter((n: any) => n.category === matched.name);

  return <NewsClient dbNews={filteredNews} />;
}
