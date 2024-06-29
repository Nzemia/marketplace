import ProductEmail from "@/components/ProductEmail";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_SECRET_WEBHOOK as string
        );
    } catch (error) {        
        return new Response("Error with webhook", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object; 

            const link = session.metadata?.link;

            const { data, error } = await resend.emails.send({
                from: "FrankUI <onboarding@resend.dev>",
                to: ["mualukofrank@gmail.com"],
                subject: "Your Product from FrankUI",
                react: ProductEmail({
                    link: link as string,
                })
            })

            break;
        }
        default: {
            console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response("Processed!", { status: 200 });
    }
    
};