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

export default function Home({ data }) {
  console.log("data", data);
  return (
    <SideNavLayout>
      <BlurredBackground image="/default-background.jpeg" className="mt-12 md:mt-0">
        <div className="md:flex md:h-screen md:items-center md:justify-center">
          <div className="flex flex-col items-center gap-16 pb-20">
            <Ikigai />
            <div className="mx-auto grid grid-cols-2 gap-10 md:grid-cols-4">
              {circleButtons.map(button => {
                return <CircleButton data={button} key={button.name} />;
              })}
            </div>
          </div>
        </div>
      </BlurredBackground>
    </SideNavLayout>
  );
}

export const getStaticProps = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/notion");
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
