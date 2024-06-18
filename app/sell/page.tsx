import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";

export default function SellRoute() {
    return(
        <section className="max-w-7xl mx-auto px-4 md:px-8">
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
                    </CardContent>
                </form>
            </Card>
        </section>
    )
}