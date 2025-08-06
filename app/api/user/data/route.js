import connectDB from "@/config/db";
import { getAuth } from '@clerk/nextjs/server'
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        console.log("userId:", userId)

        // ✅ Connect to DB first
        await connectDB()

        // ✅ Then query MongoDB
        const user = await User.findById(userId)
        console.log("User from DB:", user)

        if (!user) {
            return NextResponse.json({ success: false, message: "user not Found1" })
        }

        return NextResponse.json({ success: true, user })

    } catch (error) {
        console.error("❌ GET /api/user/data error:", error)
        return NextResponse.json({ success: false, message: "false user" })
    }
}










// import connectDB from "@/config/db";
// import { getAuth } from '@clerk/nextjs/server'
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//     try {
//         const { userId } = getAuth(request)
//         console.log("hgggggggg:",request)
//         console.log("userId:",userId)
//         await connectDB()
//         const user = await User.findById(userId)
//         console.log("hgggggggg::",user)
//         if (!user) {
//             return NextResponse.json({ success: false, message: "user not Found1" })
//         }
//     } catch (error) {
//         return NextResponse.json({ success: false, message: "false user" })

//     }
// }