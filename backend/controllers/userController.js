import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import UserRetriever from '../retrievers/userRetriever.js';
import UserUpdater from '../updaters/userUpdater.js';
import constants from '../utils/constants.js';

/**
 * @desc    Auth user / set token
 * @route   POST /api/users/auth
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserRetriever.retrieveOne({ email }, false);
  if (user && (await user.matchPassword(password))) {
    // Saves the token in a HTTP Cookie
    generateToken(res, user.id);

    res.status(constants.HTTP_CREATED).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
  }

  res.status(constants.HTTP_UNAUTHORIZED);
  throw new Error('Identifiants invalides.');
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const userExists = await UserRetriever.retrieveOne({ email });
  if (userExists)  {
    res.status(constants.HTTP_BAD_REQUEST);
    throw new Error('Cet utilisateur existe déjà.')
  }

  const user = await UserUpdater.create({
    firstName,
    lastName,
    phone,
    email,
    password
  });

  if (user) {
    // Saves the token in a HTTP Cookie
    generateToken(res, user.id);

    res.status(constants.HTTP_CREATED).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
    return;
  }

  res.status(constants.HTTP_BAD_REQUEST);
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

  res.status(constants.HTTP_OK).json({
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
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    phone: req.user.phone,
    email: req.user.email,
    establishmentIds: req.user.establishmentIds,
  };

  res.status(constants.HTTP_OK).json(user);
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserRetriever.retrieveById(req.user.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await UserUpdater.save(user);

    res.status(constants.HTTP_OK).json({
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      email: updatedUser.email,
    });
    return;
  }

  res.status(constants.HTTP_NOT_FOUND);
  throw new Error ('Cet utilisateur n\'existe pas.');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
