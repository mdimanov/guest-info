import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic validation
    const requiredFields = ["fullName", "birthDate", "sex", "apartment"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Use Admin SDK to write to Firestore
    const docRef = await db.collection("guests").add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, ...data });
  } catch (err) {
    console.error("Firestore Admin Error:", err);
    return NextResponse.json(
      { error: "Failed to save guest" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const snapshot = await db
      .collection("guests")
      .orderBy("createdAt", "desc")
      .get(); // Admin SDK uses .get() on the query

    const guests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(guests);
  } catch (err) {
    console.error("Firestore Admin Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}
