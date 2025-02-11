import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1614102073832-030967418971?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" /> {/* Dark Overlay */}
      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold">
          Explore the World with Next-Tour
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover breathtaking destinations and plan your next adventure
          effortlessly.
        </p>
        <Button
          onClick={() => navigate("/home")}
          className="mt-6 px-6 py-3 text-lg font-semibold bg-violet-600 hover:bg-violet-700"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
