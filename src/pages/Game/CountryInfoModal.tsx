import { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";

interface CountryInfoModalProps {
  countryDetails: Country;
}

export const CountryInfoModal = ({
  countryDetails: { name, flags, capital, area, postalCode, population, countryCallingCode },
}: CountryInfoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <>
      <Button onClick={toggleDialog} variant="gradient">
        View country information
      </Button>
      <Dialog open={isOpen} handler={toggleDialog}>
        <DialogHeader>
          <img src={flags.svg} alt={name} className="mr-3 h-5 w-5 rounded-full object-cover" />
          {name}
        </DialogHeader>
        <DialogBody>
          <Typography>Post code: {postalCode?.format}</Typography>
          <Typography>Capital: {capital}</Typography>
          <Typography>Area: {area}</Typography>
          <Typography>Population: {population}</Typography>
          <Typography>Country calling code: {countryCallingCode}</Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="gray" onClick={toggleDialog}>
            Go back
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
