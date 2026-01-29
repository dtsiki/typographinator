export enum EEntityType {
  UNICODE = 'UNICODE',
  HTML = 'HTML',
}

export type TFormattingParams = {
  useBreakingSpaces: boolean;
  useBreakingHyphens: boolean;
  entityType: EEntityType;
};

export const enum ECopyStatus {
  IDLE = 'IDLE',
  COPIED = 'COPIED',
  ERROR = 'ERROR',
}
