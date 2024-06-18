import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";

export default function SellRoute() {
    return(
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
            <Card>
                <form>
                    <CardHeader>
                        <CardTitle>Sell your products</CardTitle>
                        <CardDescription>Please describe your products here in detail.</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Name
                            </Label>
                            <Input type="text" placeholder="Name of your product" />
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
                            <Input type="number" placeholder="shs." />
                        </div>

                        
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Small Summary
                            </Label>
                            <Textarea placeholder="Describe your product here..." />
                        </div>

                        {/**used tiptap.dev for the textarea, ie, bold, h1, h3, et al */}
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Description
                            </Label>
                            <TipTapEditor />
                        </div>
                        
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Product Images
                            </Label>
                            <UploadDropzone endpoint="imageUploader" />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Product File
                            </Label>
                            <UploadDropzone endpoint="productFileUpload" />
                        </div>


                    </CardContent>

                    <CardFooter className="mt-5">
                        <Button>
                            Submit Form
                        </Button>
                    </CardFooter>
                    
                </form>
            </Card>
        </section>
    )
}