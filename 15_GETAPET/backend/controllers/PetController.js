const Pet = require("../models/Pet");

// helpers
const getUserByToken = require("../helpers/get-user-by-token");
const getToken = require("../helpers/get-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  // create a pet
  static async create(req, res) {
    const name = req.body.name;
    const age = req.body.age;
    const description = req.body.description;
    const weight = req.body.weight;
    const color = req.body.color;
    const image = req.body.image;
    const available = true;

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    }

    if (!image) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    // get user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create pet
    const pet = new Pet({
      name: name,
      age: age,
      description: description,
      weight: weight,
      color: color,
      image: image,
      available: available,
      user: {
        _id: user._id,
        user: user.name,
        image: user.image,
      },
    });

    try {
      const newPet = await pet.save();

      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet: newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // get all registered pets
  static async getAll(req, res) {
    const pets = await Pet.find();

    res.status(200).json({
      pets: pets,
    });
  }

  // get a specific pet
  static async getPetById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    res.status(200).json({
      pet: pet,
    });
  }

  // remove a pet
  static async removePetById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if user registered this pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    await Pet.findByIdAndRemove(id);

    res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  // update a pet
  static async updatePet(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const description = req.body.description;
    const weight = req.body.weight;
    const color = req.body.color;
    const image = req.body.image;
    const available = req.body.available;

    const updateData = {};

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if user registered this pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    } else {
      updateData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    } else {
      updateData.age = age;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    } else {
      updateData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    } else {
      updateData.color = color;
    }

    if (!image) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    } else {
      updateData.image = image;
    }

    if (!available) {
      res.status(422).json({ message: "O status é obrigatório!" });
      return;
    } else {
      updateData.available = available;
    }

    updateData.description = description;

    await Pet.findByIdAndUpdate(id, updateData);

    res.status(200).json({ pet: pet, message: "Pet atualizado com sucesso!" });
  }
};
