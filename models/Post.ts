import { IUser } from './User';
import { Schema, Document, model } from 'mongoose';

export interface IPost extends Document {
  user: IUser;
  title: string;
  description: string;
  type: string;
  server: string;
  roles: string[];
  focus: string;
  aim: string;
}

const PostSchema = new Schema<IPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please enter a title']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description']
  },
  server: {
    type: String,
    required: [true, 'Please enter your server']
  },
  roles: {
    type: [String],
    required: [true, 'Please enter your roles']
  },
  type: {
    type: String,
    enum: [
      '[FC] - Free Company',
      '[Static] - A static group of eight players',
      '[LS] - Linkshell',
      '[CWLS] - Cross-world Linkshell',
      '[Discord] - A Discord server',
      '[Guilded] - A Guilded server'
    ]
  },
  focus: {
    type: String,
    enum: [
      '[HC] - Hard-core',
      '[sHC] - Semi Hard-core',
      '[MC] - Medium-core',
      '[sMC] - Semi Medium-core',
      '[C] - Casual',
      '[sC] - Semi-casual',
      '[Prog] - Progression',
      '[W1-Prog] - Week 1 Progression'
    ]
  },
  aim: {
    type: String,
    enum: [
      '[LFM] - Looking For More',
      '[LFG] - Looking For Group',
      '[PLF] - Player Looking For'
    ]
  }
});

export default model<IPost>('Post', PostSchema);
