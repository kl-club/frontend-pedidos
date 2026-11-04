import styles from './Botao.module.css';

export function Botao({
  variante = 'primario',
  tamanho = 'medio',
  type = 'button',
  className = '',
  ...resto
}) {
  const classes = [styles.botao, styles[variante], styles[tamanho], className]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classes} {...resto} />;
}
