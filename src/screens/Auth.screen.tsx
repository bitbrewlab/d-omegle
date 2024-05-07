import AuthButtons from "../components/AuthButtons";

function AuthScreen() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen">
      <h1 className="text-3xl font-extrabold">Welcome to domegle..!</h1>
      <AuthButtons />
    </div>
  );
}

export default AuthScreen;
