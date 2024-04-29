import { Link } from "react-router-dom";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";

interface AuthComponent {
  title: "Login" | "SignUp";
  onSubmit: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>;
  register: UseFormRegister<{
    username?: string;
    email: string;
    password: string;
  }>;
  errors: FieldErrors<{
    username?: string;
    email: string;
    password: string;
  }>;
}

const AuthComponent = ({
  title,
  onSubmit,
  register,
  errors,
}: AuthComponent) => {
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        {title === "SignUp" && (
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter username"
                {...register("username")}
              />
            </div>
            <p className="text-red-600 text-sm mt-2">
              {errors.username?.message}
            </p>
          </div>
        )}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
              {...register("email")}
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
          <p className="text-red-600 text-sm mt-2">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
              {...register("password")}
            />

            <button
              onClick={handleVisible}
              className="absolute inset-y-0 end-0 grid place-content-center px-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
          <p className="text-red-600 text-sm mt-2">
            {errors.password?.message}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {title === "Login" ? (
            <p className="text-sm text-gray-500">
              No account? &nbsp;
              <Link className="underline" to="/signUp">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Already have an account? &nbsp;
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          )}

          <button
            type="submit"
            onClick={() => console.log(errors)}
            className="inline-block rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
          >
            {title === "Login" ? "Login" : "SignUp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthComponent;
