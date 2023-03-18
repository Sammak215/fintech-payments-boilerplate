import Link from "next/link";
import { btnType, DEFAULTS, loadingType } from "./styles.config";
import { motion, motionValue } from "framer-motion";

export default function Button({
  children,
  loading,
  loaderColor,
  color,
  link,
  className,
  freeBtn,
  icon,
  style,
  action,
  disabled,
  arrow,
  arrowColor,
  ...otherProps
}) {
  const xArea = motionValue(0);
  const width = motionValue(0);
  let arrcolor = "#fff";
  if (arrowColor) {
    switch (arrowColor) {
      case "primary":
        arrcolor = "#3366ff";
        break;
      case "secondary":
        arrcolor = "#ff8933";
        break;
      case "black":
        arrcolor = "#000";
        break;
      default:
        arrcolor = "#fff";
        break;
    }
  }
  const BtnBody = () => (
    <div
      className={`flex items-center relative ${freeBtn && freeBtn} ${
        loading ? "color-transparent" : ""
      }`}
    >
      {children}
      {arrow && (
        <div
          className="flex justify-center items-center"
          style={{ minWidth: "12px", marginLeft: 10 }}
        >
          {/* , marginBottom: 4 */}
          <motion.svg
            variants={{ hidden: { width: 10 } }}
            style={{ x: xArea, width }}
            transition={{ duration: 0.3 }}
            width="0"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H9"
              stroke={arrcolor}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <motion.svg
            style={{ marginLeft: -5 }}
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L1 9"
              stroke={arrcolor}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      )}
      {icon && icon}

      {loading && (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <svg
            className={`animate-spin -ml-1  h-5 w-5 ${
              loaderColor ? loaderColor : "text-white"
            }`}
            // mr-3
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke={color ? loadingType[color] : loadingType.primary}
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );

  const btnClass = `${className ? className : ""} ${DEFAULTS} ${
    color ? btnType[color] : btnType.primary
  } `;

  if (link) {
    return (
      <Link href={link}>
        <a
          className={`${btnClass} ${DEFAULTS}`}
          style={style ? style : {}}
          {...otherProps}
        >
          <BtnBody />
        </a>
      </Link>
    );
  }

  return (
    <motion.button
      className={`${btnClass} ${arrow && "arrow"} `}
      // w-max
      whileHover="hidden"
      disabled={disabled ? disabled : loading}
      style={style ? style : {}}
      onClick={action}
      {...otherProps}
    >
      <BtnBody />
    </motion.button>
  );
}
