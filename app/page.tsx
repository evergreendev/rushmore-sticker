import client from "@/app/utils/paypal";
import OrderForm from "@/app/OrderForm";

async function test() {
  return client();
}

export default async function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <OrderForm/>
    </main>
  );
}

export const dynamic = 'force-dynamic'