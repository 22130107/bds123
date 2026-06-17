import { getNews } from "../../actions/news-actions";
import NewsClient from "./news-client";

export default async function NewsRoute() {
  const dbNews = await getNews('published');
  return <NewsClient dbNews={dbNews} />;
}
