function GradientSVG() {
  const idCSS = "gradientProgress";
  const gradientTransform = `rotate(90)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="2.29%" stopColor="black" />
          <stop offset="85.56%" stopColor="#23EAE0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVG;
