'use client';

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showClose?: boolean;
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-full mx-4',
};

function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const handleTransitionEnd = () => {
    if (!open) setVisible(false);
  };

  if (!open && !visible) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className={[
        'fixed inset-0 z-50 flex items-end sm:items-center justify-center',
        'transition-colors duration-200',
        open ? 'bg-black/50' : 'bg-black/0',
      ].join(' ')}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={[
          'bg-white w-full rounded-t-2xl sm:rounded-2xl shadow-xl',
          'transition-transform duration-300 ease-out',
          'max-h-[90vh] flex flex-col',
          sizeStyles[size],
          open
            ? 'translate-y-0 sm:scale-100'
            : 'translate-y-full sm:translate-y-0 sm:scale-95',
        ].join(' ')}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 cursor-pointer ml-auto"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((v) => !v), []);
  return { open, onOpen, onClose, onToggle };
}

export { Modal, useModal };
export type { ModalProps };
