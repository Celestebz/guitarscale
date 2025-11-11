import { Key, ScaleMode, DisplayRange } from '../types';
import './Header.css';

interface HeaderProps {
  currentKey: Key;
  currentScaleMode: ScaleMode;
  displayRange: DisplayRange;
  onKeyChange: (key: Key) => void;
  onScaleModeChange: (mode: ScaleMode) => void;
  onDisplayRangeChange: (range: DisplayRange) => void;
}

const KEYS: Key[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SCALE_MODES: { value: ScaleMode; label: string }[] = [
  { value: 'major', label: '自然大调音阶' },
  { value: 'pentatonic', label: '五声音阶' },
];
const DISPLAY_RANGES: { value: DisplayRange; label: string }[] = [
  { value: '12', label: '12品' },
  { value: '24', label: '24品' },
];

export default function Header({
  currentKey,
  currentScaleMode,
  displayRange,
  onKeyChange,
  onScaleModeChange,
  onDisplayRangeChange,
}: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">吉他音阶图查看器</h1>
      <div className="header-controls">
        <div className="control-group">
          <label htmlFor="key-select">调性:</label>
          <select
            id="key-select"
            className="control-select"
            value={currentKey}
            onChange={(e) => onKeyChange(e.target.value as Key)}
          >
            {KEYS.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="scale-mode-select">音阶模式:</label>
          <select
            id="scale-mode-select"
            className="control-select"
            value={currentScaleMode}
            onChange={(e) => onScaleModeChange(e.target.value as ScaleMode)}
          >
            {SCALE_MODES.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="display-range-select">显示范围:</label>
          <select
            id="display-range-select"
            className="control-select"
            value={displayRange}
            onChange={(e) => onDisplayRangeChange(e.target.value as DisplayRange)}
          >
            {DISPLAY_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

