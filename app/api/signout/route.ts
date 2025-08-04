import createConnection from "@/lib/dbConnection";
import { Token } from "@/model/UserTokens";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest) {
 try {
    const {userId} = await req.json();
    await createConnection();
    await Token.deleteOne({userId: new Types.ObjectId(userId)});
    return NextResponse.json({
        message:'Token deleted',
        status: true
      })
 } catch (error:any) {
    return NextResponse.json({
        message:error?.message,
        status: false
      })
 }
}