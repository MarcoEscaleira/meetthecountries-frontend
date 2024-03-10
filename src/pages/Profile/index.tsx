import { cloneElement, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Typography, Option, Button } from "@material-tailwind/react";
import { format } from "date-fns";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCountries } from "use-react-countries";
import { z } from "zod";
import { DatePicker } from "@components/DatePicker/DatePicker";
import { UserRoleChip } from "@components/UserRoleChip/UserRoleChip.tsx";
import { useUserStore } from "@state/userStore.ts";
import { DATE_TIME, DATE_TIME_READ } from "@utils/constants.ts";
import { UPDATE_USER } from "@utils/queries/UpdateUser";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Enter a first name." }),
  lastName: z.string(),
  dateOfBirth: z.date(),
  country: z.string(),
});

export function Component() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    user: { userId, email, firstName, lastName, dateOfBirth, country, role, createdAt, updatedAt },
  } = useUserStore();

  const [updateUser, { loading: isLoadingUserUpdate }] = useMutation(UPDATE_USER);

  const { countries } = useCountries();
  const orderedCountries = useCallback(() => {
    return countries.sort((a, b) => (a.name < b.name ? -1 : 1));
  }, [countries]);

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
      await updateUser({
        variables: { userId, user: { ...values, dateOfBirth: values.dateOfBirth.toISOString() } },
      });
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (e) {
      console.log("Something went wrong", e);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center px-4 pb-4 pt-20 md:px-12">
      <Typography variant="h2" className="mb-6 sm:mb-10">
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
            name="country"
            size="lg"
            label="Select Country"
            value={form.getValues("country")}
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
            {orderedCountries().map(({ name, flags }: { name: string; flags: { svg: string } }) => (
              <Option key={name} value={name} className="flex items-center gap-2">
                <img src={flags.svg} alt={name} className="h-5 w-5 rounded-full object-cover" />
                {name}
              </Option>
            ))}
          </Select>

          {isEditing && (
            <Button
              type="submit"
              fullWidth
              loading={isLoadingUserUpdate}
              disabled={isLoadingUserUpdate}
              variant="filled"
            >
              Confirm
            </Button>
          )}
        </form>
      </FormProvider>
      {!isEditing && (
        <Button type="button" fullWidth variant="outlined" onClick={() => setIsEditing(true)} className="my-4 w-80">
          Edit profile
        </Button>
      )}
      <UserRoleChip role={role} />
      <Typography className="pt-6 text-center" variant="small">
        Your account has been created on&nbsp;
        <time dateTime={format(createdAt, DATE_TIME)}>{format(createdAt, DATE_TIME_READ)}</time>
        &nbsp;and last updated at&nbsp;
        <time dateTime={format(updatedAt, DATE_TIME)}>{format(updatedAt, DATE_TIME_READ)}</time>
      </Typography>
    </div>
  );
}
