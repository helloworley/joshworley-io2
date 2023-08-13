import PageLayout from "@/components/layout/PageLayout";
import { getAllPages } from "@/lib/notion";
import { useRouter } from "next/router";
import Image from "next/image";
import LabelContent from "@/components/common/LabelContent";
import LineBreak from "@/components/common/LineBreak";
import RenderBlock from "@/components/common/RenderBlock";

export default function Home({ allPages }) {
  console.log("allPages", allPages);
  const router = useRouter();
  const { slug } = router.query;
  const pageContent = allPages.filter(page => slug === page.slug)[0];
  console.log("pageContent", pageContent);

  const aside = (
    <div className="grid gap-8">
      <Image className="rounded-xl" src={pageContent.logo} alt={`${pageContent.brand} logo`} width={160} height={160} />
      <LabelContent label="Technologies" content={pageContent.technologies} />
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
      <LineBreak />
      <div>
        {pageContent.childBlocks?.map((block, i) => (
          <RenderBlock allBlocks={pageContent.childBlocks} block={block} key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${pageContent.logo})` }}>
      <div className="bg-smoke-70 h-full backdrop-blur-3xl">
        <PageLayout content={content} aside={aside} />
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const designPages = await getAllPages();
  const paths = designPages.map(item => ({
    params: { slug: item.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const allPages = await getAllPages();

  return {
    props: { allPages },
    revalidate: 1,
  };
};
