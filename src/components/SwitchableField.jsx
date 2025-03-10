export default function SwitchableField({
  index,
  selectedOption,
  onClick,
  title,
}) {
  return (
    <label
      key={index}
      htmlFor={`${index}`}
      className={`px-2 py-4 rounded-full text-[12px] h-[40px]  w-[144px] text-center transition ${
        selectedOption === index
          ? "bg-blue-500 cursor-pointer font-semibold text-white flex justify-center items-center self-center "
          : " cursor-pointer text-gray-500 font-light flex justify-center items-center self-center "
      }`}
    >
      <button
        id={`${index}`}
        value={index}
        style={{
          display: "none",
        }}
        onClick={onClick}
        defaultChecked={selectedOption === index}
      />
      <span className="md:text-[16px] text-sm whitespace-nowrap">{title}</span>
    </label>
  );
}
