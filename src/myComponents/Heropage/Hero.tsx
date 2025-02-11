import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Placeholder for image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/about/aboutpage.jpg')" }}
      ></div>

      <div className="relative text-center max-w-2xl px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to EventManager</h1>
        <p className="text-lg mb-6">
          Your ultimate platform to create, manage, and attend events
          effortlessly. Join us and make your event planning seamless.
        </p>
        <Button
          onClick={() => {
            navigate("/");
          }}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg font-semibold rounded-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeroPage;
