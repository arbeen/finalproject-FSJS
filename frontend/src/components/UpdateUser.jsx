import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pane, Button, Text, Heading, TextInput, Textarea, Select } from 'evergreen-ui';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    userNotes: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        if (data.dob) {
          data.dob = data.dob.split('T')[0];
        }
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <Heading size={600} color="#2c3e50">Update User</Heading>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>First Name</label>
                  <TextInput
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Last Name</label>
                  <TextInput
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Date of Birth</label>
                  <TextInput
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Phone</label>
                  <TextInput
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Email</label>
                  <TextInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Address Line 1</label>
                  <TextInput
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Address Line 2</label>
                  <TextInput
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>City</label>
                  <TextInput
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Postal Code</label>
                  <TextInput
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>Country</label>
                  <TextInput
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    width="100%"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label" style={{ color: '#2c3e50', fontWeight: 500 }}>User Notes</label>
                  <Textarea
                    name="userNotes"
                    value={formData.userNotes}
                    onChange={handleChange}
                    width="100%"
                    className="form-control"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-3">
                <Text color="danger">{error}</Text>
              </div>
            )}

            <div className="mt-4 d-flex gap-3">
              <Button
                type="submit"
                appearance="primary"
                intent="success"
                isLoading={loading}
                backgroundColor="#27ae60"
                color="white"
              >
                Update User
              </Button>
              <Button
                type="button"
                appearance="minimal"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .form-control {
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 8px 12px;
          color: #34495e;
        }
        .form-control:focus {
          border-color: #27ae60;
          box-shadow: 0 0 0 0.2rem rgba(39, 174, 96, 0.25);
        }
        .form-label {
          margin-bottom: 0.5rem;
        }
        .card {
          background-color: #ffffff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default UpdateUser; 