import Link from "next/link";

const LinkButton = ({
  link,
  text,
  textSize,
  fontClass = "font-dream-avenue",
  colorClass = "text-primary hover:text-primary-white",
  extraClass = "",
  color = "#f0a500",
  hoverColor = "#eeeee6",
}: {
  link: string;
  textSize: string;
  text: string;
  fontClass?: string;
  colorClass?: string;
  extraClass?: string;
  color?: string;
  hoverColor?: string;
}) => {
  return (
    <Link href={link}>
      <div
        className={`${textSize} ${colorClass} transition-all w-fit h-fit cursor-pointer js-menu-item`}
      >
        <a className="relative overflow-hidden block">
          <div
            data-default-color={color}
            data-hover-color={hoverColor}
            className={`${fontClass} linkItem ${
              extraClass && extraClass.length > 0 && extraClass
            }`}
          >
            {text}
          </div>
        </a>
      </div>
    </Link>
  );
};

export default LinkButton;
