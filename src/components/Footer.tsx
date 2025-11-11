import { ScaleInfo } from '../types';
import './Footer.css';

interface FooterProps {
  scaleInfo: ScaleInfo;
}

const SCALE_MODE_LABELS: Record<string, string> = {
  major: '自然大调音阶',
  pentatonic: '五声音阶',
};

export default function Footer({ scaleInfo }: FooterProps) {
  const { key, mode, notes } = scaleInfo;
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="legend">
          <span className="legend-title">图例:</span>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color interval-root"></div>
              <span>Root (根音)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color interval-3rd"></div>
              <span>3rd (三度)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color interval-5th"></div>
              <span>5th (五度)</span>
            </div>
          </div>
        </div>
        
        <div className="scale-info">
          <div className="scale-info-item">
            <span className="scale-info-label">当前音阶:</span>
            <span className="scale-info-value">{key} {SCALE_MODE_LABELS[mode]}</span>
          </div>
          <div className="scale-info-item">
            <span className="scale-info-label">音阶构成:</span>
            <span className="scale-info-value">{notes.join(' - ')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

