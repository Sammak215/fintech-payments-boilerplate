// export default function InputUnderline({ ...otherProps }) {
//   const DEFAULTS =
//     "text-lg bg-[transparent] border-transparent border-b-[3px] border-primary md:w-4/5 w-full focus:outline-none placeholder:text-[#B0B0B0] placeholder:italic";

//   return <input {...otherProps} className={DEFAULTS} />;
// }

export default function InputUnderline({
  placeHolderStyles,
  ref,
  ...otherProps
}) {
  const DEFAULTS = ` sm:py-2 mt-[12px] border pt-0 leading-none  rounded-[3px] px-4 md:w-full w-full transition-colors focus:outline-[blue] ${
    // const DEFAULTS = `text-lg sm:pt-[8px] pt-0 leading-none border-transparent border-b-[3px] px-4 md:w-full w-full focus:outline-none ${
    placeHolderStyles
      ? placeHolderStyles
      : "placeholder:text-[#B0B0B0] placeholder:text-[14px]"
  } placeholder:font-light  `;

  return <input {...otherProps} ref={ref} className={DEFAULTS} />;
}
