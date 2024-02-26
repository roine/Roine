import React from 'react'

export const Callout = ({ children, variant = 'info' }) => {
  const getVariantStyle = (variant) => {
    switch (variant) {
      case 'info':
        return {
          backgroundColor: 'rgb(229, 246, 253)',
          color: 'rgb(1, 67, 97)',
        }
    }
  }
  return (
    <div
      style={Object.assign(
        {
          padding: 17,
          paddingLeft: 25,
          color: '#333',
          fontSize: 14,
          borderRadius: 2,
          margin: '5px 0',
        },
        getVariantStyle(variant)
      )}
    >
      {children}
    </div>
  )
}
