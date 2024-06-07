import PayPalForm from "@/app/PayPalForm";
import {Suspense} from "react";
import {addEntry} from "@/app/utils/db";

const test = async () => {
    return await addEntry("t","t","t","2")
}

export default async function Page() {
    const testRes = await test();

    console.log(testRes);
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <Suspense>
            </Suspense>
        </main>
    );
}

export const dynamic = 'force-dynamic'