import { Card } from "@/components/ui/card";
import { SellForm } from "../components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SellRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        throw new Error("Not authorized!");
    };
    return(
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>
                <SellForm />
            </Card>
        </section>
    )
}