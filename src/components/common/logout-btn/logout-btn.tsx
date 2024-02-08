import React, {FC} from 'react';
import styles from './logout-btn.module.css';

interface Props {
  onClick: () => void;
}

const LogoutBtn:FC<Props> = ({onClick}) => (

  <button className={styles.btn}
    onClick={onClick}
  >
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#eee5b5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1={21} y1={12} x2={9} y2={12} />
    </svg>
  </button>
);

export default LogoutBtn;
