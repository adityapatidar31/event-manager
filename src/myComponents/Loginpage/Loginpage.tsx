import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/backend";
import { useAppDispatch } from "@/services/hooks";
import { addUser } from "@/store/userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogin(e: React.SyntheticEvent<EventTarget>) {
    e.preventDefault();
    try {
      setIsPending(true);
      const data = { email, password };
      const user = await loginUser(data);
      dispatch(addUser(user));
      setIsPending(false);
      navigate("/");
    } catch {
      setIsPending(false);
      toast.error("Failed to create user");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-primary mb-6">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2"
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <SyncLoader color="#fff" /> : "Login"}
            </Button>
          </div>
          <div className="mt-2" onClick={() => navigate("/")}>
            <Button type="submit" variant="outline" className="w-full">
              Guest Login
            </Button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/signup" className="text-primary hover:underline">
              Don't have an account? Register here
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
