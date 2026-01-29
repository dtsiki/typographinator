import { ECopyStatus, EEntityType, TFormattingParams } from '../types';

export const EXAMPLE_TEXT =
  'Кто-то пробегал здесь и оставил здесь кое-что интересное';

export const DEFAULT_TEXT = `Жили-были дед да баба, была у них курочка Ряба.
Снесла курочка яичко, но яичко не простое, а золотое.
Дед бил, бил - не разбил.
Баба била, била - не разбила.
Мышка бежала, хвостиком махнула, яичко упало и разбилось.`;

export const NON_BREAKING_HYPHEN = {
  [EEntityType.HTML]: '&#x2011;',
  [EEntityType.UNICODE]: '\\u2011',
};

export const NON_BREAKING_SPACE = {
  [EEntityType.HTML]: '&nbsp;',
  [EEntityType.UNICODE]: '\\u00A0',
};

export const DEFAULT_FORMATTING_PARAMS: TFormattingParams = {
  useBreakingSpaces: true,
  useBreakingHyphens: true,
  entityType: EEntityType.UNICODE,
};

export const DEFAULT_PREPOSITIONS = [
  'в',
  'с',
  'к',
  'у',
  'о',
  'об',
  'и',
  'на',
  'над',
  'за',
  'по',
  'под',
  'из',
  'от',
  'до',
  'для',
  'без',
  'при',
  'про',
];

export const DEFAULT_PARTICLES = ['не', 'же', 'ли', 'бы', 'ни'];

export const DEFAULT_CONJUNCTION = ['а', 'но', 'или', 'то'];

export const COPY_STATUS_TEXT: Record<ECopyStatus, string> = {
  [ECopyStatus.IDLE]: 'Копировать',
  [ECopyStatus.COPIED]: 'Скопировано',
  [ECopyStatus.ERROR]: 'Ошибка',
};
