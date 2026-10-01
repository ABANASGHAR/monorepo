import mongoose, { Document, Schema } from 'mongoose';

export type ItemPriority = 'low' | 'medium' | 'high';

export interface IItem extends Document {
  title: string;
  description?: string;
  completed: boolean;
  priority: ItemPriority;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema<IItem> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Item = mongoose.model<IItem>('Item', ItemSchema);
