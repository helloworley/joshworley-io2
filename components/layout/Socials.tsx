import React from "react";
import { LinkedIn, Twitter, Github } from "../common/SocialIcons";

export const socials = [
  {
    link: "https://github.com/helloworley",
    icon: <Github />,
    name: "Github",
  },
  {
    link: "https://twitter.com/joshworley_io",
    icon: <Twitter />,
    name: "Twitter",
  },
  {
    link: "https://www.linkedin.com/in/joshworley-io",
    icon: <LinkedIn />,
    name: "LinkedIn",
  },
];

export default function Socials(props: { className?: string }) {
  const { className } = props;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(social => {
        return (
          <a href={social.link} className="h-6" target="_blank" rel="noreferrer" key={social.name}>
            {/* <Image src={social.icon} alt={`Josh Worley's ${social.name}`} width={24} height={24} />; */}
            <div className="lg:text-mist-40 cursor-pointer text-white hover:text-white">{social.icon}</div>
          </a>
        );
      })}
    </div>
  );
}
