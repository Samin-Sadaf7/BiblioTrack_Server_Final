import axios from 'axios';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Video from '../models/videomodel.js';
dotenv.config();
const secret = process.env.SECRET;
export const signinGoogle = async (req, res) => {
    if(req.body.googleAccessToken){
        const {googleAccessToken} = req.body;
        console.log(googleAccessToken);
        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
            .then(async response => {
                console.log(response);
                const email = response.data.email;
                const existingUser = await User.findOne({email})

                if (!existingUser){
                    console.log(googleAccessToken);
                    axios
                        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                        headers: {
                            "Authorization": `Bearer ${googleAccessToken}`
                        }
                    })
                        .then(async response => {
                            const firstName = response.data.given_name;
                            const lastName = response.data.family_name;
                            const email = response.data.email;
                            const picture = response.data.picture;
                            const result = await User.create({email:email, name: `${firstName} ${lastName}`, profilePic: picture})
            
                            const token = jwt.sign({
                                email: result.email,
                                id: result._id
                            }, secret, {expiresIn: "1h"})
            
                            res
                                .status(200)
                                .json({result, token})
                        })
                        .catch(err => {
                            res
                                .status(400)
                                .json({message: "Invalid access token!"})
                        })
            
                }else{
                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, secret, {expiresIn: "1h"})
        
                res.status(200).json({result: existingUser, token})
                }    
            })
            .catch(err => {
                res
                    .status(400)
                    .json({message: "Invalid access token!"})
            })
    }else{
        res.status(400).json({message: "Access token not found!"});
    }
};
export const signin = async(req, res) => {
    const {email, password } = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json({message: 'User does not exist'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: 'Invalid password'});
        }
        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, secret , {expiresIn: "1hr"});
        res.status(200).json({result:existingUser, token});
    }catch(error){
        res.status(500).json({message:'Something went wrong'});
    }
};
 export const signup = async (req, res) => {
        const{email, firstName, lastName, password , confirmPassword} = req.body;
        try{
            const existingUser = await User.findOne({email});
            if(existingUser) {
                 return res.status(400).json({message: 'User already exists'});
            }
            if(password !== confirmPassword) {
                return res.status(400).json({message: 'Password dont match'});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await User.create({email: email, password: hashedPassword, name: `${firstName} ${lastName}`});
            const token = jwt.sign({email: result.email, id: result._id}, secret , {expiresIn: '1hr'});
            return res.status(200).json({result: result, token});
        }catch(error){
            res.status(500).json({message:'Something went wrong'});
        }       
};


export const uploadVideo = async (req, res) => {
    if(req.body.userId){
        Video.create({videoFile: req.file.filename , userId: req.body.userId}).then(result => res.json(result))
        .catch(err => res.status(500).json({message: err.message}));
    }
    else{
        console.log(req.body.userId);
        res.status(402).json({message:"Not authorized to upload" });
    }
};

export const getVideos = async (req, res) => {
    
    Video.find().then(videos => {
        console.log(videos);    
        res.json(videos);}
    ).catch(err => res.json(err));

};

export const deleteVideo = async (req, res) => {
    try {
        const { filename, userId} = req.body; 
        const videoToDelete = await Video.findOne({ videoFile: filename });
        console.log(videoToDelete)
        if(videoToDelete.userId !== userId){
            return res.status(402).json({ message: 'Not authorized to delete' });
        }
        if (!videoToDelete) {
            return res.status(404).json({ message: 'Video not found' });
        }
        await Video.deleteOne({ videoFile: filename });

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};