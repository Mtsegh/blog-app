import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendAuthEmail, sendPasswordResetEmail } from "../emails/emailHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../lib/generateWebToken.js";
import generateEmailAuthToken from "../utils/authToken.js";
import cloudinary from "../lib/cloudinary.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" })
        };
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        // check if emailis valid: regex
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email})
        
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const verificationToken = generateEmailAuthToken();
        
        const newUser = new User({
            fullname,
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 30 * 60 * 1000, //30 min
        })
        
        if (newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            await sendAuthEmail(email, fullname, verificationToken);
            
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                isVerified: newUser.isVerified,
                profileImage: newUser.profileImage,
                lastSentAt: Date.now(),
                message: "User created successfully, please verify your email",
            });
            

        } else {
            res.status(400).json({ message: "invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        // TODO: Allow writer to login with username or email 
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ message: "Please enter all fields" })
        };

        let user;
        if (emailRegex.test(usernameOrEmail)) {
            user = await User.findOne({ email: usernameOrEmail });
        } else {
            user = await User.findOne({ username: usernameOrEmail });
        }


        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials, here" })
        }

        generateToken(user._id, res);
        if (!user.isVerified) {
            const reqObj = { body: { email: user.email } };
            await resendVerificationEmail(reqObj, res);
            return;
        }

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            isVerified: user.isVerified,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    };
};

export const verifyEmail = async (req, res) => {
    try {
        const { token, email } = req.body; // if sent as ?token=...
        if (!token) return res.status(400).json({ message: "Missing token" });
        console.log(req.body);
        
        const user = await User.findOne({
            email: email,
			verificationToken: token,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

        if (!user) return res.status(404).json({ message: "Invalid token" });

        if (user.isVerified) return res.status(400).json({ message: "User already verified" });

        user.isVerified = true;
        user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully!", data: user });
    } catch (err) {
        console.log("Error in verifyEmail controller: ", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const checkAuth = async (req, res) => {
    try {
        // if (!req.user.isVerified) {
        //     await resendVerificationEmail(req.user.email, res);
        //     return;
        // }
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profileImage, coverImage, fullname, bio } = req.body;

        const userId = req.user._id;

        const updateFields = {};

        if (fullname) updateFields.fullname = fullname;
        if (bio) updateFields.bio = bio;

        if (profileImage) {
            const uploaded = await cloudinary.uploader.upload(profileImage);
            updateFields.profileImage = uploaded.secure_url;
        }

        if (coverImage) {
            const uploaded = await cloudinary.uploader.upload(coverImage);
            updateFields.coverImage = uploaded.secure_url;
        }
        console.log("Update fields: ", updateFields);
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateFields,
        { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    
    if (user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
    };
    
    const TWO_MINUTES = 2 * 60 * 1000;
    const lastVerificationSentAt = Date.now() - user.verificationTokenExpiresAt
    if (lastVerificationSentAt && Date.now() - lastVerificationSentAt < TWO_MINUTES) {
        const secondsLeft = Math.ceil((TWO_MINUTES - (Date.now() - lastVerificationSentAt)) / 1000);
        return res.status(429).json({
            message: `Please wait ${secondsLeft} seconds before resending`,
            retryAfter: secondsLeft });
    }

    
    // Generate a new token (expires in 30 minutes)
    const verificationToken = generateEmailAuthToken();
    
    user.lastSentAt = new Date();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = Date.now() + 30 * 60 * 1000;
    await user.save();

    // Send the verification email
    await sendAuthEmail(email, user.fullname, verificationToken);
    
    res
      .status(200)
      .json({ message: "New verification email sent successfully",
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
       });
  } catch (error) {
        console.log("Error in update resendAuthEmail controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
};
export const deleteUsers = async (req, res) => {
  try {
    const deleted = await User.deleteMany({});

    
    res
      .status(200)
      .json({ message: "Deleted successfully", deleted });
  } catch (error) {
        console.log("Error in update resendAuthEmail controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) return res.status(404).json({ message: "User not found" });

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, user.fullname, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        console.log("Password reset email sent to ", user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
		res.status(200).json({ message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ message: "Invalid or expired reset token" });
		}

		// update password
		const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		// await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ message: error.message });
	}
};