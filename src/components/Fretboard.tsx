import { useMemo } from 'react';
import { Key, ScaleMode, DisplayRange, NoteCellData } from '../types';
import { calculateScaleInfo } from '../utils/scaleCalculator';
import { generateFretboardData } from '../utils/fretboardCalculator';
import { getFretboardConfig } from '../utils/fretboardCalculator';
import NoteCell from './NoteCell';
import './Fretboard.css';

interface FretboardProps {
  currentKey: Key;
  currentScaleMode: ScaleMode;
  displayRange: DisplayRange;
}

export default function Fretboard({
  currentKey,
  currentScaleMode,
  displayRange,
}: FretboardProps) {
  const { openStrings } = getFretboardConfig();
  
  // 计算音阶信息和指板数据
  const scaleInfo = useMemo(
    () => calculateScaleInfo(currentKey, currentScaleMode),
    [currentKey, currentScaleMode]
  );
  
  const fretboardData = useMemo(
    () => generateFretboardData(scaleInfo),
    [scaleInfo]
  );
  
  const maxFret = displayRange === '12' ? 12 : 24;
  const numFrets = maxFret; // 不包含第0品，从第1品开始
  
  // 根据显示范围过滤数据，排除第0品（空弦音），并且只显示音阶中的音符
  const filteredData = useMemo(() => {
    return fretboardData.filter((data) => 
      data.position.fret > 0 && 
      data.position.fret <= maxFret &&
      data.isInScale // 只显示音阶中的音符
    );
  }, [fretboardData, maxFret]);
  
  // 按弦分组数据，并为每个品位创建位置槽
  const dataByString = useMemo(() => {
    const grouped: (NoteCellData | null)[][] = [];
    for (let string = 0; string < 6; string++) {
      // 为每个品位创建位置槽（从第1品到maxFret）
      const stringSlots: (NoteCellData | null)[] = [];
      for (let fret = 1; fret <= maxFret; fret++) {
        // 查找对应品位的数据
        const cellData = filteredData.find(
          (data) => data.position.string === string && data.position.fret === fret
        );
        stringSlots.push(cellData || null);
      }
      grouped.push(stringSlots);
    }
    return grouped;
  }, [filteredData, maxFret]);

  return (
    <div className={`fretboard-container ${displayRange === '12' ? 'fretboard-12-container' : ''}`}>
      <div className={`fretboard ${displayRange === '24' ? 'fretboard-24' : 'fretboard-12'}`}>
        {/* 指板内容区域 */}
        <div className="fretboard-content">
          {/* 弦标签区域（0品位置，不在指板背景上） */}
          <div className="open-strings-area">
            {openStrings.map((note, index) => (
              <div key={index} className="open-string-label">
                {note}
              </div>
            ))}
          </div>
          
          {/* 指板背景 */}
          <div className="fretboard-background">
          {/* 左侧品柱（0品位置，较粗） */}
          <div className="fret-post-left"></div>
          
          {/* 品位标记（第3、5、7、9、12品，24品模式还包括15、17、19、21品） */}
          <div className="fret-markers">
            {(() => {
              // 根据显示范围确定需要显示的标记
              const markers = displayRange === '24' 
                ? [3, 5, 7, 9, 12, 15, 17, 19, 21]
                : [3, 5, 7, 9, 12];
              
              return markers.filter(fret => fret <= maxFret).map((fret) => {
                // 计算标记位置：位于品位的中心
                // 使用与品丝相同的计算方法
                const firstSlotWidth = 50; // 第一品宽度
                const slotWidth = 35; // 其他品宽度
                const gapWidth = 12;
                const rowMarginLeft = 3; // fret-row的margin-left
                
                // 计算该品位的中心位置
                let markerPosition: number;
                if (fret === 1) {
                  // 第一品中心：margin-left + 第一品宽度的一半
                  markerPosition = rowMarginLeft + firstSlotWidth / 2;
                } else {
                  // 其他品中心：margin-left + 第一品 + gap + (fret-2)个(品+gap) + 当前品宽度的一半
                  const slotStart = rowMarginLeft + firstSlotWidth + gapWidth + (fret - 2) * (slotWidth + gapWidth);
                  markerPosition = slotStart + slotWidth / 2;
                }
                
                return (
                  <div
                    key={fret}
                    className={fret === 12 ? 'fret-marker double' : 'fret-marker'}
                    style={{ left: `${markerPosition}px` }}
                  ></div>
                );
              });
            })()}
          </div>
          
          {/* 品丝线条 */}
          <div className="fret-lines">
            {Array.from({ length: numFrets }, (_, i) => {
              // 品丝位于每个品位的右边缘（品之间）
              // fret-row使用flex布局，gap: 12px
              // 第一品宽度50px，其他品35px
              const firstSlotWidth = 50; // 第一品宽度
              const slotWidth = 35; // 其他品宽度
              const gapWidth = 12;
              
              // 计算每个品的右边缘位置（相对于fret-row的起始位置）
              // 第一品：从0开始，宽度50px，右边缘在50px
              // gap：12px
              // 第二品：从62px开始，宽度35px，右边缘在97px
              // gap：12px
              // 第三品：从109px开始，宽度35px，右边缘在144px
              const fretPosition = i === 0 
                ? firstSlotWidth 
                : firstSlotWidth + gapWidth + (i - 1) * (slotWidth + gapWidth) + slotWidth;
              
              // 总宽度 = 第一品 + (其他品数量) * (品宽度 + gap)
              // const totalContentWidth = firstSlotWidth + (numFrets - 1) * slotWidth + (numFrets - 1) * gapWidth;
              
              // 使用像素值定位，而不是百分比，确保精确对齐
              return (
                <div 
                  key={i} 
                  className="fret-line" 
                  style={{ left: `${fretPosition}px` }}
                ></div>
              );
            })}
          </div>
          
          {/* 琴弦 */}
          <div className="guitar-strings">
            {openStrings.map((_, index) => {
              // 琴弦位于每根弦的中心位置
              const stringPosition = ((index + 0.5) * 100) / 6;
              return (
                <div 
                  key={index} 
                  className="guitar-string" 
                  style={{ top: `${stringPosition}%` }}
                ></div>
              );
            })}
          </div>
          
          {/* 音符单元格 */}
          <div className="notes-overlay">
            {dataByString.map((stringSlots, stringIndex) => {
              // 使用与琴弦相同的计算方式，确保对齐
              const stringPosition = ((stringIndex + 0.5) * 100) / 6;
              return (
                <div 
                  key={stringIndex} 
                  className="fretboard-string"
                  style={{ top: `${stringPosition}%` }}
                >
                  <div className="fret-row">
                    {stringSlots.map((cellData, fretIndex) => (
                      <div key={fretIndex} className="fret-slot">
                        {cellData && (
                          <NoteCell 
                            key={`${cellData.position.string}-${cellData.position.fret}`} 
                            data={cellData} 
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
        
        {/* 品位数字（显示在指板下方） */}
        <div className="fret-numbers-bottom">
          <div className="fret-number-spacer"></div>
          {Array.from({ length: numFrets }, (_, i) => (
            <div key={i + 1} className="fret-number">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

