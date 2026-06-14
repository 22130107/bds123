import { getProjects } from "../actions/project-actions";
import { getSpaces } from "../actions/space-actions";
import { getNews } from "../actions/news-actions";
import HomeClient from "./home-client";

export default async function Page() {
  const dbProjects = await getProjects();
  const dbSpaces = await getSpaces();
  const dbNews = await getNews();
  return <HomeClient dbProjects={dbProjects} dbSpaces={dbSpaces} dbNews={dbNews} />;
}
