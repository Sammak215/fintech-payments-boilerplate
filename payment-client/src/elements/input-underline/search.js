// export default function InputUnderline({ ...otherProps }) {
//   const DEFAULTS =
//     "text-lg bg-[transparent] border-transparent border-b-[3px] border-primary md:w-4/5 w-full focus:outline-none placeholder:text-[#B0B0B0] placeholder:italic";

//   return <input {...otherProps} className={DEFAULTS} />;
// }

export default function InputUnderline({ ...otherProps }) {
  const DEFAULTS =
    "text-lg border border-[#D8D6DE] rounded-md px-[4px] py-[6px] md:w-full w-full focus:outline-none placeholder:text-[#B0B0B0] placeholder:text-[14px] placeholder:font-light  placeholder:italic";

  return <input {...otherProps} className={DEFAULTS} />;
}
