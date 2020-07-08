export const enum MoverType {
  File
}

export interface IMoverHeader {
  type: MoverType;
}

export interface IFile {
  src: string;
  dst: string;
}

export type IFiles = IFile[];

export type IFileMover = {
  files: IFiles;
} & IMoverHeader;
