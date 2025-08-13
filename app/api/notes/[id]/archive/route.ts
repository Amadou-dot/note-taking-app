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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { 
        isArchived: true,
        last_updated: new Date()
      },
      { new: true }
    ).lean();

    if (!updatedNote) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ note: convertToNote(updatedNote) });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error archiving note:', error);

    return NextResponse.json(
      { error: 'Failed to archive note' },
      { status: 500 }
    );
  }
}
