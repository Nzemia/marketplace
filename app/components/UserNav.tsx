import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";


//dynamically for showing user details if logged in
interface iAppProps {
    email: string;
    name: string;
    userImage: string | undefined;
}

export function UserNav({ email, name, userImage } : iAppProps) {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={userImage} alt="user profile"/>
                        <AvatarFallback>
                            {name.slice(0, 3)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            {/**dropdown for the content */}
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>


                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup >
                    <DropdownMenuItem className="cursor-pointer">
                        Item 1
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        Item 2
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        Item 3
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        Item 4
                    </DropdownMenuItem >
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <LogoutLink className="cursor-pointer">
                        Log Out
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}