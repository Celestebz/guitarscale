// 调性类型
export type Key = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

// 音阶模式类型
export type ScaleMode = 'major' | 'pentatonic';

// 显示范围类型
export type DisplayRange = '12' | '24';

// 音程类型
export type IntervalType = 'root' | '3rd' | '5th' | null;

// 音符类型
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

// 指板位置
export interface FretboardPosition {
  string: number; // 弦号 (0-5, 0是最细的弦E)
  fret: number;   // 品号 (0-24)
}

// 音符单元格数据
export interface NoteCellData {
  position: FretboardPosition;
  note: Note;
  intervalType: IntervalType;
  isInScale: boolean;
}

// 音阶信息
export interface ScaleInfo {
  key: Key;
  mode: ScaleMode;
  notes: Note[];
  intervals: {
    root: Note;
    third: Note;
    fifth: Note;
  };
}

