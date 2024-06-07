import PayPalForm from "@/app/PayPalForm";
import {Suspense} from "react";
import {addEntry} from "@/app/utils/db";

const test = async () => {
    await addEntry("t","t","t","2")
}

export default async function Page() {
    await test();
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <Suspense>
            </Suspense>
        </main>
    );
}