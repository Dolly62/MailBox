import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/oneStore";
import { BrowserRouter } from "react-router-dom";

test("renders sidebar component", () => {
  render(
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  );

  const sidebarElement = screen.getByTestId("sidebar");
  expect(sidebarElement).toBeInTheDocument();
});
