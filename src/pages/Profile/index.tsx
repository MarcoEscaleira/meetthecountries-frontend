import { cloneElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Typography, Option, Button, Chip } from "@material-tailwind/react";
import { format } from "date-fns";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { DatePicker } from "@components/DatePicker/DatePicker";
import { Roles } from "@generated/graphql";
import { useUserStore } from "@state/userStore.ts";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Enter a first name." }),
  lastName: z.string(),
  dateOfBirth: z.date(),
  country: z.string(),
});

export function Component() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    user: { email, firstName, lastName, dateOfBirth, country, role, createdAt, updatedAt },
  } = useUserStore();

  const { countries } = useCountries();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      country,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values, event) => {
    event?.preventDefault();
    try {
      console.log("values", values);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center pb-4 px-4 pt-20 md:px-12">
      <Typography variant="h1" className="mb-6">
        Profile
      </Typography>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4 w-80 space-y-6">
          <Input name="email" size="lg" label="Email address" value={email} disabled />

          <Input
            {...register("firstName")}
            name="firstName"
            size="lg"
            label="First name"
            placeholder=""
            error={!!errors.firstName}
            disabled={!isEditing}
          />

          <Input
            {...register("lastName")}
            name="lastName"
            size="lg"
            label="Last name"
            placeholder=""
            error={!!errors.lastName}
            disabled={!isEditing}
          />

          <DatePicker
            name="dateOfBirth"
            label="Date of birth"
            disabled={{ after: new Date() }}
            error={!!errors.dateOfBirth}
            disabledInput={!isEditing}
          />

          <Select
            size="lg"
            label="Select Country"
            onChange={value => form.setValue("country", value || "")}
            selected={element =>
              element &&
              cloneElement(element, {
                disabled: true,
                className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
            error={!!errors.country}
            disabled={!isEditing}
          >
            {countries.map(({ name, flags }: { name: string; flags: { svg: string } }) => (
              <Option key={name} value={name} className="flex items-center gap-2">
                <img src={flags.svg} alt={name} className="h-5 w-5 rounded-full object-cover" />
                {name}
              </Option>
            ))}
          </Select>

          {isEditing && (
            <Button type="submit" fullWidth variant="filled">
              Confirm
            </Button>
          )}
        </form>
      </FormProvider>
      {!isEditing && (
        <Button type="button" fullWidth variant="outlined" onClick={() => setIsEditing(true)} className="w-80 mb-4">
          Edit profile
        </Button>
      )}
      {role === Roles.Admin ? <Chip color="purple" value="Administrator" /> : <Chip color="blue" value="User" />}
      <Typography className="pt-6 text-center" variant="small">
        Your account has been created on {format(createdAt, "dd MMM yyyy hh:mm")} and last updated at{" "}
        {format(updatedAt, "dd MMM yyyy hh:mm")}
      </Typography>
    </div>
  );
}
