import { Icon } from "@iconify/react";

const Button = ({ icon, text, isMobile, onClick }) => (
  <button
    onClick={onClick}
    className={`bg-[#FF9248] flex flex-col items-center justify-center rounded-lg border-2 border-white text-[#2E2929] hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out ${isMobile ? "h-[40px] w-[60px]" : "h-[55px] w-[85px]"}`}
  >
    <div className="flex flex-col items-center justify-center">
      <Icon icon={icon} width={isMobile ? 20 : 25} className="mb-1" />
      {!isMobile && <p className="text-sm">{text}</p>}
    </div>
  </button>
);

export default Button;
