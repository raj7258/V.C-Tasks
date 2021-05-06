import React, { useContext } from "react";
import { ColorContext } from "../ColorContext";

// class Button extends React.Component {
//   render() {
//     return (
//       <div>
//         <ColorConsumer>
//           {({ bgColor, changeBgColor }) => {
//             return (
//               <button
//                 style={{
//                   backgroundColor: bgColor.background,
//                   color: bgColor.foreground,
//                 }}
//                 onClick={changeBgColor}
//               >
//                 change Background Color
//               </button>
//             );
//           }}
//         </ColorConsumer>
//       </div>
//     );
//   }
// }

const Button = () => {
  const { bgColor, changeBgColor } = useContext(ColorContext);
  return (
    <div>
      <button
        style={{
          backgroundColor: bgColor.background,
          color: bgColor.foreground,
        }}
        onClick={changeBgColor}
      >
        change Background Color
      </button>
    </div>
  );
};
export default Button;
