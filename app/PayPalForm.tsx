"use client"
import {
    PayPalCardFieldsForm,
    PayPalCardFieldsProvider,
    PayPalScriptProvider, usePayPalCardFields
} from "@paypal/react-paypal-js";
import {useState} from "react";

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

    async function createOrder() {
        const order = await fetch("/order/create", {
            method: "POST",
            // Use the "body" parameter to optionally pass additional order information
            body: JSON.stringify({
                "salesPrice": "10.00"//TODO CHANGE THIS
            }),
        });
        const res = await order.json();

        return JSON.parse(res).id;
    }

    async function onApprove(data: { orderID: any; }) {
        try {
            const response = await fetch(`/order/create/${data.orderID}/capture`, {
                method: "POST",
            });
            const orderData = await response.json();
        } catch (err) {
            console.error(err);
        }
    }

    function onError(error:any) {
        // Do something with the error from the SDK
        console.error(error)
    }

    function handleBillingAddressChange(field: string, value: string) {
        setBillingAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return <PayPalScriptProvider
        options={{
            clientId: "AUmeRrIKPlM5FoKsgT0Ol7Ro5criswqkdvsD4_B3b2pO-LA31OXivdKvIQN05ugv86nmC1rJdXKfMasT",
            components: "card-fields",
        }}
    >
        <PayPalCardFieldsProvider
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        >
            <div className="text-slate-950">
                <PayPalCardFieldsForm/>
                <input
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
                />
                {/* Custom client component to handle card fields submission */}
                <SubmitPayment
                    isPaying={isPaying}
                    setIsPaying={setIsPaying}
                    billingAddress={billingAddress}
                />
            </div>
        </PayPalCardFieldsProvider>
    </PayPalScriptProvider>
}

const SubmitPayment = ({isPaying, setIsPaying, billingAddress}: any) => {
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
        cardFieldsForm.submit({billingAddress}).catch((err) => {
            setIsPaying(false);
        });
    };

    return (
        <button
            className={`p-2 px-6 ${isPaying ? "bg-gray-300 text-white" : "bg-orange-600 text-white"}`}
            style={{float: "right"}}
            onClick={handleClick}
        >
            {isPaying ? <div className="animate-spin border-gray-50 border-l-2 rounded-full size-5"/> : "Pay"}
        </button>
    );
};

export default PayPalForm;
