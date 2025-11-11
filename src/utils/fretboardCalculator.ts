import { Note, FretboardPosition, NoteCellData, ScaleInfo } from '../types';
import { getNoteByInterval } from './noteMapper';
import { calculateInterval, isNoteInScale } from './intervalCalculator';

/**
 * 指板计算器
 * 计算指板上每个位置的音符和音程信息
 */

// 6根弦的开放音（从最细的弦到最粗的弦）
const OPEN_STRINGS: Note[] = ['E', 'B', 'G', 'D', 'A', 'E'];

const NUM_STRINGS = 6;
const NUM_FRETS = 24;

/**
 * 计算指板上某个位置的音名
 */
export function calculateNoteAtPosition(position: FretboardPosition): Note {
  const openNote = OPEN_STRINGS[position.string];
  return getNoteByInterval(openNote, position.fret);
}

/**
 * 生成整个指板的数据
 */
export function generateFretboardData(scaleInfo: ScaleInfo): NoteCellData[] {
  const data: NoteCellData[] = [];
  
  for (let string = 0; string < NUM_STRINGS; string++) {
    for (let fret = 0; fret <= NUM_FRETS; fret++) {
      const position: FretboardPosition = { string, fret };
      const note = calculateNoteAtPosition(position);
      const isInScale = isNoteInScale(note, scaleInfo);
      const intervalType = isInScale ? calculateInterval(note, scaleInfo) : null;
      
      data.push({
        position,
        note,
        intervalType,
        isInScale,
      });
    }
  }
  
  return data;
}

/**
 * 获取指板配置
 */
export function getFretboardConfig() {
  return {
    numStrings: NUM_STRINGS,
    numFrets: NUM_FRETS,
    openStrings: OPEN_STRINGS,
  };
}

