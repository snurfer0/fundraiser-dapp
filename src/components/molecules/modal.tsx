import React, { forwardRef } from 'react';

interface Props {
  id: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  ref?: React.RefObject<HTMLDialogElement>;
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ id, title, description, children, actions, onClose }, ref) => {
    return (
      <dialog id={id} className="modal" ref={ref} onClose={onClose}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
          {description && <div className="py-4">{description}</div>}
          <div>{children}</div>
          <div className="modal-action">{actions}</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  },
);

export default Modal;
