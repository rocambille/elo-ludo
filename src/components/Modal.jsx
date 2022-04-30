import React, { createContext, useContext, useEffect, useState } from 'react';
import { node } from 'prop-types';

const ModalContext = createContext();

const useOpen = () => {
  const [isOpen, setOpen] = useState(false);

  return [isOpen, () => setOpen(true), () => setOpen(false)];
};

function Modal({ children }) {
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
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: node.isRequired,
};

function Trigger({ children }) {
  const { open } = useContext(ModalContext);

  return React.cloneElement(children, { onClick: open });
}

Trigger.propTypes = {
  children: node.isRequired,
};

Modal.Trigger = Trigger;

function Content({ children }) {
  const { isOpen, close } = useContext(ModalContext);

  return (
    isOpen && (
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
    )
  );
}

Content.propTypes = {
  children: node.isRequired,
};

Modal.Content = Content;

export default Modal;
