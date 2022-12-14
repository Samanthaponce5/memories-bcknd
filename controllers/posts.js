import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}
export const creatPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try{
        await newPost.save();
        res.status(201).json(newPost)

    }catch(error){
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json( 'No post with that id')
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})

    res.json(updatedPost)
}
export const deletePost = async (req, res) => {

    const {id: _id} = req.params 
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json('Post with id not found')

    await PostMessage.findByIdAndDelete(_id)
    res.status(200).json('Delted successfully')

}

