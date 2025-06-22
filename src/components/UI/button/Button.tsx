interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({ label, isDisabled = false, onClick, className = '' }: ButtonProps) => {
  return (
    <button disabled={isDisabled} className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
