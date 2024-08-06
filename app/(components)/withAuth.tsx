import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../(utils)/context/AuthContext";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { isLoggedIn } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const storedToken = Cookies.get("idToken");
        if (!storedToken) {
          redirect("/login");
        } else {
          setLoading(false);
        }
      };
      checkAuth();
    }, [isLoggedIn]);

    if (loading) {
      return <div>Loading...</div>; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
