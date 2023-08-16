import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { retrieveUser, retrieveUserById } from '../retrievers/userRetriever.js';
import { createUser, saveUser } from '../updaters/userUpdater.js';

/**
 * @desc    Auth user / set token
 * @route   POST /api/users/auth
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await retrieveUser({ email });
  if (user && (await user.matchPassword(password))) {
    // Saves the token in a HTTP Cookie
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
  }

  res.status(401);
  throw new Error('Identifiants invalides.');
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const userExists = await retrieveUser({ email });
  if (userExists)  {
    res.status(400);
    throw new Error('Cet utilisateur existe déjà.')
  }

  const user = await createUser({
    firstName,
    lastName,
    phone,
    email,
    password
  });

  if (user) {
    // Saves the token in a HTTP Cookie
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
  }

  res.status(400);
  throw new Error('Impossible de créer l\'utilisateur. Vérifiez les données saisies.');
});

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: 'Utilisateur déconnecté.',
  });
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    phone: req.user.phone,
    email: req.user.email,
  };

  res.status(200).json(user);
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await retrieveUserById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.user.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await saveUser(user);

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      email: updatedUser.email,
    });
  }

  res.status(404);
  throw new Error ('Cet utilisateur n\'existe pas.');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
