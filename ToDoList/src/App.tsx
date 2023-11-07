import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  font-family: 'Noto Sans';
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  
}
  * {
    box-sizing:border-box;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
