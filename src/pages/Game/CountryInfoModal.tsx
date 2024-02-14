import { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";

interface CountryInfoModalProps {
  countryDetails: Country;
}

export const CountryInfoModal = ({
  countryDetails: { name, flags, capital, area, postalCode, population, languages, currencies, countryCallingCode },
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
          <Typography>Capital: {capital}</Typography>
          <Typography>Area: {area}</Typography>
          <Typography>Population: {population}</Typography>
          <Typography>
            Languages:&nbsp;
            {languages.map((language, index) => (
              <span key={language} className="mr-1">
                {language}
                {index === languages.length - 1 ? "" : ", "},
              </span>
            ))}
          </Typography>
          <Typography>
            Currencies:&nbsp;
            {currencies.map(({ name, symbol }) => (
              <span key={name} className="mr-1">
                {name} ({symbol})
              </span>
            ))}
          </Typography>
          <Typography>Country calling code: {countryCallingCode}</Typography>
          <Typography>Post code: {postalCode?.format}</Typography>
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
