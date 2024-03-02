import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
    req : Request
) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {name} = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
          }
      
          if (!name) {
            return new NextResponse("Name is required", { status: 400 });
          }

          const store = await prismadb.store.create({
            data: {
              name,
              userId,
            }
          });
        
          return NextResponse.json(store);
    } catch (error) {
        console.log("[STORES_POST]" , error) ; 
        return new NextResponse("internal error " , {status : 500})
    }
}