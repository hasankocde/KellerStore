import React from "react";
import Team from "../components/Team";
import Stats from "../components/Stats";
import Banner from "../components/Banner";

const About = () => {
  const title = `Über uns`;
  return (
    <div>
      <Banner title={title} target={"/allad"}/>
      <div className=" ">
        <div className="flex justify-center items-center  sm:flex">
          <Team />
        </div>
        <div className="mt-8 py-6 border-t items-center justify-center sm:flex">
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default About;
