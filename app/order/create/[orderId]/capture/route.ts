import client from "@/app/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(request: Request, {params}: {params: {orderId: string}}) {
    const payPalHttpClient = client();

    console.log(params);

    let CreateRequest = new paypal.orders.OrdersCaptureRequest(params.orderId);

    /*CreateRequest.requestBody({} as any);*/

    let captureOrder = async function() {
        let response = await payPalHttpClient.execute(CreateRequest);

        console.log(response);

        return JSON.stringify(response.result);
    }

    const orderId = await captureOrder();

    return Response.json(orderId);
}