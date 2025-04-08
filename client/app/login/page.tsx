import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center flex-grow bg-gray-50 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
}
