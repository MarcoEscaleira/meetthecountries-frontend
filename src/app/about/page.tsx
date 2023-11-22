import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-4xl font-semibold text-blue-950 mb-6">About page</h1>
      <p className="w-8/12 font-light text-center leading-10">
        My interest in moving around the world has motivated me to work on this project. The current global map shows
        the country name but that does not provide any further information by only pinpointing the country in the map. I
        could not find any interactive quiz map game, therefore I decided to develop such application. Such project can
        grow in multiple directions with several different great features, in the case of Meet the countries the main
        idea was to apply several latest web technologies that combined can form a well-structured production
        application. It’s the core of any app, without a solid foundation and proper roots it can become a failed
        project. <br /> This geographic quiz was made with 💕 by Marco Escaleira
      </p>
    </div>
  );
}
