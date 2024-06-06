import Image from "next/image";
import client from "@/app/utils/paypal";
import paypal from '@paypal/checkout-server-sdk';
import PayPalForm from "@/app/PayPalForm";

async function test() {
  return client();
}

export default async function Home() {
  const payPalHttpClient = client();

  let request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    "intent": "CAPTURE",
    "purchase_units": [
      {
        "amount":{
          "currency_code":"USD",
          "value": "100.00"
        }
      }
    ]
  })

  let createOrder = async function() {
    let response = await payPalHttpClient.execute(request);

    return JSON.stringify(response.result.id);
  }

  const orderId = await createOrder();
  let authRequest = new paypal.orders.OrdersAuthorizeRequest(orderId);

/*  authRequest.requestBody({
    payment_source: {}
  }) just need to make a card man*/

  let authorizeOrder = async function() {
    let response = await payPalHttpClient.execute(authRequest);
    console.log(`Response: ${JSON.stringify(response)}`);
    console.log(`Order: ${JSON.stringify(response.result)}`);
  }

  //await authorizeOrder();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PayPalForm/>
    </main>
  );
}