import { useState, useMemo } from 'react';
import { Key, ScaleMode, DisplayRange } from './types';
import { calculateScaleInfo } from './utils/scaleCalculator';
import Header from './components/Header';
import Fretboard from './components/Fretboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentKey, setCurrentKey] = useState<Key>('C');
  const [currentScaleMode, setCurrentScaleMode] = useState<ScaleMode>('major');
  const [displayRange, setDisplayRange] = useState<DisplayRange>('12');
  
  // 计算当前音阶信息
  const scaleInfo = useMemo(
    () => calculateScaleInfo(currentKey, currentScaleMode),
    [currentKey, currentScaleMode]
  );
  
  return (
    <div className="app">
      <Header
        currentKey={currentKey}
        currentScaleMode={currentScaleMode}
        displayRange={displayRange}
        onKeyChange={setCurrentKey}
        onScaleModeChange={setCurrentScaleMode}
        onDisplayRangeChange={setDisplayRange}
      />
      <Fretboard
        currentKey={currentKey}
        currentScaleMode={currentScaleMode}
        displayRange={displayRange}
      />
      <Footer scaleInfo={scaleInfo} />
    </div>
  );
}

export default App;

