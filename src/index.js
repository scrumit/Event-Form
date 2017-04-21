import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";

injectTapEventPlugin();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#000",
    primary2Color: "#ffab2f",
    pickerHeaderColor: "#ffab2f"
  },
  textField: {
    textColor: "#000",
    backgroundColor: "white"
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Form />
  </MuiThemeProvider>
);
ReactDOM.render(<App />, document.getElementById("root"));
