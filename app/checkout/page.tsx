import PayPalForm from "@/app/PayPalForm";
import {Suspense} from "react";


export default async function Page() {

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <Suspense>
                <PayPalForm/>
            </Suspense>
        </main>
    );
}

export const dynamic = 'force-dynamic'