import UserService from "../services/user.service";
import User from "../models/User";
import jwt from "jsonwebtoken";

const mockCreatedUser = {
  id: "1",
  email: "email@example.com",
  password: "encrypted",
  createdAt: new Date(),
};


describe("user service unit tests", ()=>{

  beforeEach(()=>{
    jest.restoreAllMocks();
  });

  it("should createUser", async ()=>{
    const mockUserCreate = jest.spyOn(User, 'create').mockReturnValue(mockCreatedUser);
    const user = {
      email: "email@example.com",
      password: "123"
    };
    const result = await UserService.createUser(user);
    expect(result).toBe(mockCreatedUser);
    expect(mockUserCreate).toHaveBeenCalledTimes(1);
  });

  it("should getUserByEmail", async ()=>{
    const mockFindOne = jest.spyOn(User, 'findOne').mockReturnValue(mockCreatedUser);
    const result = await UserService.getUserByEmail("email@example.com");
    expect(result).toBe(mockCreatedUser);
    expect(mockFindOne).toHaveBeenCalledTimes(1);
  });

  describe("createUserService", ()=>{
    it("should getUserByEmail and if exists, throws an error",async ()=>{
      const mockGetUserByEmail = jest.spyOn(UserService, 'getUserByEmail').mockImplementation(async () => mockCreatedUser);
      const user = {
        email: "email@example.com",
        password: "123"
      }
      await expect(UserService.createUserService(user)).rejects.toThrowError();
      expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    });

    it("should getUserByEmail and if does not exist, calls createUser",async ()=>{
      const mockGetUserByEmail = jest.spyOn(UserService, 'getUserByEmail').mockImplementation(async () => null);
      const mockCreateUser = jest.spyOn(UserService, 'createUser').mockImplementation(async () => mockCreatedUser);
      const user = {
        email: "email@example.com",
        password: "123"
      }
      const result = await UserService.createUserService(user);
      expect(result).toEqual({
        id: "1",
        email: "email@example.com",
      });
      expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
      expect(mockCreateUser).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUserById", ()=>{
    it("should return null when throwErrorIfNoExists is false and there is not user",async ()=>{
      const mockFindById = jest.spyOn(User, 'findById').mockReturnValue(null);
      const result = await UserService.getUserById("1");
      expect(result).toBe(null);
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });
    it("should return an user when throwErrorIfNoExists is false",async ()=>{
      const mockFindById = jest.spyOn(User, 'findById').mockReturnValue(mockCreatedUser);
      const result = await UserService.getUserById("1");
      expect(result).toBe(mockCreatedUser);
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });
    it("should throw error when throwErrorIfNoExists is true and there is not user",async ()=>{
      const mockFindById = jest.spyOn(User, 'findById').mockReturnValue(null);
      await expect( UserService.getUserById("1", true)).rejects.toThrowError();
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });
    it("should return an when throwErrorIfNoExists is true and user exists",async () => {
      const mockFindById = jest.spyOn(User, 'findById').mockReturnValue(mockCreatedUser);
      const result = await UserService.getUserById("1", true);
      expect(result).toBe(mockCreatedUser);
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });
  });

  describe("saveToken", ()=>{
    it("should return user when there is not token",async ()=>{
      const user = {
        email: "email@example.com",
        password: "123"
      };
      const result = await UserService.saveToken(user);
      expect(result).toBe(user);
    });
    it("should return user with jwtAuthorization when there is a token, and save it",async ()=>{
      const expectedUser = {email: "email@example.com", jwtAuthorization: "fwfea2423fewefw234234"};
      const user = {
        email: "email@example.com",
        password: "123",
        save: await jest.fn().mockImplementation(async ()=> (expectedUser)),
      };
      const result = await UserService.saveToken(user, 'fwfea2423fewefw234234');
      expect(result).toMatchObject(expectedUser);
    });
  });

  describe("loginService", ()=>{
    it("should throw an error is user does not exists",async ()=>{
      const user = {
        email: "email@example.com",
        password: "123",
      };
      const mockGetUserByEmail = jest.spyOn(UserService, 'getUserByEmail').mockImplementation(async () => null);
      await expect(UserService.loginService(user)).rejects.toThrowError();
      expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    });
    it("should throw an error is user does exist, but password is incorrect",async ()=>{

      const user = {
        email: "email@example.com",
        password: "123",
      };

      const expectedUser = {
        id: "1",
        ...user,
        verifyPassword: await jest.fn().mockImplementation(async ()=> (false)),
      };

      const mockGetUserByEmail = jest.spyOn(UserService, 'getUserByEmail').mockImplementation(async () => expectedUser);
      await expect(UserService.loginService(user)).rejects.toThrowError();
      expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    });
    it("should return user id, email and jwt when user and password are rigth",async ()=>{

      const mockJwtSign = jest.spyOn(jwt, 'sign').mockReturnValue("123456");
      const mockSaveToken = jest.spyOn(UserService, 'saveToken').mockImplementation(async () => {return});

      const user = {
        email: "email@example.com",
        password: "123",
      };

      const expectedUser = {
        id: "1",
        ...user,
        verifyPassword: await jest.fn().mockImplementation(async ()=> (true)),
      };

      const mockGetUserByEmail = jest.spyOn(UserService, 'getUserByEmail').mockImplementation(async () => expectedUser);

      const result = await UserService.loginService(user);
      expect(result).toEqual({
        id: "1",
        email: "email@example.com",
        jwt: "123456",
      })

      expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockJwtSign).toHaveBeenCalledTimes(1);
    });
  });

});