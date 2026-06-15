import { getProject, incrementViews } from "../../../actions/project-actions";
import { getAgentInfo } from "../../../actions/settings-actions";
import { DetailPage } from "../../../components/pages/detail-page";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id);
  const project = await getProject(projectId);
  const agentInfo = await getAgentInfo() || {
    name: "Anh Tuấn Nguyễn",
    title: "Đại diện phân phối dự án",
    phone: "0982 831 582",
    zalo: "https://zalo.me/0982831582",
    avatar: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    isOnline: true,
  };
  
  if (!project) {
    notFound();
  }

  await incrementViews(projectId);

  return (
    <DetailPage project={project} agentInfo={agentInfo} />
  );
}
