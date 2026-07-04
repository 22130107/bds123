import { getProjectBySlug, incrementViews, getRelatedProjectsForDetail } from "../../../actions/project-actions";
import { getAgentInfo } from "../../../actions/settings-actions";
import { DetailPage } from "../../../components/pages/detail-page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return { title: 'Không tìm thấy dự án' };
  }

  const description = project.meta_description || project.description || '';
  const title = project.title;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      ...(project.mainImg ? { images: [{ url: project.mainImg }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      ...(project.mainImg ? { images: [project.mainImg] } : {}),
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project || project.status !== 'published') {
    notFound();
  }

  const agentInfo = await getAgentInfo() || {
    name: "Anh Tuấn Nguyễn",
    title: "Đại diện phân phối dự án",
    phone: "0982 831 582",
    zalo: "https://zalo.me/0982831582",
    avatar: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    isOnline: true,
  };

  await incrementViews(project.id);

  const relatedProjects = await getRelatedProjectsForDetail(project);

  return (
    <>
      {/* Raw HTML/Script injection */}
      {project.schema_markup && (
        <div
          style={{ display: "none" }}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: project.schema_markup }}
        />
      )}
      <DetailPage project={project} agentInfo={agentInfo} relatedProjects={relatedProjects} />
    </>
  );
}
