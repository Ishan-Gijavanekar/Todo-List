import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { List } from "../models/Todo.model.js";


const addTodo = asyncHandler(async (req, res) => {
    const userId = req.user;
    const {task, date, status} = req.body;

    if(!userId) {
        throw new ApiError(401, "Authorization failed")
    }

    if (!task || !date || !status) {
        throw new ApiError(401, "All feilds are required")
    }

    const item = await List.create({
        content: task,
        createdOn: date,
        status: status,
        user: userId
    })

    await item.save()

    const addedItem = await List.findById(item._id)

    return res
    .status(200)
    .json(
        new ApiResponse(200, addedItem, "Item Added Successfully")
    )
})

const getItems = asyncHandler(async (req, res) => {
    const userId = req.user

    const userItems = await List.find({user:userId})

    if(!userItems) {
        throw new ApiError(401, "User not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, userItems, "Details fetched Successfully")
    )
})

const updateItems = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const {task , date, status} = req.body

    if(!id) {
        throw new ApiError(401, "Invalid Id")
    }

    if(!task || !date || !status) {
        throw new ApiError("All feilds are required")
    }

    const item = await List.findByIdAndUpdate(
        id,
        {
            content: task,
            createdOn: date,
            status: status,
        },
        {
            new: true,
        }
    )

    if(!item) {
        throw new ApiError(401, "Problem while updating the document")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, item, "Item updated successfully")
    )
}) 

const deleteItem = asyncHandler(async (req, res) => {
    const {id} = req.params

    if(!id) {
        throw new ApiError(401, "Invalid id")
    }

    await List.findByIdAndDelete(id)

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Item deleted successfully")
    )
})

const getItembyId = asyncHandler(async (req, res) => {
    const {id} = req.params

    if(!id) {
        throw new ApiError(401, "Invalid Item id")
    }

    const itemDetails = await List.findById(id)

    if(!itemDetails) {
        throw new ApiError(401, "Database cannot retrive data")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, itemDetails, "Item fetched successfully")
    )
})

export {addTodo, getItems, updateItems, deleteItem, getItembyId}