import React, { ReactNode, useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
import { useClickOutside } from '../hooks/use-click-outside';

import s from './bottom-sheet.module.css';

type BottomSheetChildProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

type BottomSheetProps = {
  children?: ReactNode | ((props: BottomSheetChildProps) => ReactNode);
  rootClassName?: string;
  wrapperClassName?: string;
  lineClassName?: string;
  contentClassName?: string;
  compactHeight?: string;
  fullHeight?: string;
  onClickOutside?: () => void;
  closeOnClickOutside?: boolean;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  rootClassName,
  wrapperClassName,
  lineClassName,
  contentClassName,
  compactHeight = 'auto',
  fullHeight = '90vh',
  onClickOutside,
  closeOnClickOutside = true,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string>(compactHeight);
  const [isOpen, setOpen] = useState<boolean>(false);
  const y = useMotionValue(0);

  useEffect(() => {
    setHeight(isOpen ? fullHeight : compactHeight);
  }, [isOpen, setHeight, compactHeight]);

  useClickOutside([componentRef], () => {
    onClickOutside?.();

    if (closeOnClickOutside) {
      setOpen(false);
    }
  });

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setHeight(info.offset.y < 0 ? fullHeight : compactHeight);
    setOpen(info.offset.y < 0);
  };

  if (!children) return null;

  const Children =
    typeof children === 'function'
      ? children({ isOpen, setOpen })
      : React.Children.only(children as React.ReactElement);

  return (
    <motion.div
      drag="y"
      className={cx(s.root, rootClassName)}
      style={{
        height: height,
        y,
      }}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      ref={componentRef}
    >
      <div className={cx(s.wrapper, wrapperClassName)}>
        <div className={s.line}>
          <div className={cx(s.innerLine, lineClassName)}></div>
        </div>
        <div className={cx(s.content, contentClassName)}>{Children}</div>
      </div>
    </motion.div>
  );
};

export default BottomSheet;
