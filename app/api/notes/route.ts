import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/config/mongodb';
import NoteModel from '@/models/Note';

// Helper function to convert Mongoose document to Note interface
const convertToNote = (doc: any) => ({
  _id: doc._id.toString(),
  title: doc.title,
  body: doc.body,
  tags: doc.tags,
  isArchived: doc.isArchived,
  created_at: doc.created_at.toISOString(),
  last_updated: doc.last_updated.toISOString()
});

export async function GET() {
  try {
    await connectDB();
    const notes = await NoteModel.find({}).sort({ last_updated: -1 }).lean();

    const convertedNotes = notes.map(convertToNote);

    return NextResponse.json({ notes: convertedNotes }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching notes:', error);

    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newNote = new NoteModel({
      title: body.title || 'Untitled',
      body: body.body || '',
      tags: body.tags || null,
      isArchived: body.isArchived || false,
    });

    const savedNote = await newNote.save();

    return NextResponse.json({ note: convertToNote(savedNote.toObject()) }, { status: 201 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating note:', error);

    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
