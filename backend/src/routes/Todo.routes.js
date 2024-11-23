import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTodo, deleteItem, getItembyId, getItems, updateItems } from "../controllers/Todo.controller.js";


const router = Router()

router.route("/add-items").post(verifyJWT, addTodo)
router.route("/get-items").get(verifyJWT, getItems)
router.route("/update-item/:id").patch(verifyJWT, updateItems)
router.route("/delete-item/:id").delete(verifyJWT, deleteItem)
router.route("/get-item/:id").get(verifyJWT, getItembyId)


export default router