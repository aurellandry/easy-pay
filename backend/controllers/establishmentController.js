import asyncHandler from 'express-async-handler';
import EstablishmentRetriever from '../retrievers/establishmentRetriever.js';
import UserRetriever from '../retrievers/userRetriever.js';
import EstablishmentUpdater from '../updaters/establishmentUpdater.js';
import Tools from '../utils/tools.js';
import constants from '../utils/constants.js';
import { isValidObjectId } from 'mongoose';

/**
 * @desc    Create a new establishment
 * @route   POST /api/establishments
 * @access  Private
 */
const create = asyncHandler(async (req, res) => {
  const { name, address, additionalAddress } = req.body;

  const establishmentExists = await EstablishmentRetriever.retrieveOne({ name });
  if (establishmentExists)  {
    res.status(constants.HTTP_BAD_REQUEST);
    throw new Error('Cet établissement existe déjà.')
  }

  const establishment = await EstablishmentUpdater.create({
    name: name,
    address: address,
    additionalAddress: additionalAddress,
    userIds: [req.user.id],
  });
  if (establishment) {
    res.status(constants.HTTP_CREATED).json(establishment);
  } else {
    res.status(constants.HTTP_BAD_REQUEST);
    throw new Error('Impossible de créer l\'établissement. Vérifiez les données saisies.');
  }
});

/**
 * @desc    Get Establishments
 * @route   GET /api/establishments
 * @access  Private
 */
const getAll = asyncHandler(async (req, res) => {
  const { filter } = req.query;

  const establishments = await EstablishmentRetriever.retrieveAll(filter);
  if (establishments) {
    res.status(constants.HTTP_OK).json(establishments);
  }

  res.status(constants.HTTP_NOT_FOUND).json(establishments);
});

/**
 * @desc    Get Establishment by ID
 * @route   GET /api/establishments/:id
 * @access  Private
 */
const get = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    try {
      const establishment = await EstablishmentRetriever.retrieveById(id);
      if (establishment) {
        res.status(constants.HTTP_OK).json(establishment);
      }
  
      
    } catch (err) {
      res.status(constants.HTTP_INTERNAL_SERVER_ERROR);
      console.log(err)
      throw new Error('Une erreur est survenue');
    }
  }

  res.status(constants.HTTP_NOT_FOUND).json({});
});

/**
 * @desc    Update establishment
 * @route   PUT /api/establishments/:id
 * @access  Private
 */
const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(constants.HTTP_BAD_REQUEST);
    throw new Error('Identifiant d\'établissement invalide.');
  }

  const establishment = await EstablishmentRetriever.retrieveById(id);

  if (establishment) {
    establishment.name = req.body.name || establishment.name;
    establishment.address = req.body.address || establishment.address;
    establishment.additionalAddress = req.body.additionalAddress || establishment.additionalAddress;
    
    if (req.body.userEmails) {
      const users = await UserRetriever.retrieveAll({ email: req.body.userEmails });
      const userIds = users.map((user) => user.id);
      establishment.userIds = Tools.arrayUnique(establishment.userIds.concat(userIds));
    }
    const updatedEstablishment = await EstablishmentUpdater.save(establishment);

    res.status(constants.HTTP_OK).json(updatedEstablishment);
  }

  res.status(constants.HTTP_NOT_FOUND);
  throw new Error ('Cet établissement n\'existe pas.');
});

/**
 * @desc    Delete establishment
 * @route   DELETE /api/establishment/:id
 * @access  Private
 */
const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(constants.HTTP_BAD_REQUEST);
    throw new Error('Identifiant d\'établissement invalide.');
  }

  try {
    await EstablishmentUpdater.deleteById(id);
  } catch (err) {
    res.status(constants.HTTP_INTERNAL_SERVER_ERROR);
    throw new Error(err);
  }

  res.status(constants.HTTP_NO_CONTENT).json({
    message: 'Établissement supprimé.',
  });
});

export {
  create,
  getAll,
  get,
  update,
  remove,
};
