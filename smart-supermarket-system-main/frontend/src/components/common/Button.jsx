export default function Button({ children, className = '', variant = 'primary', type = 'button', ...props }) {
  const styles = {
    primary: 'rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500',
    secondary: 'rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400',
    danger: 'rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-200',
  }

  return (
    <button type={type} className={`${styles[variant] || styles.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
