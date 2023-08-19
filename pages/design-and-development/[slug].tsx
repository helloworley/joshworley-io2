import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import { useRouter } from "next/router";
import LabelContent from "@/components/common/LabelContent";
import Divider from "@/components/common/Divider";
import RenderBlock from "@/components/common/RenderBlock";
import BlurredBackground from "@/components/layout/BlurredBackground";
import { NotionPropertyImage } from "@/components/common/NotionPropertyImage";

export default function Home({ allEntries }) {
  const router = useRouter();
  const { slug } = router.query;
  const pageContent = allEntries.projects.filter(page => slug === page.slug)[0];

  const aside = (
    <div className="grid grid-cols-[160px_1fr] gap-8 lg:block">
      <div className="w-[160px]">
        <NotionPropertyImage
          image={pageContent.logo}
          width={160}
          height={160}
          alt={`${pageContent.brand} logo`}
          cacheCategory="projects"
          cacheProperty="logo"
        />
      </div>
      <LabelContent label="Technologies" content={pageContent.technologies} className="lg:mt-1" />
    </div>
  );

  const content = (
    <div className="grid gap-10">
      <div>
        <h1 className="mb-2 text-5xl text-white">{pageContent.name}</h1>
        <p className="text-mist-60">{pageContent.dateDisplay}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <LabelContent label="Project Type" content={pageContent.project_type} />
        <LabelContent label="Industry" content={pageContent.industry} />
        <LabelContent label="Position" content={pageContent.position} />
        <LabelContent label="Link" content="TODO: Link" />
      </div>
      <LabelContent label="About the Brand" content={pageContent.brand_about} />
      <LabelContent label="About the Project" content={pageContent.project_about} />
      <Divider />
      <div>
        {pageContent.childBlocks?.map((block, i) => (
          <RenderBlock allBlocks={pageContent.childBlocks} block={block} key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <BlurredBackground image={pageContent.logo} bg="bg-smoke-70">
      <PageLayout content={content} aside={aside} />
    </BlurredBackground>
  );
}

export const getStaticPaths = async () => {
  const allPages = await getAllEntries();
  const paths = allPages.projects.map(item => ({
    params: { slug: item.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};
