import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import prisma from "../prisma/client.js";
export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingPhone = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    })
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    // encryption of password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
    generateTokenAndSetCookie(res, user.id);
    return res
      .status(201)
      .json({ message: "User created successfully", user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error creating user",err });
  }
};
export const loginByPhone = async (req, res) => {
  
  try{
    const {phone} = req.body;
    if(!phone){
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    generateTokenAndSetCookie(res, user.id);
    return res.status(200).json({ message: "Login successful", user: user });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Error logging out" });
  }
}

export const loginByEmail = async (req, res) => {
  try{
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(res, user.id);
    return res.status(200).json({ message: "Login successful", user: user });
    
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Error logging out" });
  }
}
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error logging out" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User authenticated", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error checking authentication" });
  }
};
