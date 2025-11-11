import { Key, ScaleMode, Note, ScaleInfo } from '../types';
import { getNoteByInterval } from './noteMapper';

/**
 * 音阶计算器
 * 根据调性和音阶模式计算音阶
 */

// 音阶模式的音程间隔（半音数）
const SCALE_INTERVALS: Record<ScaleMode, number[]> = {
  major: [2, 2, 1, 2, 2, 2, 1],        // 自然大调：全全半全全全半
  pentatonic: [2, 2, 3, 2, 3],         // 五声音阶：全全小三全
};

/**
 * 计算指定调性和音阶模式的音阶音符列表
 */
export function calculateScaleNotes(key: Key, mode: ScaleMode): Note[] {
  const intervals = SCALE_INTERVALS[mode];
  const notes: Note[] = [key]; // 根音
  
  let currentSemitones = 0;
  for (const interval of intervals) {
    currentSemitones += interval;
    notes.push(getNoteByInterval(key, currentSemitones));
  }
  
  return notes;
}

/**
 * 计算音阶信息（包含音程信息）
 */
export function calculateScaleInfo(key: Key, mode: ScaleMode): ScaleInfo {
  const notes = calculateScaleNotes(key, mode);
  
  // 根据音阶模式确定3rd和5th的位置
  let thirdIndex: number;
  let fifthIndex: number;
  
  if (mode === 'major') {
    // 自然大调：1-2-3-4-5-6-7
    thirdIndex = 2;  // 第3个音（索引2）
    fifthIndex = 4;  // 第5个音（索引4）
  } else {
    // 五声音阶：1-2-3-5-6
    thirdIndex = 2;  // 第3个音（索引2）
    fifthIndex = 3;  // 第5个音（索引3，因为跳过了4）
  }
  
  return {
    key,
    mode,
    notes,
    intervals: {
      root: notes[0],
      third: notes[thirdIndex],
      fifth: notes[fifthIndex],
    },
  };
}

