import getPrismaInstance from "../utils/PrismaClient.js";
import { generateToken04 } from '../utils/TokenGenerator.js'

export const checkUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ message: 'email required', status: false })
        }
        const prisma = await getPrismaInstance();
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.json({ message: 'email not found', status: false });
        } else {
            return res.json({ message: 'email found', status: true, data: user })
        }
    } catch (err) {
        next(err)
    }
}

export const onBoardCheck = async (req, res, next) => {
    try {
        const { email, name, about, profilePicture, isPrivate } = req.body;
        if (!email || !name || !profilePicture) return res.json({ message: 'invalid req body' })
        const prisma = await getPrismaInstance();

        const data = await prisma.user.create({
            data: {
                email,
                name,
                about,
                profilePicture,
                isPrivate,
            }
        })
        // console.log({ email, name, about, image ,id })

        if (data) res.json({ message: "data added", status: true, data })
        else res.json({ message: "data not added", status: false })
    } catch (err) {
        console.log('error starting')
        next(err)
    }
}


export const getContacts = async (req, res, next) => {
    try {
        const { type, email, userId } = req.body;
        const prisma = await getPrismaInstance();
        if (!type) res.json({ message: "type required" });
        if (type == "manual" && !email) res.json({ message: "invalid email" });
        if (type == "manual") {
            const user = await prisma.user.findUnique({ where: { email: email } });
            if (!user) {
                return res.json({ message: 'email not found', status: false });
            } else {
                return res.json({ message: 'email found', status: true, data: user })
            }
        }
        if (type == "auto") {
            const users = await prisma.user.findMany({
                orderBy: { name: 'asc' },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    isPrivate: true,
                    about: true,
                    profilePicture: true,
                },
                where: {
                    NOT: {
                        id: userId
                    }
                }
            }
            )
            const finalUsers = users.filter((u) => {
                return u.isPrivate == false && u.id !== userId;
            })
            if (!users) {
                return res.json({ message: 'error while fetching', status: false });
            } else {
                return res.json({ message: 'fetched data successfully', status: true, data: finalUsers })
            }
        }
    } catch (error) {
        console.log(error)
    }
}



export const generateToken = async (req, res, next) => {
    try {
        const appID = parseInt(process.env.ZEGO_APP_ID)
        const serverSecret = process.env.ZEGO_SERVER_SECRET;
        const { userId } = req.params;
        const effectiveTime = 3000;
        const payload = ""
        if (appID && serverSecret && userId) {
            const token = await generateToken04(appID, userId, serverSecret, effectiveTime, payload);
            console.log(token)
            console.log("working")
            res.status(200).json({ token });
        }

    } catch (err) {
        console.log(err);
        next()
    }
}