import SideNavLayout from "@/components/layout/SideNavLayout";
import BlurredBackground from "@/components/layout/BlurredBackground";
import CircleButton from "@/components/common/CircleButton";
import Ikigai from "@/components/common/Ikigai";
import Seo from "@/components/common/Seo";

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

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="Welcome to Josh Worley's portfolio website. Browse design and development projects, view photography, and learn more about his experience."
      />
      <SideNavLayout>
        <BlurredBackground image="/default-background.jpeg">
          <div className="md:flex md:h-screen md:items-center md:justify-center">
            <div className="flex flex-col items-center gap-16 py-20 pb-20">
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
    </>
  );
}
