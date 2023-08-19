import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import TitleDescription from "@/components/common/TitleDescription";
import Technology from "@/components/common/Technology";
import BlurredBackground from "@/components/layout/BlurredBackground";

export default function Home({ allEntries }) {
  console.log("allEntries", allEntries);

  const content = (
    <>
      <TitleDescription
        title="Technologies"
        description="I have professional experience and working knowledge of the following design applications and frontend technologies. I am comfortable jumping
        into projects using these technologies and contributing immediately."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
        {allEntries.technologies?.map(tech => {
          return <Technology tech={tech} key={tech.name} />;
        })}
      </div>
    </>
  );

  return (
    <BlurredBackground image="/default-background.jpeg">
      <PageLayout content={content} />
    </BlurredBackground>
  );
}

export const getStaticProps = async () => {
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};

// const test = [
//   {
//     icon: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9b14583b-6354-42b8-9aad-93e952daf48b/adobe-after-effects.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230818%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230818T002608Z&X-Amz-Expires=3600&X-Amz-Signature=76c3e4f66b28cecc7169290bbd8995891c209019f5ffba4d2764f80fcd13e5c3&X-Amz-SignedHeaders=host&x-id=GetObject",
//     imageRetry: {
//       databaseId: "1e6bf218-9750-4a5f-8113-a327dc1d7c54",
//       pageId: "8d3c626f-8ce8-4c5e-8e8c-444a635a296a",
//       propertyId
//     },
//     propertyId: "gmBE",
//   },
// ];
