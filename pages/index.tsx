import { getAllEntries } from "@/lib/notion/notion";
import SideNavLayout from "@/components/layout/SideNavLayout";
import BlurredBackground from "@/components/layout/BlurredBackground";
import CircleButton from "@/components/common/CircleButton";
import Ikigai from "@/components/common/Ikigai";

const circleButtons = [
  {
    name: "Design & Development",
    link: "/design-and-development",
  },
  {
    name: "Photography",
    link: "/photography",
  },
  {
    name: "Technologies",
    link: "/technologies",
  },
  {
    name: "About",
    link: "/about",
  },
];

export default function Home({ allEntries }) {
  console.log(allEntries);
  return (
    <SideNavLayout>
      <BlurredBackground image="/default-background.jpeg" className="mt-24 md:mt-0 ">
        <div className="md:h-screen-64 md:flex md:items-center md:justify-center">
          <div className="flex flex-col items-center gap-16 pb-20">
            <Ikigai />
            <div className="mx-auto grid grid-cols-2 gap-10 md:grid-cols-4">
              {circleButtons.map(button => {
                return <CircleButton data={button} />;
              })}
            </div>
          </div>
        </div>
      </BlurredBackground>
    </SideNavLayout>
  );
}

export const getStaticProps = async () => {
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};
