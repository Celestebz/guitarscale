import { Note } from '../types';

/**
 * 音名映射器
 * 处理音名的转换和计算
 */

// 所有12个半音
const ALL_NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * 获取音名的半音索引 (0-11)
 */
export function getNoteIndex(note: Note): number {
  return ALL_NOTES.indexOf(note);
}

/**
 * 根据半音索引获取音名
 */
export function getNoteByIndex(index: number): Note {
  // 处理负数索引（向后查找）
  const normalizedIndex = ((index % 12) + 12) % 12;
  return ALL_NOTES[normalizedIndex];
}

/**
 * 从根音开始，向上移动指定半音数，获取目标音名
 */
export function getNoteByInterval(rootNote: Note, semitones: number): Note {
  const rootIndex = getNoteIndex(rootNote);
  const targetIndex = (rootIndex + semitones) % 12;
  return getNoteByIndex(targetIndex);
}

/**
 * 计算两个音之间的半音数
 */
export function getIntervalSemitones(from: Note, to: Note): number {
  const fromIndex = getNoteIndex(from);
  const toIndex = getNoteIndex(to);
  return (toIndex - fromIndex + 12) % 12;
}

