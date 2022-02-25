export interface ILink {
  count: number;
  created_at: number;
  download_count: number;
  expires_at: number;
  files: IFile[];
  key: string;
  sent?: ISent;
  size: number;
  summary: string;
  thumbnailUrl: string;
}

export interface IFile {
  key: string;
  thumbnailUrl: string;
  name: string;
  size: number;
}

export interface ISent {
  subject: string;
  content: string;
  emails: string[];
}
