import { getNewsBySlug, getNews } from "../../../actions/news-actions";
import { notFound } from "next/navigation";
import NewsDetailClient from "./news-detail-client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    return { title: 'Không tìm thấy bài viết' };
  }

  const description = news.meta_description || news.excerpt || '';
  const title = news.title;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      ...(news.img ? { images: [{ url: news.img }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      ...(news.img ? { images: [news.img] } : {}),
    },
  };
}

export default async function NewsDetailPageServer({ params }: Props) {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news || news.status !== 'published') {
    notFound();
  }

  // Fetch latest news for sidebar
  const allNews = await getNews('published');
  const latestNews = allNews.filter((n: any) => n.id !== news.id).slice(0, 5);

  return (
    <>
      {/* Raw HTML/Script injection */}
      {news.schema_markup && (
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: news.schema_markup }}
        />
      )}
      <NewsDetailClient currentNews={news} latestNews={latestNews} />
    </>
  );
}
