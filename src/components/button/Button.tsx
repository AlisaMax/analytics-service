interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

const Button = ({
  label,
  isDisabled = false,
  onClick,
  className = '',
  'data-testid': dataTestId,
}: ButtonProps) => {
  return (
    <button disabled={isDisabled} className={className} onClick={onClick} data-testid={dataTestId}>
      {label}
    </button>
  );
};

export default Button;
