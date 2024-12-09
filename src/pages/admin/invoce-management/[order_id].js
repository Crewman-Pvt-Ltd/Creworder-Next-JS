import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Invoice from '@/components/invoice-management/Invoice';

const ViewInvoice = () => {
  const router = useRouter();
  const { order_id } = router.query; // Extract the order_id from the URL

  return (
    <Layout type="admin">
      {order_id ? <Invoice id={order_id} /> : <p>Loading...</p>}
    </Layout>
  );
};

export default ViewInvoice;
