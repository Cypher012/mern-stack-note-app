import AuthComponent from "../ui/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpType } from "../../schema/userSchema";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<signUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const isField = (field): field is { name: string } => {
    return typeof field === "object" && "name" in field;
  };

  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <AuthComponent
      title="SignUp"
      register={(field) =>
        isField(field) ? register(field) : register(field, { required: false })
      }
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
    />
  );
};

export default SignUp;
