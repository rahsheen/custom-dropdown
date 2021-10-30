import "./App.css";
import { useRef, useState, useEffect, CSSProperties } from "react";

type Option = { label: string; value: string };

type DropdownProps = {
  placeHolder: string;
  onChange: (o: Option) => void;
  options: Option[];
  style: CSSProperties;
};

function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>();

  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const listener = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("cliick", listener);
  }, []);

  const handleItemClick = (option: Option) => () => {
    if (option) {
      setSelected(option);
      props.onChange(option);
    }
  };

  return (
    <div ref={dropdownRef} style={props.style}>
      <button onClick={(_) => setOpen((p) => !p)}>
        {selected ? selected.label : props.placeHolder}
      </button>
      {open && (
        <ul>
          {props.options.map((option) => {
            if (selected?.label === option.label) return null;

            return (
              <li
                key={option.label + option.value}
                onClick={handleItemClick(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function App() {
  const options = [
    { label: "1d", value: "1d" },
    { label: "1w", value: "1d" },
    { label: "23", value: "1d" },
    { label: "Foo", value: "1d" },
  ];

  const onChange = (option: Option) => {
    console.log("Parent", option);
  };

  return (
    <div className="App">
      <Dropdown
        options={options}
        onChange={onChange}
        placeHolder="Select"
        style={{ width: "20%" }}
      />
    </div>
  );
}

export default App;
