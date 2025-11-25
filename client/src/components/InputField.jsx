import React from 'react'

export default function InputField({
    label: label,
    Icon: Icon,
    style: style,
    ...props
}) {
    return (
        <div className={`form-control ${style}`}>
            <label className="label">
                <span className="label-text font-medium uppercase text-gray-900">{label}</span>
            </label>
            <div className="relative">
                <input
                    className={`input input-bordered w-full pl-10 bg-base-100/10 ${style}`}
                    {...props}
                    required
                />
                <div className="absolute inset-y-0 left-0 z-20 pl-3 flex items-center pointer-events-none">
                    <Icon className="size-5 text-base-content/40" />
                </div>
            </div>
        </div>
    )
}
