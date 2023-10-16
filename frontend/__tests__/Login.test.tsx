// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Layout from "@/app/login/page";
// import "@testing-library/jest-dom";
// import { expect } from "@jest/globals";

// describe("Layout component", () => {
//   it("should render the sign in form", () => {
//     const { getByText } = render(
//       <Layout>
//         <div>Child Component 1</div>
//         <div>Child Component 2</div>
//       </Layout>
//     );
//     const usernameInput = screen.getByPlaceholderText("Username");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const submitButton = screen.getByRole("button", { name: "Submit" });

//     describe("Layout component", () => {
//       it("should render the sign in form", () => {
//         const { getByText } = render(
//           <Layout>
//             <div>Child Component 1</div>
//             <div>Child Component 2</div>
//           </Layout>
//         );
//         const usernameInput = screen.getByPlaceholderText("Username");
//         const passwordInput = screen.getByPlaceholderText("Password");
//         const submitButton = screen.getByRole("button", { name: "Submit" });
//         expect(passwordInput).toBeInTheDocument();
//         expect(submitButton).toBeInTheDocument();
//       });
//     });
//   });

//   it("should update the username state when the username input changes", () => {
//     const { getByText } = render(
//       <Layout>
//         <div>Child Component 1</div>
//         <div>Child Component 2</div>
//       </Layout>
//     );
//     const usernameInput = screen.getByPlaceholderText("Username");
//     fireEvent.change(usernameInput, { target: { value: "testuser" } });
//     expect(usernameInput.value).toBe("testuser");
//   });

//   it("should update the password state when the password input changes", () => {
//     const { getByText } = render(
//       <Layout>
//         <div>Child Component 1</div>
//         <div>Child Component 2</div>
//       </Layout>
//     );
//     const passwordInput = screen.getByPlaceholderText("Password");
//     fireEvent.change(passwordInput, { target: { value: "testpassword" } });
//     expect(passwordInput.value).toBe("testpassword");
//   });

//   it("should call the signin function when the form is submitted", async () => {
//     const mockSignin = jest.fn();
//     render(<Layout signin={mockSignin} />);
//     const submitButton = screen.getByRole("button", { name: "Submit" });
//     fireEvent.click(submitButton);
//     await waitFor(() => expect(mockSignin).toHaveBeenCalledTimes(1));
//   });

//   it("should call the getAll function when the 'Get all' button is clicked", async () => {
//     const mockGetAll = jest.fn();
//     render(<Layout getAll={mockGetAll} />);
//     const getAllButton = screen.getByRole("button", { name: "Get all" });
//     fireEvent.click(getAllButton);
//     await waitFor(() => expect(mockGetAll).toHaveBeenCalledTimes(1));
//   });
// });
