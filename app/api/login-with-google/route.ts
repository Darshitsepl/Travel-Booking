import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest) {
 try {

    const session = await getServerSession(authOptions)
      console.log('Received POST data:', session);

      return NextResponse.json({
        message: "test",
        data: session
      })
 } catch (error) {
    return NextResponse.json({
        message:'test'
      })
 }
}