

const Icon = ({ as: IconComponent, className = "", size = "text-xl" }) => {

  return (
    <IconComponent
      className={`text-amber-500 hover:text-amber-600 text-${size} ${className}`}
    />
  );
};

export default Icon;
