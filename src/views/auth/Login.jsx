import { useState } from "react";
import ValidationError from "../../components/ValidationError";
import { useAuth } from "../../hooks/useAuth";
import IconSpinner from "../../components/IconSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { login, errors, isLoading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Login</h1>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-input"
            autoComplete="email"
            disabled={isLoading}
          />
          <ValidationError errors={errors} field="email" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="required">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-input"
            autoComplete="current-password"
            disabled={isLoading}
          />
          <ValidationError errors={errors} field="password" />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="flex gap-2 items-center hover:cursor-pointer"
            htmlFor="remember"
          >
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="w-4 h-4"
              checked={remember}
              onChange={() => setRemember((previous) => !previous)}
              disabled={isLoading}
            />
            <span className="select-none">Remember me</span>
          </label>
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex flex-col gap-2 mb-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading && <IconSpinner />}
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
