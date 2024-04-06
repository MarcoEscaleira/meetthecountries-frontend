import { Typography } from "@material-tailwind/react";
import { format } from "date-fns";

export function Footer() {
  return (
    <footer className="mt-6 flex w-full items-center justify-center gap-4 bg-white p-4">
      <img src="/images/planet-earth.svg" alt="Planet Earth" className="h-[34px] w-[38px] md:h-[44px] md:w-[48px]" />
      <Typography color="gray" className="font-medium">
        © {format(new Date(), "yyyy")} Meet The Countries
      </Typography>
    </footer>
  );
}
