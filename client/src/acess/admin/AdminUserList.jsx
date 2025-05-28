import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:6001/api/admin/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`http://localhost:6001/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const handleRoleChange = async (id, role) => {
    const res = await axios.put(
      `http://localhost:6001/api/admin/users/${id}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsers((prev) => prev.map((u) => (u._id === id ? res.data : u)));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      { header: "Username", accessorKey: "username" },
      { header: "Email", accessorKey: "email" },
      {
        header: "Role",
        cell: ({ row }) => (
          <select
            className="border rounded p-1"
            value={row.original.role}
            onChange={(e) =>
              handleRoleChange(row.original._id, e.target.value)
            }>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => handleDelete(row.original._id)}>
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id} className="border p-2 text-left">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList;
