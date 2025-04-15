import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { Button, Pane, Heading, Text, Dialog } from 'evergreen-ui';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const columnDefs = useMemo(() => [
    { 
      field: 'firstName', 
      headerName: 'First Name', 
      sortable: true, 
      filter: true,
      minWidth: 120,
      flex: 1
    },
    { 
      field: 'lastName', 
      headerName: 'Last Name', 
      sortable: true, 
      filter: true,
      minWidth: 120,
      flex: 1
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      sortable: true, 
      filter: true,
      minWidth: 200,
      flex: 2
    },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      sortable: true, 
      filter: true,
      minWidth: 140,
      flex: 1
    },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div className="d-flex gap-2">
          <Button
            appearance="primary"
            intent="info"
            onClick={() => {
              setSelectedUser(params.data);
              setIsViewDialogOpen(true);
            }}
          >
            View
          </Button>
          <Button
            appearance="primary"
            intent="success"
            onClick={() => navigate(`/update-user/${params.data._id}`)}
          >
            Edit
          </Button>          
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => handleDelete(params.data._id)}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: false,
      filter: false,
      minWidth: 200,
      flex: 1
    },
  ], [navigate]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    filter: true,
    sortable: true,
    headerClass: 'header-cell',
    cellClass: 'data-cell'
  }), []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setRowData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        fetchUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="container-fluid py-5 px-4">
      <div className="row mb-4">
        <div className="col">
          <Heading size={600} color="#2c3e50">Users</Heading>
        </div>
        <div className="col-auto">
          <Button
            appearance="primary"
            intent="success"
            onClick={() => navigate('/add-user')}
          >
            Add New User
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-3">
          <Text color="danger">{error}</Text>
        </div>
      )}

      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>

        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          pagination={true}
          enableCellTextSelection={true}
          suppressCellFocus={true}
          rowHeight={50}
          headerHeight={50}
        />
      </div>

      <Dialog
        isShown={isViewDialogOpen}
        title="User Details"
        onCloseComplete={() => setIsViewDialogOpen(false)}
        hasFooter={false}
        width={800}
      >
        {selectedUser && (
          <div className="user-details">
            <Pane display="flex" flexDirection="column" gap={24}>
              {/* Header Section */}
              <Pane display="flex" alignItems="center" gap={16} paddingBottom={16} borderBottom="1px solid #e0e0e0">
                <Pane
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={48}
                  height={48}
                  borderRadius={8}
                  backgroundColor="#f8f9fa"
                >
                  <Text size={600} color="#2c3e50">
                    {selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}
                  </Text>
                </Pane>
                <Pane>
                  <Heading size={600} color="#2c3e50">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </Heading>
                  <Text size={400} color="#7f8c8d">
                    {selectedUser.email}
                  </Text>
                </Pane>
              </Pane>

              {/* Contact Information */}
              <Pane>
                <Heading size={500} marginBottom={16} color="#2c3e50">Contact Information</Heading>
                <Pane display="grid" gridTemplateColumns="1fr 1fr" gap={16}>
                  <Pane>
                    <Text size={400} color="#7f8c8d">Phone:</Text>
                    <Text size={500} color="#2c3e50">{selectedUser.phone}</Text>
                  </Pane>
                  <Pane>
                    <Text size={400} color="#7f8c8d">Date of Birth:</Text>
                    <Text size={500} color="#2c3e50">
                      {selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </Text>
                  </Pane>
                </Pane>
              </Pane>

              {/* Address Information */}
              <Pane>
                <Heading size={500} marginBottom={16} color="#2c3e50">Address</Heading>
                <Pane display="grid" gridTemplateColumns="1fr 1fr" gap={16}>
                  <Pane>
                    <Text size={400} color="#7f8c8d">Address Line 1:</Text>
                    <Text size={500} color="#2c3e50">{selectedUser.address1}</Text>
                  </Pane>
                  <Pane>
                    <Text size={400} color="#7f8c8d">Address Line 2:</Text>
                    <Text size={500} color="#2c3e50">{selectedUser.address2}</Text>
                  </Pane>
                  <Pane>
                    <Text size={400} color="#7f8c8d">City:</Text>
                    <Text size={500} color="#2c3e50">{selectedUser.city}</Text>
                  </Pane>
                  <Pane>
                    <Text size={400} color="#7f8c8d">Postal Code:</Text>
                    <Text size={500} color="#2c3e50">{selectedUser.postalCode}</Text>
                  </Pane>
                  <Pane>
                    <Text size={400} color="#7f8c8d">Country:</Text>
                    <Text size={500} color="#2c3e50">{selectedUser.country}</Text>
                  </Pane>
                </Pane>
              </Pane>

              {/* Notes */}
              {selectedUser.userNotes && (
                <Pane>
                  <Heading size={500} marginBottom={16} color="#2c3e50">Notes:</Heading>
                  <Pane
                    padding={16}
                    borderRadius={8}
                    backgroundColor="#f8f9fa"
                    border="1px solid #e0e0e0"
                  >
                    <Text size={400} color="#34495e">{selectedUser.userNotes}</Text>
                  </Pane>
                </Pane>
              )}

              {/* Action Buttons */}
              <Pane display="flex" justifyContent="flex-end" gap={8} marginTop={24}>
                <Button
                  appearance="minimal"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  appearance="primary"
                  intent="success"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    navigate(`/update-user/${selectedUser._id}`);
                  }}
                >
                  Edit User
                </Button>
              </Pane>
            </Pane>
          </div>
        )}
      </Dialog>

      <style jsx global>{`
        .container-fluid {
          max-width: 98%;
          margin: 0 auto;
        }
        .ag-theme-alpine {
          --ag-grid-size: 3px;
          --ag-list-item-height: 20px;
          --ag-font-size: 14px;
          --ag-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .ag-theme-alpine .ag-header {
          background-color: #f8f9fa;
          border-bottom: 2px solid #e0e0e0;
        }
        .ag-theme-alpine .ag-header-cell {
          font-weight: 600;
          color: #2c3e50;
        }
        .ag-theme-alpine .ag-row {
          border-bottom: 1px solid #e0e0e0;
        }
        .ag-theme-alpine .ag-row:hover {
          background-color: #f8f9fa;
        }
        .ag-theme-alpine .ag-cell {
          padding: 8px 16px;
        }
        .header-cell {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          color: #2c3e50;
        }
        .data-cell {
          color: #34495e;
        }
        .user-details {
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default UserList; 