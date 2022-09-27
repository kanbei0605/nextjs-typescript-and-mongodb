import RegisterForm from "components/RegisterForm";

export default function register() {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-7">
          <h1 className="card-title text-center text-6xl mb-4">Register</h1>
          <div className="card-body">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
