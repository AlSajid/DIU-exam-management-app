import { useState, useRef, useEffect } from "react";

export default function Dropdown({ data, setValue, value, name }: any) {
  const inputRef: any = useRef();
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (value === "") return;

    inputRef.current.value = value;
  }, [value]);

  const handleInput = () => {
    setValue("");
    if (inputRef.current.value === "") {
      setFilteredResults([]);
    } else {
      const filtered = data.filter((item: any) => item[name].toLowerCase().includes(inputRef.current.value.toLowerCase()));
      setFilteredResults(filtered);
    }
  };

  const handleSelect = (item: any) => {
    setValue(item._id);
    inputRef.current.value = item[name];
    setFilteredResults([]);
  };

  return (
    <>
      <input ref={inputRef} onChange={handleInput} />

      {filteredResults.length > 0 && (
        <ul
          onBlur={() => setFilteredResults([])}
          className="absolute min-h-fit max-h-36 overflow-auto border shadow w-96 bg-white p-1 border-emerald-700">
          {filteredResults.map((item: any, index: number) => (
            <li className="p-3 text-sm bg-slate-100 my-1 cursor-pointer" key={index} onClick={() => handleSelect(item)}>
              {item[name]}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
