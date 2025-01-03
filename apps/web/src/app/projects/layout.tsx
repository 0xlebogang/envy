import Banner from "@/components/Banner";

type ProjectsLayoutProps = {
  children: React.ReactNode;
};

export default function ProjectsLayout(props: ProjectsLayoutProps) {
  return (
    <main className="grid min-h-[calc(100vh-64px)] grid-cols-4 p-8 gap-6">
      <Banner />
      <div className="w-full col-span-3 min-h-full gap-6">{props.children}</div>
    </main>
  );
}
