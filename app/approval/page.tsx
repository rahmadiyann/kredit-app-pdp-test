"use client";

import Layout from '../components/Layout';
import { useState } from 'react';

interface DataItem {
  id: number;
  nama: string;
  kendaraan: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const dummyData: DataItem[] = [
  {
    id: 1,
    nama: 'Rahmadiyan Muhammad',
    kendaraan: 'Toyota Avanza',
    status: 'Pending',
  },
  {
    id: 2,
    nama: 'Juliono',
    kendaraan: 'Honda Brio',
    status: 'Approved',
    },
  {
    id: 3,
    nama: 'Ardi',
    kendaraan: 'Suzuki Ertiga',
    status: 'Rejected',
  }
];

export default function Approval() {
  const [data, setData] = useState<DataItem[]>(dummyData);

  const handleApproval = (id: number, newStatus: 'Approved' | 'Rejected') => {
    setData(data.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">Dashboard Approval</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">Nama</th>
              <th className="px-6 py-3 text-left text-gray-600">Kendaraan</th>
              <th className="px-6 py-3 text-left text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="px-6 py-4 text-gray-800">{item.nama}</td>
                <td className="px-6 py-4 text-gray-800">{item.kendaraan}</td>
                <td className="px-6 py-4 text-gray-800">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === 'Pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : item.status === 'Approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApproval(item.id, 'Approved')}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(item.id, 'Rejected')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
