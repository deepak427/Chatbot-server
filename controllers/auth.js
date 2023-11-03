import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isPasswordCrt = await bcrypt.compare(password, process.env.PASSWORD_ADMIN);

    if (!isPasswordCrt || email !== "chatbot@gmail.com") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: "chatbot@gmail.com" },
      process.env.JWT_SECRECT,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: token });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
