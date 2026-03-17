export const HeroSticker = ({ src, className, rotate }) => (
  <div
    className={`absolute shadow-2xl rounded-xl overflow-hidden border-4 border-white transition-transform duration-500 hover:scale-105 ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <img
      src={src}
      alt="Design preview"
      className="w-full h-full object-cover"
    />
  </div>
);

export default { HeroSticker };
