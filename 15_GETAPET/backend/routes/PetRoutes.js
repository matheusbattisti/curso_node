const router = require("express").Router();

const PetController = require("../controllers/PetController");

// middlewares
const verifyToken = require("../helpers/check-token");

router.post("/create", verifyToken, PetController.create);
router.get("/", PetController.getAll);
router.get("/:id", PetController.getPetById);
router.delete("/:id", verifyToken, PetController.removePetById);
router.patch("/:id", verifyToken, PetController.updatePet);

module.exports = router;
