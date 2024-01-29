import PageLayout from "@/components/layout/PageLayout";
import { useRouter } from "next/router";
import LabelContent from "@/components/common/LabelContent";
import Divider from "@/components/common/Divider";
import RenderBlock from "@/components/common/RenderBlock";
import BlurredBackground from "@/components/layout/BlurredBackground";
import { NotionPropertyImage } from "@/components/image/NotionPropertyImage";
import { NotionCoverImage } from "@/components/image/NotionCoverImage";
import Seo from "@/components/common/Seo";
import { truncateString } from "@/lib/helpers";

export default function Page({ data }) {
  const router = useRouter();
  const { slug } = router.query;
  // const pageContent = data.projects.filter(page => slug === page.slug)[0];
  const pageContent = data;

  const cover = pageContent.cover.url && <NotionCoverImage image={pageContent.cover} alt={pageContent.name} className="w-full shadow-2xl" />;

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
          className="rounded-lg"
        />
      </div>
      <LabelContent label="Technologies" content={pageContent.technologies} className="lg:mt-12" />
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
        {pageContent.url && (
          <LabelContent
            label="Link"
            content={
              <a href={pageContent.url} target="_blank" rel="noopener noreferrer" className="text-mist-60 inline underline hover:text-white">
                {truncateString(pageContent.url)}
              </a>
            }
          />
        )}
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
    <>
      <Seo title={pageContent.name} description={pageContent.project_about} />
      <BlurredBackground image={pageContent.logo} bg="bg-smoke-70">
        <PageLayout content={content} aside={aside} cover={cover} />
      </BlurredBackground>
    </>
  );
}

export const getStaticPaths = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_NOTION_API_URL}/listProjects`);
    if (!response.ok) {
      console.error("Response status:", response.status);
      console.error("Response text:", await response.text());
      throw new Error(`Network response was not ok - ${response.statusText}`);
    }
    const data = await response.json();
    const paths = data
      .filter(item => item.slug && item.slug !== "design-and-development")
      .map(item => ({
        params: { slug: item.slug },
      }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching data in getStaticPaths:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getStaticProps = async () => {
  try {
    const response = await fetch(process.env.NEXT_NOTION_API_URL);
    const data = await response.json();
    return {
      props: {
        data,
      },
      revalidate: 3600, // Re-generate the page every 1 hour
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
      },
    };
  }
};
