import { Link } from 'react-router-dom';
import { Pane, Heading } from 'evergreen-ui';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <Pane
      display="flex"
      padding={16}
      background="white"
      borderRadius={0}
      elevation={1}
      className="shadow-sm"
    >
      <Pane flex={1} alignItems="center" display="flex">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Heading size={600}>User Management</Heading>
        </Link>

        <Link
          to="/login"
          className="text-muted"
          style={{
            marginLeft: 'auto',
            textDecoration: 'none',
            fontWeight: 500,
            padding: '6px 12px'
          }}
        >
          Login
        </Link>
      </Pane>
    </Pane>
  );
}

export default Navbar;
