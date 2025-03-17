import { Link } from "react-router-dom";
import SignupForm from "../../components/ui/SignupForm";

function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create an account
        </h2>

        <SignupForm />

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
