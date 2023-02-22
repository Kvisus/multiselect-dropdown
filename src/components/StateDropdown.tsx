import { useEffect, useRef, useState } from "react";
import "./StateDropdown.css";
import { states } from "./states";

export const StateDropdown = () => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>(
    states.reduce((obj, state) => ({ ...obj, [state.abbreviation]: false }), {})
  );
  // console.log(selectedStates);

  const numberOfSelectedStates =
    Object.values(selectedStates).filter(Boolean).length;

  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClick = (e: any) => {
      if (e.target !== dropdownRef.current) {
        setIsDropdownDisplayed(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <fieldset className="state-dropdown">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownDisplayed((prevState) => !prevState);
        }}
      >
        {numberOfSelectedStates > 0
          ? `${numberOfSelectedStates} selected`
          : "Select your States"}
      </button>
      {isDropdownDisplayed && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="panel"
          ref={dropdownRef}
        >
          {states.map((state) => (
            <fieldset
              key={state.abbreviation}
              className={selectedStates[state.abbreviation] ? `selected` : ""}
            >
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedStates({
                    ...selectedStates,
                    [state.abbreviation]: e.target.checked,
                  })
                }
                checked={selectedStates[state.abbreviation]}
                name=""
                id={`input-${state.abbreviation}`}
              />
              <label htmlFor={`input-${state.abbreviation}`}>
                {state.name}
              </label>
            </fieldset>
          ))}
        </div>
      )}
    </fieldset>
  );
};
