// components/ColorPicker.js
import React from 'react';
import { Button } from '@mui/material';
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF"]; // Example primary colors
const ColorPicker = ({ selectedColor, onColorSelect }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {colors.map((color) => (
        <Button
          key={color}
          style={{
            backgroundColor: color,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            padding: 0,
            minWidth: 'auto',
            border: selectedColor === color ? '2px solid black' : 'none',
          }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
};
export default ColorPicker;
