// Defining prop types for the Button component
interface ButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onclick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, className = '', disabled = false, onclick, }) => {
  return (
    <button
      type="button"
      className={`btn ${className}`.trim()}
      disabled={disabled}
      onClick={onclick}
    >
      {text}
    </button>
  );
};