import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { registerUser } from "../register";

describe("registerUser", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should return user data on successful registration", async () => {
    const mockResponse = { token: "12345" };
    mock
      .onPost("http://localhost:3000/users/register")
      .reply(200, mockResponse);

    const response = await registerUser(
      "testuser",
      "test@example.com",
      "password"
    );

    expect(response).toEqual(mockResponse);
  });

  it("should throw an error on failed registration", async () => {
    mock.onPost("http://localhost:3000/users/register").reply(400);

    await expect(
      registerUser("testuser", "test@example.com", "weakpassword")
    ).rejects.toThrow();
  });
});
