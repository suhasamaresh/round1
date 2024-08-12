
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer } = body;
    const newflashcard = await prisma.flashcard.create({
      data: { question, answer },
    });
    return NextResponse.json({
      flashcard: "Flashcard created successfully",
      newflashcard,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const flashcards = await prisma.flashcard.findMany();
    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;
        const deletedFlashcard = await prisma.flashcard.delete({
        where: { id },
        });
        return NextResponse.json({
        flashcard: "Flashcard deleted successfully",
        deletedFlashcard,
        });
    } catch (error) {
        console.error("Error deleting flashcard:", error);
        return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
        );
    }
    }

    export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, question, answer } = body;
        const updatedFlashcard = await prisma.flashcard.update({
        where: { id },
        data: { question, answer },
        });
        return NextResponse.json({
        flashcard: "Flashcard updated successfully",
        updatedFlashcard,
        });
    } catch (error) {
        console.error("Error updating flashcard:", error);
        return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
        );
    }
    }
