import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  _id: string;
  title: string;
  body: string;
  tags: string[] | null;
  isArchived: boolean;
  created_at: Date;
  last_updated: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Untitled',
    },
    body: {
      type: String,
      required: true,
      default: '',
    },
    tags: {
      type: [String],
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' },
  }
);

export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
