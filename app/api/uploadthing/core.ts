import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


export const ourFileRouter = {

    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
        
        .middleware(async ({ req }) => {
            const { getUser } = getKindeServerSession();
            const user = await getUser();
        
    
        if (!user) throw new UploadThingError("Unauthorized");
    
        return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);
    
        console.log("file url", file.url);
    
        return { uploadedBy: metadata.userId };
    }),


    productFileUpload: f({ "application/zip": { maxFileCount: 1 }})
        
        .middleware(async ({ req }) => {
            const { getUser } = getKindeServerSession();
            const user = await getUser();
        
    
        if (!user) throw new UploadThingError("Unauthorized");
    
        return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);
    
        console.log("file url", file.url);
    
        return { uploadedBy: metadata.userId };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;