import client from "@/app/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(request: Request) {
    const payPalHttpClient = client();

    const res = await request.json();
    const salesPrice = res.salesPrice;

    let CreateRequest = new paypal.orders.OrdersCreateRequest();

    CreateRequest.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount":{
                    "currency_code":"USD",
                    "value": salesPrice
                }
            }
        ]
    });

    let createOrder = async function() {
        let response = await payPalHttpClient.execute(CreateRequest);

        return JSON.stringify(response.result);
    }

    const order = await createOrder();

    return Response.json(order);
}