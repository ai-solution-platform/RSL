'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { users as allUsers } from '@/data/users';
import { Search, ChevronLeft, ChevronRight, X, Eye, Ban, Trash2, CheckCircle } from 'lucide-react';

type UserStatus = 'active' | 'suspended';
type RoleFilter = 'all' | 'tenant' | 'landlord';

interface AdminUser {
  id: string;
  name: string;
  nameTh: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  company: string;
  companyTh: string;
  verified: boolean;
  createdAt: string;
  status: UserStatus;
}

export default function AdminUsersPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  // Add mock status to users
  const [userList, setUserList] = useState<AdminUser[]>(
    allUsers.map((u) => ({ ...u, status: 'active' as UserStatus }))
  );
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const perPage = 10;

  const filtered = useMemo(() => {
    return userList.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [userList, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleStatus = (id: string) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      )
    );
    alert(isEn ? 'User status updated!' : 'อัปเดตสถานะผู้ใช้แล้ว!');
  };

  const deleteUser = (id: string) => {
    if (confirm(isEn ? 'Are you sure you want to delete this user?' : 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
      setUserList((prev) => prev.filter((u) => u.id !== id));
      setSelectedUser(null);
      alert(isEn ? 'User deleted!' : 'ลบผู้ใช้แล้ว!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEn ? 'User Management' : 'จัดการผู้ใช้'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEn ? 'Manage all platform users' : 'จัดการผู้ใช้ทั้งหมดบนแพลตฟอร์ม'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isEn ? 'Search by name or email...' : 'ค้นหาตามชื่อหรืออีเมล...'}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'tenant', 'landlord'] as RoleFilter[]).map((r) => (
            <button
              key={r}
              onClick={() => { setRoleFilter(r); setPage(1); }}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                roleFilter === r
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {r === 'all'
                ? isEn ? 'All' : 'ทั้งหมด'
                : r === 'tenant'
                ? isEn ? 'Tenant' : 'ผู้เช่า'
                : isEn ? 'Landlord' : 'เจ้าของ'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'User' : 'ผู้ใช้'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Email' : 'อีเมล'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Role' : 'บทบาท'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Status' : 'สถานะ'}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">{isEn ? 'Joined' : 'สมัครเมื่อ'}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">{isEn ? 'Actions' : 'การดำเนินการ'}</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    {isEn ? 'No users found' : 'ไม่พบผู้ใช้'}
                  </td>
                </tr>
              ) : (
                paginated.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedUser(u)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full bg-gray-200"
                        />
                        <span className="font-medium text-gray-800">
                          {isEn ? u.name : u.nameTh}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          u.role === 'tenant'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {u.role === 'tenant'
                          ? isEn ? 'Tenant' : 'ผู้เช่า'
                          : isEn ? 'Landlord' : 'เจ้าของ'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          u.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {u.status === 'active'
                          ? isEn ? 'Active' : 'ใช้งาน'
                          : isEn ? 'Suspended' : 'ระงับ'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString(isEn ? 'en-US' : 'th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                          title={isEn ? 'View' : 'ดู'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                          title={u.status === 'active' ? (isEn ? 'Suspend' : 'ระงับ') : (isEn ? 'Activate' : 'เปิดใช้งาน')}
                        >
                          {u.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                          title={isEn ? 'Delete' : 'ลบ'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {isEn
              ? `Showing ${(page - 1) * perPage + 1}-${Math.min(page * perPage, filtered.length)} of ${filtered.length}`
              : `แสดง ${(page - 1) * perPage + 1}-${Math.min(page * perPage, filtered.length)} จาก ${filtered.length}`}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                  p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img src={selectedUser.avatar} alt="" className="w-14 h-14 rounded-full bg-gray-200" />
                  <div>
                    <h3 className="text-lg font-bold">{isEn ? selectedUser.name : selectedUser.nameTh}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-1 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">{isEn ? 'Role' : 'บทบาท'}</p>
                    <p className="font-medium capitalize">{selectedUser.role === 'tenant' ? (isEn ? 'Tenant' : 'ผู้เช่า') : (isEn ? 'Landlord' : 'เจ้าของ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">{isEn ? 'Status' : 'สถานะ'}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedUser.status === 'active' ? (isEn ? 'Active' : 'ใช้งาน') : (isEn ? 'Suspended' : 'ระงับ')}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">{isEn ? 'Phone' : 'โทรศัพท์'}</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">{isEn ? 'Verified' : 'ยืนยันแล้ว'}</p>
                    <p className="font-medium">{selectedUser.verified ? (isEn ? 'Yes' : 'ใช่') : (isEn ? 'No' : 'ไม่')}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">{isEn ? 'Company' : 'บริษัท'}</p>
                  <p className="font-medium">{isEn ? selectedUser.company : selectedUser.companyTh}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">{isEn ? 'Joined' : 'สมัครเมื่อ'}</p>
                  <p className="font-medium">
                    {new Date(selectedUser.createdAt).toLocaleDateString(isEn ? 'en-US' : 'th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => toggleStatus(selectedUser.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                    selectedUser.status === 'active'
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {selectedUser.status === 'active' ? (isEn ? 'Suspend' : 'ระงับ') : (isEn ? 'Activate' : 'เปิดใช้งาน')}
                </button>
                <button
                  onClick={() => deleteUser(selectedUser.id)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100"
                >
                  {isEn ? 'Delete User' : 'ลบผู้ใช้'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
