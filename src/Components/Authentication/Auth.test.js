import { getByPlaceholderText, render, screen } from "@testing-library/react"
import Auth from "./Auth"

describe("Auth Component", () => {
    test("renders 'Welcome Again' text", () => {
        //ARRANGE
        render(<Auth/>);

        //Assert
        const textElement = screen.getByText("Welcome Again!", {exact: false});
        expect(textElement).toBeInTheDocument();

    })

    test("renders 'submit-type' button", () => {
        render(<Auth/>);

        //Assert
        const submitBtnEle = screen.getByRole("button", {name: "Login"}, {exact: false});
        expect(submitBtnEle).toBeInTheDocument();
    })

    test("renders 'switchMode' button", () => {
        render(<Auth/>);

        //Assert
        const switchBtnEle = screen.getByRole("button", {name: "Don't have an account? Signup"}, {exact: false});
        expect(switchBtnEle).toBeInTheDocument();
    })

    test("renders 'form placeHolder'", () => {
        render(<Auth/>);

        //Assert
        const emailPlaceHoldEle = screen.getByPlaceholderText("Enter your email..", {exact: false});
        const passwordPlaceHoldEle = screen.getByPlaceholderText("Enter your password..", {exact: false})
        expect(emailPlaceHoldEle).toBeInTheDocument();
        expect(passwordPlaceHoldEle).toBeInTheDocument();
    })
})