import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loginUser } from "../auth";

describe("loginUser", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should return user data on successful login", async () => {
    const mockResponse = { token: "12345" };
    mock.onPost("http://localhost:3000/users/login").reply(200, mockResponse);

    const response = await loginUser("test@example.com", "password");

    expect(response).toEqual(mockResponse);
  });

  it("should throw an error on failed login", async () => {
    mock.onPost("http://localhost:3000/users/login").reply(401);

    await expect(
      loginUser("test@example.com", "wrongpassword")
    ).rejects.toThrow();
  });
});
