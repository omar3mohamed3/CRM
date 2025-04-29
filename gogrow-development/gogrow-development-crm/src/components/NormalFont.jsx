const NormalFont = ({ font = "normal", children }) => {
  // Font with 15px
  return (
    <div className={`  font-${font} text-[14px] text-primary leading-[21px]`}>
      {children}
    </div>
  );
};

export default NormalFont;
