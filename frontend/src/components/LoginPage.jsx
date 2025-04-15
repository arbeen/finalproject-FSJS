import { Heading, TextInput, Button } from 'evergreen-ui';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  return (
    <div className="container py-5">
      <div className="mb-4">
          <Heading size={600} color="#2c3e50">Login</Heading>
      </div>

      <div className="row ">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form>
                <div className="mb-3">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Email</label>
                  <TextInput
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Password</label>
                  <TextInput
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    type="submit"
                    appearance="primary"
                    intent="success"
                    backgroundColor="#27ae60"
                    color="white"
                  >
                    Login
                  </Button>
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;
