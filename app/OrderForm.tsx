"use client"

import {useEffect, useState} from "react";
import {checkout} from "@/app/actions";
import sticker1 from "@/public/sticker.png";
import Image from "next/image";
import {calculateTotals} from "@/app/utils/stickers";

const OrderForm = () => {
    const [orderInfo, setOrderInfo] = useState({
        teamName: "",
        name: "",
    });
    const [numberOfStickers, setNumberOfStickers] = useState("1");
    const [amountToBePaid, setAmountToBePaid] = useState("5.00");
    const [grandTotal, setGrandTotal] = useState("5.31");

    function handleOrderInfoChange(fieldName: string, newValue: string) {
        setOrderInfo({
            ...orderInfo,
            [fieldName]: newValue,
        })
    }

    useEffect(() => {
        const totals = calculateTotals(numberOfStickers);
        setAmountToBePaid(totals.totalFormatted);
        setGrandTotal(totals.totalWithTaxFormatted);
    }, [numberOfStickers]);

    return <div className="text-slate-950 bg-slate-100 w-full max-w-screen-lg p-8">
        <form action={checkout} className="flex flex-wrap items-center gap-8 mb-8">
            <div className="w-full">
                <label className="font-bold mr-2">Full Name:</label>
                <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="border-slate-500 border-[1px] text-xl px-2 py-4 rounded w-full"
                    onChange={(e) =>
                        handleOrderInfoChange("name", e.target.value)
                    }
                />
            </div>
            <div className="w-full">
                <label className="font-bold mr-2">Team Name:</label>
                <input
                    required
                    type="text"
                    id="team-name"
                    name="team-name"
                    className="border-slate-500 border-[1px] text-xl px-2 py-4 rounded w-full"
                    onChange={(e) =>
                        handleOrderInfoChange("teamName", e.target.value)
                    }
                />
            </div>
            <div className="w-full">
                <label htmlFor="age-division" className="font-bold mr-2 w-full block">Age Division:</label>
                <select name="age-division" required id="age-division" className="border-slate-500 border-[1px] text-2xl p-2 rounded">
                    <option>
                        10U
                    </option>
                    <option>
                        12U
                    </option>
                    <option>
                        14U
                    </option>
                    <option>
                        16U
                    </option>
                    <option>
                        18U
                    </option>
                </select>
            </div>
            <div className="w-full">
                <label className="font-bold mr-2">Number of Stickers:</label>
                <input
                    required
                    min={1}
                    value={numberOfStickers}
                    type="number"
                    id="number-of-stickers"
                    name="number-of-stickers"
                    className="border-slate-500 border-[1px] text-xl px-2 py-4 rounded w-full"
                    onChange={(e) =>
                        setNumberOfStickers(e.target.value)
                    }
                />
            </div>

            <div className="flex flex-col ml-auto mt-8">
                <h2 className="text-3xl mb-3">Sticker Total (Excludes Tax): <span className="font-bold">${amountToBePaid}</span></h2>
                <h2 className="text-2xl mb-3">Grand Total: <span className="font-bold">${grandTotal}</span></h2>
                <button className="ml-auto block bg-blue-900 text-white text-4xl px-2 py-2 rounded">Check Out</button>
            </div>
        </form>
    </div>
}

export default OrderForm;