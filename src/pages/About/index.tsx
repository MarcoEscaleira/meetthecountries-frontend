import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Button, Typography } from "@material-tailwind/react";
import { ArrowRight } from "lucide-react";

export function Component() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="container flex flex-col items-center p-6 md:p-12">
      <Typography variant="h1" className="mb-8 mt-10 font-light md:mt-0">
        About <b>Meet the Countries</b>
      </Typography>

      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>Personal motivations</AccordionHeader>
        <AccordionBody>
          My interest in moving around the world has motivated me to work on this project. The current global map shows
          the country name but that does not provide any further information by only pinpointing the country in the map.
          I could not find any interactive quiz map game, therefore I decided to develop such application. Such project
          can grow in multiple directions with several different great features, in the case of Meet the countries the
          main idea was to apply several latest web technologies that combined can form a well-structured production
          application. It’s the core of any app, without a solid foundation and proper roots it can become a failed
          project.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>The idea behind MTC?</AccordionHeader>
        <AccordionBody>
          MTC provides users to meet new countries by engaging in intriguing and informational quizzes that allow to
          expand knowledge about a desired country.
        </AccordionBody>
      </Accordion>

      <div className="mt-8 flex w-full items-center justify-center md:mt-10">
        <Typography className="mr-5 font-bold">Meet me</Typography>
        <ArrowRight />
        <a href="https://escaleira.dev" target="_blank" rel="noreferrer">
          <Button variant="text" className="ml-1">
            Escaleira.dev
          </Button>
        </a>
      </div>
    </div>
  );
}
