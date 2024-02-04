import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Typography, Button } from "@material-tailwind/react";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(1, { message: "Enter a password." }),
});

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-4">
      <Input
        {...register("email")}
        name="email"
        size="lg"
        label="Email address"
        placeholder="name@mail.com"
        error={!!errors.email}
      />

      <Input
        {...register("password")}
        name="password"
        size="lg"
        type="password"
        label="Password"
        placeholder="*******"
        error={!!errors.password}
      />
      <Typography variant="small" color="gray" className="mt-2 flex items-center gap-1 font-normal">
        <Info className='w-4' />
        Use at least 8 characters, one uppercase, one lowercase and one number.
      </Typography>

      <Button type="submit" placeholder="Create account" disabled={false} loading={false}>
        Create
      </Button>
    </form>
  );
}
