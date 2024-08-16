"use client";

import { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SignatureCanvas from 'react-signature-canvas';

interface FormData {
  nama: string;
  nik: string;
  tanggalLahir: string;
  kendaraan: string;
  hargaKendaraan: number;
  tandaTangan: string;
}

const schema = yup.object().shape({
  nama: yup.string().required('Nama wajib diisi'),
  nik: yup.string().required('NIK wajib diisi').length(16, 'NIK harus terdiri dari 16 digit'),
  tanggalLahir: yup.string().required('Tanggal lahir wajib diisi'),
  kendaraan: yup.string().required('Kendaraan wajib diisi'),
  hargaKendaraan: yup.number().required('Harga kendaraan wajib diisi').positive('Harga kendaraan harus lebih dari 0'),
  tandaTangan: yup.string().required('Tanda tangan wajib diisi'),
});

export default function Form() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form data submitted: ", data);
    alert("Pengajuan berhasil dikirim!");
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setValue('tandaTangan', '');
  };

  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setValue('tandaTangan', sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    } else {
      setValue('tandaTangan', '');
      alert("Tanda tangan belum diisi");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama:</label>
        <input
          type="text"
          {...register('nama')}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.nama ? 'border-red-500' : ''}`}
        />
        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">NIK:</label>
        <input
          type="text"
          {...register('nik')}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.nik ? 'border-red-500' : ''}`}
        />
        {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tanggal Lahir:</label>
        <input
          type="date"
          {...register('tanggalLahir')}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.tanggalLahir ? 'border-red-500' : ''}`}
        />
        {errors.tanggalLahir && <p className="text-red-500 text-xs mt-1">{errors.tanggalLahir.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Kendaraan:</label>
        <input
          type="text"
          {...register('kendaraan')}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.kendaraan ? 'border-red-500' : ''}`}
        />
        {errors.kendaraan && <p className="text-red-500 text-xs mt-1">{errors.kendaraan.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Harga Kendaraan:</label>
        <input
          type="number"
          {...register('hargaKendaraan')}
          className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.hargaKendaraan ? 'border-red-500' : ''}`}
        />
        {errors.hargaKendaraan && <p className="text-red-500 text-xs mt-1">{errors.hargaKendaraan.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tanda Tangan:</label>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: 'sigCanvas mt-1' }}
          onEnd={saveSignature}
        />
        <button type="button" onClick={clearSignature} className="mt-2 text-sm text-red-500 underline">Clear</button>
        {errors.tandaTangan && <p className="text-red-500 text-xs mt-1">{errors.tandaTangan.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Kirim Pengajuan</button>
    </form>
  );
}
