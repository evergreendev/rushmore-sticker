"use client"
import {
    PayPalCardFieldsForm,
    PayPalCardFieldsProvider,
    PayPalScriptProvider, usePayPalCardFields, usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import 'react-toastify/dist/ReactToastify.css';
import {PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "next/navigation";
import {calculateTotals} from "@/app/utils/stickers";
import {success} from "@/app/actions";
import { ToastContainer, toast } from 'react-toastify';
import {addEntry} from "@/app/utils/db";

const PayPalForm = () => {
    const [isPaying, setIsPaying] = useState(false);
    const [billingAddress, setBillingAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        adminArea1: "",
        adminArea2: "",
        countryCode: "US",
        postalCode: "",
    });
    const searchParams = useSearchParams();
    const numberOfStickers = searchParams.get("number-of-stickers");

    const createOrder = useCallback(async function () {
        if (isPaying) return;
        const order = await fetch("/order/create", {
            method: "POST",
            // Use the "body" parameter to optionally pass additional order information
            body: JSON.stringify({
                "numberOfStickers": numberOfStickers
            }),
        });
        const res = await order.json();

        return JSON.parse(res).id;
    },[isPaying, numberOfStickers]);

    async function onApprove(data: { orderID: any; }) {
        try {
            const response = await fetch(`/order/create/${data.orderID}/capture`, {
                method: "POST",
            });
            const orderData = await response.json();
            if (orderData && JSON.parse(orderData).status === "COMPLETED"){
                if (JSON.parse(orderData).purchase_units[0].payments.captures[0].status === "DECLINED"){
                    toast('Your Payment was declined. Please try another card', {
                        position: "bottom-right",
                        type: "error"
                    });
                } else {//THIS IS THE SUCCESSFUL PATH

                    await addEntry(searchParams.get("name") || "", searchParams.get("age-division") || "", searchParams.get("team-name") || "", searchParams.get("number-of-stickers") || "")

                    await success(searchParams.get("name") || "", searchParams.get("age-division") || "", searchParams.get("team-name") || "", searchParams.get("number-of-stickers") || "");
                }
            } else {
                toast('Something went wrong please try again', {
                    position: "bottom-right",
                    type: "error"
                });
            }

            setIsPaying(false);
        } catch (err) {
            console.error(err);
        }
    }

    function onError(error: any) {
        // Do something with the error from the SDK
        console.error(error)
    }

    const totals = calculateTotals(numberOfStickers||"0");
    const amountToBePaid = totals.totalFormatted;
    const grandTotal = totals.totalWithTaxFormatted;

    return <PayPalScriptProvider
        options={{
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID||"",
            components: "card-fields",
        }}
    >
        <PayPalCardFieldsProvider
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        >
            <div className="text-slate-950 bg-slate-100 p-2">
                <p className="font-bold text-2xl">Payment Info</p>
                <PayPalCardFieldsForm/>
                {/*                <input
                    type="text"
                    id="card-billing-address-line-2"
                    name="card-billing-address-line-2"
                    placeholder="Address line 1"
                    onChange={(e) =>
                        handleBillingAddressChange("addressLine1", e.target.value)
                    }
                />
                <input
                    type="text"
                    id="card-billing-address-line-2"
                    name="card-billing-address-line-2"
                    placeholder="Address line 2"
                    onChange={(e) =>
                        handleBillingAddressChange("addressLine2", e.target.value)
                    }
                />
                <input
                    type="text"
                    id="card-billing-address-postal-code"
                    name="card-billing-address-postal-code"
                    placeholder="Postal/zip code"
                    onChange={(e) =>
                        handleBillingAddressChange("postalCode", e.target.value)
                    }
                />*/}
                {/* Custom client component to handle card fields submission */}
                <div className="w-full">
                    <h2 className="text-3xl mb-3">Sticker Count: {numberOfStickers}</h2>
                    <h2 className="text-3xl mb-3">Sticker Total (Excludes Tax): <span
                        className="font-bold">${amountToBePaid}</span></h2>
                    <h2 className="text-2xl mb-3">Grand Total: <span className="font-bold">${grandTotal}</span></h2>
                </div>
                <SubmitPayment
                    isPaying={isPaying}
                    setIsPaying={setIsPaying}
                    billingAddress={billingAddress}
                    numberOfSticker={numberOfStickers}
                />
            </div>
        </PayPalCardFieldsProvider>
    </PayPalScriptProvider>
}

const SubmitPayment = ({isPaying, setIsPaying, billingAddress, numberOfStickers}: any) => {
    const {cardFieldsForm, fields} = usePayPalCardFields();

    const handleClick = async () => {
        if (!cardFieldsForm) {
            const childErrorMessage =
                "Unable to find any child components in the <PayPalCardFieldsProvider />";

            throw new Error(childErrorMessage);
        }
        const formState = await cardFieldsForm.getState();

        if (!formState.isFormValid) {
            return alert("The payment form is invalid");
        }
        setIsPaying(true);

        // @ts-ignore
        cardFieldsForm.submit({billingAddress,numberOfStickers}).catch((err) => {
            setIsPaying(false);
        });
    };

    return (
        <div className="flex">
            <ToastContainer/>
            <button
                disabled={isPaying}
                className={`ml-auto block bg-blue-900 text-white text-4xl px-2 py-2 rounded font-bold ${isPaying ? "bg-gray-300 text-white" : "bg-amber-900 text-white"}`}
                style={{float: "right"}}
                onClick={handleClick}
            >
                {isPaying ?
                    <div
                        className="animate-spin border-gray-50 border-l-2 rounded-full size-5"/> : "Submit Payment"}
            </button>
        </div>

    );
};

export default PayPalForm;
