import { Note, IntervalType, ScaleInfo } from '../types';

/**
 * 音程计算器
 * 判断指板上的某个音在当前音阶中的音程类型
 */
export function calculateInterval(note: Note, scaleInfo: ScaleInfo): IntervalType {
  const { intervals } = scaleInfo;
  
  if (note === intervals.root) {
    return 'root';
  }
  
  if (note === intervals.third) {
    return '3rd';
  }
  
  if (note === intervals.fifth) {
    return '5th';
  }
  
  return null;
}

/**
 * 判断音是否属于当前音阶
 */
export function isNoteInScale(note: Note, scaleInfo: ScaleInfo): boolean {
  return scaleInfo.notes.includes(note);
}

