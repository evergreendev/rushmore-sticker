import client from "@/app/utils/paypal";
import paypal from "@paypal/checkout-server-sdk";
import {calculateTotals} from "@/app/utils/stickers";

export async function POST(request: Request) {
    const payPalHttpClient = client();

    const res = await request.json();
    const numberOfStickers = res.numberOfStickers;
    const totals = calculateTotals(numberOfStickers);

    let CreateRequest = new paypal.orders.OrdersCreateRequest();

    // @ts-ignore
    CreateRequest.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "items":[{
                    "name": "Sticker",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "5"
                    },
                    quantity: numberOfStickers,
                    category: "DIGITAL_GOODS"
                }],
                "amount":{
                    "currency_code":"USD",
                    "value": totals.totalWithTaxFormatted,
                    "breakdown": {
                        "discount" : {
                          "currency_code": "USD",
                          "value": totals.totalDiscounts.toFixed(2)
                        },
                        "item_total" : {
                            "currency_code": "USD",
                            "value": (numberOfStickers * 5).toFixed(2)
                        },
                        "tax_total": {
                            "currency_code": "USD",
                            "value": totals.tax.toFixed(2)
                        }
                    } as any
                },
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

export const dynamic = 'force-dynamic'