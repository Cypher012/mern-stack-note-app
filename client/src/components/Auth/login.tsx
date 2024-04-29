import AuthComponent from "../ui/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginType } from "../../schema/userSchema";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<loginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <AuthComponent
      title="Login"
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
    />
  );
};

export default Login;
