"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../actions";

export default function SellRoute() {
    const initialState: State = { message: "", status: undefined}
    const [ state, formAction ] = useFormState(SellProduct, initialState)
    const [ json, setJson ] = useState<null | JSONContent>(null);
    const [ images, setImages ] = useState<null | string[]>(null);
    const [ productFile, setProductFile ] = useState<null | string>(null);

    console.log(state?.errors)

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
                            <Input name="name" type="text" placeholder="Name of your product" />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Category
                            </Label>
                            <SelectCategory />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Price
                            </Label>
                            <Input name="price" type="number" placeholder="shs." />
                        </div>

                        
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Small Summary
                            </Label>
                            <Textarea name="smallDescription" placeholder="Describe your product here..." />
                        </div>

                        {/**used tiptap.dev for the textarea, ie, bold, h1, h3, et al */}
                        <div className="flex flex-col gap-y-2">
                            <input name="description" type="hidden" value={JSON.stringify(json)} />
                            <Label>
                                Description
                            </Label>
                            <TipTapEditor json={json} setJson={setJson} />
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
                            }}
                                onUploadError={(error: Error) => {
                                    throw new Error(`${error}`)
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input name="productFile" type="hidden" value={productFile ?? ""} />

                            <Label>
                                Product File
                            </Label>
                            <UploadDropzone 
                                endpoint="productFileUpload" 
                                onClientUploadComplete={(res) => {
                                setProductFile(res[0].url);
                            }}
                                onUploadError={(error: Error) => {
                                    throw new Error(`${error}`)
                                }}                            
                            />
                        </div>


                    </CardContent>

                    <CardFooter className="mt-5">
                        <Button type="submit">
                            Submit Form
                        </Button>
                    </CardFooter>
                    
                </form>
            </Card>
        </section>
    )
}