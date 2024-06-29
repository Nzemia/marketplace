import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { ProductCard } from "../components/ProductCard";

//for deploying to avoid the errors
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string){
    const data = await prisma.product.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
            price: true,
            smallDescription: true,
            images: true,            
        },
    });

    return data;
}



export default async function MyProductsRoute(){
    noStore(); 
    
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        throw new Error("Not authorized!");
    }

    const data = await getData(user.id);

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-2xl font-bold">My Products</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
                {data.map((item) => (
                    <ProductCard 
                        key={item.id}
                        id={item.id}
                        images={item.images}
                        price={item.price}
                        name={item.name}
                        smallDescription={item.smallDescription}
                    />
                ))}

                {data.length === 0 && (
                    <p className="text-center mt-10">You have no products yet.</p>
                )}
            </div>
            
        </section>
    )
}