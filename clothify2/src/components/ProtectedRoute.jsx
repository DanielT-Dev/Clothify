import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    // If the user data is still loading, prevent any action
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    // Redirect to sign-in if the user is not authenticated
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
