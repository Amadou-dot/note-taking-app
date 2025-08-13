import { NextResponse } from 'next/server';

import { connectDB } from '@/config/mongodb';
import NoteModel from '@/models/Note';

export async function GET() {
  try {
    await connectDB();
    const notes = await NoteModel.find({ tags: { $ne: null } }, 'tags').lean();
    
    const tagsArr = notes
      .filter((note) => note.tags !== null && note.tags.length > 0)
      .flatMap((note) => note.tags as string[]);

    // Return unique tags
    const uniqueTags = Array.from(new Set(tagsArr));

    return NextResponse.json({ tags: uniqueTags });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching tags:', error);

    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
