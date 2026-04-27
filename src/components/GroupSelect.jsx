import { useState, useRef, useEffect } from "react";
import "./groupSelect.css"
const groups = ["123-КІ-2", "172-ЕКР-3", "125-КБ-4"];

export default function GroupSelect({ group, setGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <div
        className={`dropdown__control ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {group || "Оберіть групу"}
        <span className="dropdown__arrow">▾</span>
      </div>

      {open && (
        <div className="dropdown__menu">
          {groups.map((g) => (
            <div
              key={g}
              className={`dropdown__item ${
                group === g ? "active" : ""
              }`}
              onClick={() => {
                setGroup(g);
                setOpen(false);
              }}
            >
              {g}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}