import {
  DEFAULT_CONJUNCTION,
  DEFAULT_PREPOSITIONS,
  DEFAULT_PARTICLES,
  NON_BREAKING_SPACE,
  NON_BREAKING_HYPHEN,
} from '../const';
import { EEntityType } from '../types';

export const addNonBreakingHyphens = (
  text: string,
  entityType: EEntityType,
): string => {
  return text.replace(
    /([a-zA-Zа-яА-ЯёЁ])-([a-zA-Zа-яА-ЯёЁ])/g,
    `$1${NON_BREAKING_HYPHEN[entityType]}$2`,
  );
};

export const addNonBreakingSpaces = (
  text: string,
  entityType: EEntityType,
): string => {
  const nonBreakingWords = [
    ...DEFAULT_PREPOSITIONS,
    ...DEFAULT_CONJUNCTION,
    ...DEFAULT_PARTICLES,
  ];

  const regex = new RegExp(`(^|\\s)(${nonBreakingWords.join('|')})(\\s)`, 'gi');

  return text.replace(regex, (_, p1, p2, __) => {
    return `${p1}${p2}${NON_BREAKING_SPACE[entityType]}`;
  });
};
