import "./App.css";
import { useState } from "react";

type Option = { label: string; value: string };

type DropdownProps = {
  placeHolder: string;
  onChange: (o: Option) => void;
  options: Option[];
};

function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>();

  //  useEffect(() => {
  //    const listener = (e) => {
  //      setOpen((prev) => !prev);
  //      console.log(e);
  //    };
  //
  //    document.addEventListener("click", listener);
  //
  //    return () => document.removeEventListener(listener);
  //  }, []);

  const handleClick = (option?: Option) => {
    setOpen((prev) => !prev);

    if (option) {
      setSelected(option);
      props.onChange(option);
    }
  };

  return (
    <>
      <button onClick={() => handleClick()}>
        {selected ? selected.label : props.placeHolder}
      </button>
      {open && (
        <ul>
          {props.options.map((option) => {
            // if (selected?.value === option.value) return null;

            return (
              <li
                key={option.label + option.value}
                onClick={() => handleClick(option)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </>
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
      <Dropdown options={options} onChange={onChange} placeHolder="Select" />
    </div>
  );
}

export default App;
