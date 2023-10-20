// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import Layout from "@/app/signup/page";
//
// describe("signup function", () => {
//   it("should send a POST request to /users/signup with the correct data", async () => {
//     const mockAxios = new MockAdapter(axios);
//     mockAxios
//       .onPost("http://localhost:4000/users/signup")
//       .reply(200, "Authorization token");
//
//     const { getByText } = render(
//       <Layout>
//         <div>Child Component 1</div>
//         <div>Child Component 2</div>
//       </Layout>
//     );
//
//     const nameInput = screen.getByPlaceholderText("Username");
//     const emailInput = screen.getByPlaceholderText("Email");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const submitButton = screen.getByRole("button", { name: "Submit" });
//
//     fireEvent.change(nameInput, { target: { value: "John Doe" } });
//     fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//
//     fireEvent.click(submitButton);
//
//     await waitFor(() => {
//       expect(mockAxios.history.post.length).toBe(1);
//       expect(mockAxios.history.post[0].data).toEqual(
//         JSON.stringify({
//           uname: "John Doe",
//           email: "johndoe@example.com",
//           password: "password123",
//         })
//       );
//     });
//   });
// });
