import { useState } from "react";

const Checkbox = ({ label, checked, onChange, ...props }) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const handleChange = () => {
      if (onChange) {
        setIsChecked(!isChecked)
        onChange(!isChecked);
      }
    };
  
    return (
      <div className="checkbox-wrapper">
        <label>
          <input 
          type="checkbox" 
          checked={isChecked}
          onChange={handleChange}
          className={isChecked ? "checked" : ""}
          {...props} />
          <span>{label}</span>
        </label>
        <p>{isChecked ? "Selected" : "Unchecked"}</p>
      </div>
    );
  };
  export default Checkbox;

// const Checkbox = ({ label, checked, onChange, ...props }) => {
//   const handleChange = () => {
//     if (onChange) {
//       onChange(!checked);
//     }
//   };

//   return (
//     <div className="checkbox-wrapper">
//       <label>
//         <input
//           type="checkbox"
//           checked={checked}
//           onChange={handleChange}
//           className={checked ? "checked" : ""}
//           {...props}
//         />
//         <span>{label}</span>
//       </label>
//       <p>{checked ? "Selected" : "Unchecked"}</p>
//     </div>
//   );
// };
// export default Checkbox;
