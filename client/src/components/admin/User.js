import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';

const User = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    permissions: []
  });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]); // List of users
  const [editMode, setEditMode] = useState(false); // Edit mode
  const [currentUserId, setCurrentUserId] = useState(null); // Current user ID for editing

  useEffect(() => {
    // Fetch users on component mount
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      setMessage('Error fetching users');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newPermissions = checked
        ? [...prevData.permissions, value]
        : prevData.permissions.filter((perm) => perm !== value);
      return { ...prevData, permissions: newPermissions };
    });
  };

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update user
        await axios.put(`http://localhost:5000/api/users/${currentUserId}`, formData);
        setMessage('User updated successfully.');
      } else {
        // Create a new user
        await axios.post('http://localhost:5000/api/users', formData);
        setMessage('User created successfully.');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating or updating user');
    }
  };

  // Fill form with user data for editing
  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      password: '', // Leave empty to avoid showing the password
      role: user.role,
      permissions: user.permissions
    });
    setCurrentUserId(user._id);
    setEditMode(true);
  };

  // Delete a user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setMessage('User deleted successfully.');
      fetchUsers();
    } catch (error) {
      setMessage('Error deleting user');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      role: '',
      permissions: []
    });
    setEditMode(false);
    setCurrentUserId(null);
  };

  return (
    <div className="container mt-5">
      <h2>{editMode ? 'Edit User' : 'Create User'}</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            required={!editMode} // Required only in creation mode
          />
        </div>

        <div className="form-group mb-3">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Permissions</label>
          <div className="form-check">
            <input
              type="checkbox"
              name="permissions"
              value="view_reports"
              onChange={handlePermissionChange}
              checked={formData.permissions.includes('view_reports')}
              className="form-check-input"
            />
            <label className="form-check-label">View Reports</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="permissions"
              value="edit_users"
              onChange={handlePermissionChange}
              checked={formData.permissions.includes('edit_users')}
              className="form-check-input"
            />
            <label className="form-check-label">Edit Users</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="permissions"
              value="manage_finances"
              onChange={handlePermissionChange}
              checked={formData.permissions.includes('manage_finances')}
              className="form-check-input"
            />
            <label className="form-check-label">Manage Finances</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {editMode ? 'Update User' : 'Create User'}
        </button>
        {editMode && (
          <button type="button" onClick={resetForm} className="btn btn-secondary ms-2">
            Cancel
          </button>
        )}
      </form>

      <h2 className="mt-5">User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="btn btn-sm btn-warning me-2">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
