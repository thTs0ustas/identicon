import { useRef, useState } from 'react';
import './App.css';
import { createIdenticonMatrix } from './utils/encodeString';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [colors, setColors] = useState<string[][]>([]);
  const emailInputRef = useRef<HTMLInputElement>(null); // Step 1: Add a ref to the input

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (emailInputRef.current) {
      emailInputRef.current.setCustomValidity('');
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailInputRef.current) {
      if (emailInputRef.current.validity.typeMismatch) {
        emailInputRef.current.setCustomValidity('Please enter a valid email.');
        emailInputRef.current.reportValidity();
        return;
      }
      emailInputRef.current.setCustomValidity('');
    }
    await createIdenticonMatrix(input, 5, 5).then((data: string[][]) => setColors(data));
  };

  return (
    <div>
      <h1>Identicon Generator</h1>
      <form className="mail-input">
        <input ref={emailInputRef} type="email" placeholder="Email" onChange={handleInputChange} />
        <button disabled={!input} type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div className="identicon">
        {colors.map((row, i) => (
          <div key={i} className="row">
            {row.map((color, j) => (
              <div
                key={j}
                className="cell"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
