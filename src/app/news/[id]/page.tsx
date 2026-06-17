import { getNewsById, getNews } from "../../../actions/news-actions";
import { notFound } from "next/navigation";
import NewsDetailClient from "./news-detail-client";

export default async function NewsDetailPageServer({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const newsId = parseInt(resolvedParams.id);
  const news = await getNewsById(newsId);

  if (!news || news.status !== 'published') {
    notFound();
  }

  // Fetch latest news for sidebar
  const allNews = await getNews('published');
  const latestNews = allNews.filter((n: any) => n.id !== newsId).slice(0, 5);

  return <NewsDetailClient currentNews={news} latestNews={latestNews} />;
}
