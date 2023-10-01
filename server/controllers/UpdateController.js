import getPrismaInstance from '../utils/PrismaClient.js'


export const updateUser = async (req, res, next) => {
    try {
        const { name, about, isPrivate, id, email, profilePicture } = req.body;

        const prisma = getPrismaInstance();
        const data = await prisma.user.update({
            where: {
                id, email
            },
            data: {
                name, about, isPrivate, profilePicture
            }
        })
        console.log(data)
        res.status(200).json({ data })
    } catch (err) {
        console.log(err)
    }
}