"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { State, UpdateUserSettings } from "../actions";
import { useEffect } from "react";
import { toast } from "sonner";

interface iAppProps {
    firstName: string,
    lastName: string,
    email: string,
}

export function SettingsForm({ email, firstName, lastName} : iAppProps){
    const initialState: State = { message: "", status: undefined }
    const [ state, formAction ] = useFormState(UpdateUserSettings, initialState)

    useEffect(() => {
        if(state?.status === "error"){
            toast.error(state.message)
        } else if(state?.status === "success"){
            toast.success(state.message)
        }
    }, [state])
    return(
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Settings</CardTitle>

                <CardDescription>Settings regarding your account</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                    <Label>First Name</Label>
                    <Input 
                        name="firstName" 
                        type="text"
                        defaultValue={firstName}                                               
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Last Name</Label>
                    <Input 
                        name="lastName" 
                        type="text"
                        defaultValue={lastName}                       
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Email</Label>
                    <Input 
                        name="email" 
                        type="email" 
                        defaultValue={email}
                        disabled                        
                    />
                </div>
            </CardContent>

            <CardFooter>
                <SubmitButton title="Update"/>
            </CardFooter>
        </form>
    )
}