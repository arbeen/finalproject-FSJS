import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pane, TextInput, Button, Heading, Text, Alert } from 'evergreen-ui';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual authentication logic
      if (email === 'admin@example.com' && password === 'password') {
        // Store authentication token
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Pane
        elevation={1}
        background="white"
        padding={40}
        borderRadius={8}
        width={400}
        className="shadow-sm"
      >
        <div className="text-center mb-4">
          <Heading size={700} marginBottom={8}>
            Welcome Back
          </Heading>
          <Text size={400} color="muted">
            Sign in to your account
          </Text>
        </div>

        {error && (
          <Alert
            intent="danger"
            title="Error"
            marginBottom={16}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextInput
              width="100%"
              height={40}
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <TextInput
              width="100%"
              height={40}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            appearance="primary"
            width="100%"
            height={40}
            isLoading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        <div className="text-center mt-4">
          <Text size={300} color="muted">
            Don't have an account?{' '}
            <Button
              appearance="minimal"
              intent="success"
              onClick={() => navigate('/register')}
            >
              Sign up
            </Button>
          </Text>
        </div>
      </Pane>
    </div>
  );
}

export default Login; 