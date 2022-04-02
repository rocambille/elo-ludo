import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';

const useOpen = () => {
  const [isOpen, setOpen] = useState(false);

  return [isOpen, () => setOpen(true), () => setOpen(false)];
};

function Modal({ opener, children }) {
  const [isOpen, open, close] = useOpen();

  useEffect(() => {
    const keyDownListener = ({ key }) => {
      if (key === 'Escape') {
        close();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', keyDownListener);

      return () => {
        window.removeEventListener('keydown', keyDownListener);
      };
    }
  }, [close, isOpen]);

  return (
    <>
      {React.cloneElement(opener, { onClick: open })}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 grid"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
            gridTemplateRows: '1fr auto 1fr',
          }}>
          <button
            className="col-start-3 justify-self-start self-end"
            type="button"
            onClick={close}>
            x
          </button>
          <div className="col-start-2 row-start-2">{children}</div>
        </div>
      )}
    </>
  );
}

Modal.propTypes = {
  opener: node.isRequired,
  children: node.isRequired,
};

export default Modal;
