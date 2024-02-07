import { GetStaticProps } from "next";
import fetchContent from "@/lib/strapi/fetchContent";
import PageLayout from "@/components/layout/PageLayout";
import { useRouter } from "next/router";
import LabelContent from "@/components/common/LabelContent";
import Divider from "@/components/common/Divider";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Seo from "@/components/common/Seo";
import { truncateString } from "@/lib/helpers";
import SideNavLayout from "@/components/layout/SideNavLayout";
import StrapiImage from "@/components/common/StrapiImage";
import BlockRendererClient from "@/components/common/BlockRendererClient";

export default function Page({ projects }) {
  const router = useRouter();
  const { slug } = router.query;

  const pageContent = projects.filter(page => slug === page.slug)[0];

  const cover = pageContent.cover && <StrapiImage {...pageContent.cover.data} />;

  const aside = (
    <div className="grid grid-cols-[160px_1fr] gap-8 lg:block">
      <div className="w-[160px]">
        <StrapiImage {...pageContent.logo.data} />
      </div>
      <LabelContent label="Technologies" relation={pageContent.technologies} className="lg:mt-12" />
    </div>
  );

  const content = (
    <div className="grid gap-10">
      <div>
        <h1 className="mb-2 text-5xl text-white">{pageContent.name}</h1>
        <p className="text-mist-60">{pageContent.date_display}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <LabelContent label="Project Type" relation={pageContent.project_types} />
        <LabelContent label="Industry" relation={pageContent.industries} />
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
      <LabelContent label="About the Brand" content={<BlockRendererClient content={pageContent.brand_about} />} />
      <LabelContent label="About the Project" content={<BlockRendererClient content={pageContent.project_about} />} />
      <Divider />
      <div>
        <BlockRendererClient content={pageContent.content} textClasses="max-w-[720px]" />
      </div>
    </div>
  );

  return (
    <>
      {/* <Seo title={pageContent.name} description={pageContent.project_about} /> */}
      <SideNavLayout>
        <BlurredBackground image={pageContent?.logo?.data?.attributes?.url} bg="bg-smoke-70">
          <PageLayout content={content} aside={aside} cover={cover} />
        </BlurredBackground>
      </SideNavLayout>
    </>
  );
}

export const getStaticPaths = async () => {
  const projects = await fetchContent("projects");
  const _projects = projects?.data?.map(project => {
    return project.attributes;
  });
  const paths = _projects.map(project => ({
    params: { slug: project.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchContent("projects");
  const projects = data?.data?.map(project => {
    return project.attributes;
  });

  return {
    props: {
      projects,
    },
  };
};
