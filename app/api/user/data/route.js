import connectDB from "@/config/db";
import { getAuth } from '@clerk/nextjs/server'
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        console.log("hgggggggg:",request)
        console.log("userId:",userId)
        const user = await User.findById(userId)
        await connectDB()
        console.log("hgggggggg::",user)
        if (!user) {
            return NextResponse.json({ success: false, message: "user not Found1" })
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "false user" })

    }
}