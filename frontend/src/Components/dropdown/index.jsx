import React, { useState, useEffect, useRef } from "react";

import "./dropdown.css";

export default function Dropdown({
  prompt = "Select one",
  value,
  onChange,
  options,
  label,
  getData,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ddRef = useRef(null);

  useEffect(() => {
    addClickHandlers();
    return () => removeClickHandlers();
  }, []);

  function filter(options) {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  function addClickHandlers() {
    ["click", "touchend"].map((e) => document.addEventListener(e, toggle, false));
  }

  function removeClickHandlers() {
    ["click", "touchend"].map((e) => document.addEventListener(e, toggle, false));
  }

  function toggle(e) {
    setOpen(e && e.target === ddRef.current);
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (value) return value[label];
  }

  return (
    <div style={{ width: "auto" }}>
      <div className="dropdown">
        <div className="control">
          <div className="selected-value">
            <input
              className="input"
              type="text"
              placeholder={value ? value[label] : prompt}
              ref={ddRef}
              onClick={toggle}
              value={displayValue()}
              onChange={(e) => {
                onChange(null);
                getData(e.target.value);
                setQuery(e.target.value);
              }}
            />
          </div>
          <div className={`arrow ${open ? "open" : ""}`} />
        </div>
        <div className={`options ${open ? "open" : ""}`}>
          {filter(options).map((option, key) => (
            <div
              key={key}
              className={`option ${value === option ? "selected" : ""}`}
              onClick={() => {
                setQuery("");
                onChange(option);
                toggle();
              }}
            >
              {option[label]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
