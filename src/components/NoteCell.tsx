import { NoteCellData } from '../types';
import './NoteCell.css';

interface NoteCellProps {
  data: NoteCellData;
}

export default function NoteCell({ data }: NoteCellProps) {
  const { note, intervalType, isInScale } = data;
  
  const getClassName = () => {
    const classes = ['note-cell'];
    
    if (isInScale && intervalType) {
      classes.push(`interval-${intervalType}`);
    } else {
      classes.push('note-normal');
    }
    
    return classes.join(' ');
  };
  
  return (
    <div className={getClassName()}>
      <span className="note-label">{note}</span>
    </div>
  );
}

