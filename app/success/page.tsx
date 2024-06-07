import {Suspense} from "react";
import ThankYou from "@/app/ThankYou";


export default async function Page() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense>
                <ThankYou/>
            </Suspense>
        </main>
    );
}