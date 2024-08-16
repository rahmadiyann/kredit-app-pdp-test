import Layout from '../app/components/Layout';
import Form from '../app/components/Form';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Pengajuan Kredit Kendaraan Bermotor
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Form />
        </div>
      </div>
    </Layout>
  );
}
