import Link from "next/link";
import Header from "src/components/Header";
import LoginForm from "components/LoginForm";

export default function Home() {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-7">
          <h1 className="card-title text-center text-6xl mb-4">Login</h1>
          <div className="card-body">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
