"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { CategoryTypes } from "@prisma/client";

export type State = {
    status: "error" | "success" | undefined;
    errors ? : {
        [key: string] : string[];
    };
    message ? : string | null;
}

//used zod, npm i zod
const productSchema = z.object({
    name: z.string().min(3, { message: "The minimum character can only be 5!" }),
    category: z.string().min(1, { message: "Category is required! "}),
    price: z.number().min(1, { message: "Price cannot be 0 or less than 0! "}),
    smallDescription: z.string().min(10, { message: "Please summarize your product more! "}),
    description: z.string().min(10, { message: "Description is required! "}),
    images: z.array(z.string(), { message: "Images are required! "}),
    productFile: z.string().min(1, { message: "Please upload zip of your product! "}),
});

//since updating aint a must for each field, we make them optional by z.literal("").optional()
const userSettingsSchema = z.object({
    firstName: z.string().min(3, { message: "Minimum character length of 3 is required!"}).or(z.literal("")).optional(),
    lastName: z.string().min(3, { message: "Minimum character length of 3 is required!"}).or(z.literal("")).optional(),
})

export async function SellProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        throw new Error("Something went wrong!");
    }

    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile")
    });

    if(!validateFields.success) {
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, error!"
        };

        return state;
    }

    await prisma.product.create({
        data: {
            name: validateFields.data.name,
            category: validateFields.data.category as CategoryTypes,
            smallDescription: validateFields.data.smallDescription,
            price: validateFields.data.price,
            images: validateFields.data.images,
            productFile: validateFields.data.productFile,
            userId: user.id,
            description: JSON.parse(validateFields.data.description),
        }
    })

    const state: State = { 
        status: "success",
        message: "Your product has been created successfully!",
    };

    return state;
};

export async function UpdateUserSettings( prevState: any, formData: FormData ){
    const { getUser } = getKindeServerSession();
    const user = await getUser()

    if(!user) {
        throw new Error("Something went wrong, try again later!");
    }

    const validateFields = userSettingsSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    })

    if(!validateFields.success){
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Oops, error!"
        };

        return state;
    }

    const data = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: validateFields.data.firstName,
            lastName: validateFields.data.lastName
        }
    })

    const state: State = { 
        status: "success",
        message: "Account updated successfully!",
    };

    return state;
}