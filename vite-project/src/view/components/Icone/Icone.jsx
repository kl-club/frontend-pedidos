export function Icone({ nome, preenchido = false, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={preenchido ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {nome}
    </span>
  );
}
