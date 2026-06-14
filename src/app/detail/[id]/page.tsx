import { getProject, incrementViews } from "../../../actions/project-actions";
import { DetailPage } from "../../../components/pages/detail-page";
import { CopilotPageData } from "../../../components/copilot-page-data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id);
  const project = await getProject(projectId);
  
  if (!project) {
    notFound();
  }

  // Increment views
  await incrementViews(projectId);

  return (
    <>
      <CopilotPageData projects={[project]} />
      <DetailPage project={project} />
    </>
  );
}
