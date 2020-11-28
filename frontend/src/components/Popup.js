import React, { useEffect } from 'react';

const Popup = ({
  name, isOpen, onClose, children,
}) => {
  const handleEsc = (e) => {
    if (e.key !== 'Escape') return;
    onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const className = `popup popup_theme_${name} ${isOpen && 'popup_opened'}`;

  return (
    <section className={className}>
      <div className={`popup__container popup_container_theme_${name}`}>
        <button type="button" className="button popup__close" onClick={onClose}>
        </button>
        {children}
      </div>
    </section>
  );
};

export default Popup;
