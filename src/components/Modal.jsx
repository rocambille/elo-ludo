import { useRef } from 'react';
import { node, string } from 'prop-types';

function Modal({ children }) {
  const details = useRef();

  return (
    <details
      className="modal group"
      ref={details}
      onToggle={(event) => {
        const keyDownListener = ({ key }) => {
          if (key === 'Escape') {
            details.current.open = false;
          }
        };

        if (event.target.open) {
          window.addEventListener('keydown', keyDownListener);
        } else {
          window.removeEventListener('keydown', keyDownListener);
        }
      }}
    >
      {children}
    </details>
  );
}

Modal.propTypes = {
  children: node.isRequired,
};

function Trigger({ children, className }) {
  return <summary className={`modal-trigger ${className}`}>{children}</summary>;
}

Trigger.propTypes = {
  children: node.isRequired,
  className: string,
};

Trigger.defaultProps = {
  className: null,
};

Modal.Trigger = Trigger;

function Content({ children }) {
  return <div className="modal-content">{children}</div>;
}

Content.propTypes = {
  children: node.isRequired,
};

Modal.Content = Content;

export default Modal;
