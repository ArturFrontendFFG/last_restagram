import { createGlobalStyle } from "styled-components";

// outline: 1px solid green;
export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nunito&family=Playfair+Display&family=Varela+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@200&family=Poppins:wght@100;200;400&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
// outline: 1px solid #90ee9075;

}
body{
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  font-family: "Poppins", sans-serif;
}
[data-visiblescroll]::-webkit-scrollbar{
  width: auto;
}
a{
  text-decoration: none;
}
button,input,textarea{
  border: none;
  outlined: none;
}
button{
  cursor: pointer;
}
::-webkit-scrollbar{
  width: 0px
}
`;
