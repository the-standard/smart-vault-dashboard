function GradientSVG() {
  const idCSS = "gradientProgress";
  const gradientTransform = `rotate(90)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="2.29%" stopColor="black" />
          <stop offset="55.56%" stopColor="#23EAE0" />
          <stop offset="95.56%" stopColor="#da2323" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVG;
