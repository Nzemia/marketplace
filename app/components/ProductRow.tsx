import { notFound } from "next/navigation";
import prisma from "../lib/db"
import { ProductCard } from "./ProductCard";
import Link from "next/link";

interface iAppProps{
    category: "newest" | "templates" | "uikits" | "icons",
}

async function getData({ category }: iAppProps) {
    switch (category) {
        case "icons": {
            const data = await prisma.product.findMany({
                where: {
                    category: "icon",
                },
                select: {
                    smallDescription: true,
                    name: true,                    
                    price: true,
                    id: true,
                    images: true,
                },
                take: 3,
            });

            return {
                data: data,
                title: "Icons",
                link: "/products/icon"
            };            
        }
        case "newest": {
            const data = await prisma.product.findMany({
                select: {
                    price: true,
                    smallDescription: true,
                    category: true,
                    name: true,                    
                    id: true,
                    images: true,
                },                
                orderBy: {
                    createdAt: "desc",
                },
                take: 3,
            });
            
            return {
                data: data,
                title: "Newest Products",
                link: "/products/all",
            };
        }
        case "templates": {
            const data = await prisma.product.findMany({
                where: {
                    category: "template",
                },
                select: {
                    smallDescription: true,
                    name: true,                    
                    price: true,
                    id: true,
                    images: true,
                },
                take: 3,
            });

            return {
                data: data,
                title: "Templates",
                link: "/products/template"
            };
        }
        case "uikits": {
            const data = await prisma.product.findMany({
                where: {
                    category: "uikit",
                },
                select: {
                    smallDescription: true,
                    name: true,                    
                    price: true,
                    id: true,
                    images: true,
                },
                take: 3,
            });   
            
            return {
                data: data,
                title: "Ui Kits",
                link: "/products/uikit"
            };
        }
        default: {
            return notFound();
        }
    }
}


export async function ProductRow({category}: iAppProps) {
    const data = await getData({category: category});

    return (
        <section className="mt-12">
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tighter">
                    {data.title}
                </h2>

                <Link href={data.link} className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">
                    All Products <span>&rarr;</span>
                </Link>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
                {data.data.map((product) => (
                    <ProductCard 
                        images={product.images} 
                        key={product.id} 
                        id={product.id}
                        name={product.name}
                        smallDescription={product.smallDescription}
                        price={product.price}                        
                    />
                ))}                
            </div>
        </section>
    )
}