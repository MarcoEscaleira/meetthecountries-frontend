import { useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, Button, Typography } from "@material-tailwind/react";
import { AtSign } from "lucide-react";

export function Component() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="container flex h-full flex-col items-center px-4 pb-4 pt-20 md:px-12">
      <Typography variant="h1" className="mb-8 text-3xl font-light md:text-5xl">
        About <b>Meet the Countries</b>
      </Typography>

      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)} className="outline-none">
          The idea behind MTC?
        </AccordionHeader>
        <AccordionBody>
          <Typography>
            MTC provides users to meet new countries by engaging in intriguing and informational quizzes that allow to
            expand knowledge about a desired country.
          </Typography>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)} className="outline-none">
          Personal motivations
        </AccordionHeader>
        <AccordionBody>
          <Typography>
            My interest in moving around the world has motivated me to work on this project. The current global map
            shows the country name but that does not provide any further information by only pinpointing the country in
            the map. I could not find any interactive quiz map game, therefore I decided to develop such application.
            Such project can grow in multiple directions with several different great features, in the case of Meet the
            countries the main idea was to apply several latest web technologies that combined can form a
            well-structured production application. It’s the core of any app, without a solid foundation and proper
            roots it can become a failed project.
          </Typography>
        </AccordionBody>
      </Accordion>

      <div className="flex-grow" />

      <div className="mt-8 flex w-full items-center justify-center md:mt-10">
        <Typography className="mr-5 font-bold">Meet me</Typography>
        <AtSign className="w-6" />
        <a href="https://escaleira.dev" target="_blank" rel="noreferrer">
          <Button variant="text" className="ml-1">
            Escaleira.dev
          </Button>
        </a>
      </div>
    </div>
  );
}
