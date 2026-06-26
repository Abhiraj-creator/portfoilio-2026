import ProjectPage from "@/components/ProjectPage";
import { project } from "@/data/project";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return project.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const index = project.findIndex((item) => item.slug === slug);

  if (index === -1) {
    notFound();
  }

  const currentProject = project[index];
  const nextProject = project[(index + 1) % project.length];

  return <ProjectPage project={currentProject} nextProject={nextProject} />;
}
