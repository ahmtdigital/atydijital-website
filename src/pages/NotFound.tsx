
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-ignite text-9xl font-bold mb-4">404</h1>
        <p className="text-3xl text-white font-bold mb-6">Page Not Found</p>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" className="bg-ignite hover:bg-ignite-700 text-white">
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
