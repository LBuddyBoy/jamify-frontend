import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./style/popMenu.css";

export default function PopMenu({ open, onClose, children, id = "" }) {
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, onClose]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose} id={id}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          className="popup-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
