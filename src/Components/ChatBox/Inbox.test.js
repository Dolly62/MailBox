import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Inbox from "./Inbox";
import { render, screen } from "@testing-library/react";
import store from "../../Store/oneStore";

describe("Inbox Component", () => {
  test("display no mail found message", () => {
    render(
      <Provider store={store}>
        <Inbox />
      </Provider>
    );
    const noMailElement = screen.getByText("No mail is found");
    expect(noMailElement).toBeInTheDocument();
  });
});
