import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Input({ label, className = '', showToggle = false, ...props }) {
  const [visible, setVisible] = useState(false)

  const isPassword = props.type === 'password'
  const inputType = isPassword && showToggle ? (visible ? 'text' : 'password') : props.type

  return (
    <label className="block text-sm font-medium text-slate-700">
      {label && <span className="mb-2 block">{label}</span>}
      <div className="relative">
        <input
          className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${className}`}
          {...props}
          type={inputType}
        />
        {isPassword && showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </label>
  )
}
