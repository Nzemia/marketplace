"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../actions";
import { toast } from "sonner";
import { SubmitButton } from "../components/SubmitButton";
import { redirect } from "next/navigation";

export default function SellRoute() {
    const initialState: State = { message: "", status: undefined}
    const [ state, formAction ] = useFormState(SellProduct, initialState)
    const [ json, setJson ] = useState<null | JSONContent>(null);
    const [ images, setImages ] = useState<null | string[]>(null);
    const [ productFile, setProductFile ] = useState<null | string>(null);

    //used shadcn ; sonner toast    
    useEffect(() => {
        if(state.status === "success"){
            toast.success(state.message);
            redirect("/");
        } else if(state.status === "error"){
            toast.error(state.message)
        }
    }, [state])

    return(
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Sell your products</CardTitle>
                        <CardDescription>Please describe your products here in detail.</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Name
                            </Label>
                            <Input name="name" type="text" placeholder="Name of your product" required minLength={3}/>
                            {state?.errors?.["name"] ?.[0] && (
                                <p className="text-destructive">{state?.errors?.["name"] ?.[0]}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Category
                            </Label>
                            <SelectCategory />
                            {state?.errors?.["category"] ?.[0] && (
                                <p className="text-destructive">{state?.errors?.["category"] ?.[0]}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Price
                            </Label>
                            <Input name="price" type="number" placeholder="shs." required minLength={1} />
                            {state?.errors?.["price"] ?.[0] && (
                                <p className="text-destructive">{state?.errors?.["price"] ?.[0]}</p>
                            )}
                        </div>

                        
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Small Summary
                            </Label>
                            <Textarea name="smallDescription" placeholder="Describe your product here..." required minLength={10}/>
                            {state?.errors?.["smallDescription"] ?.[0] && (
                                <p className="text-destructive">{state?.errors?.["smallDescription"] ?.[0]}</p>
                            )}
                        </div>

                        {/**used tiptap.dev for the textarea, ie, bold, h1, h3, et al */}
                        <div className="flex flex-col gap-y-2">
                            <input name="description" type="hidden" value={JSON.stringify(json)} />
                            <Label>
                                Description
                            </Label>
                            <TipTapEditor json={json} setJson={setJson} />
                            {state?.errors?.["description"] ?.[0] && (
                                <p className="text-destructive">{state?.errors?.["description"] ?.[0]}</p>
                            )}
                        </div>
                        
                        <div className="flex flex-col gap-y-2">
                            <input name="images" type="hidden" value={JSON.stringify(images)} />
                            <Label>
                                Product Images
                            </Label>
                            <UploadDropzone 
                                endpoint="imageUploader" 
                                onClientUploadComplete={(res) => {
                                setImages(res.map((item) => item.url));
                                toast.success("Image uploaded successfully!")
                            }}
                                onUploadError={(error: Error) => {
                                    toast.error("Something went wrong, try again later!")
                                }}
                            />
                            {state?.errors?.["images"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="productFile"  value={productFile ?? ""} />

                            <Label>
                                Product File
                            </Label>
                            <UploadDropzone                                
                                onClientUploadComplete={(res) => {
                                setProductFile(res[0].url);
                                toast.success("File uploaded successfully!")
                            }}
                                endpoint="productFileUpload" 
                                onUploadError={(error: Error) => {
                                    toast.error("Something went wrong, try again later!")
                                }}                            
                            />
                            {state?.errors?.["productFile"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["productFile"]?.[0]}</p>
                            )}
                        </div>


                    </CardContent>

                    <CardFooter className="mt-5">
                        <SubmitButton />
                    </CardFooter>
                    
                </form>
            </Card>
        </section>
    )
}