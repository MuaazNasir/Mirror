import getPrismaInstance from "../utils/PrismaClient.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { from, to, message, type } = req.body;
        console.log({ from, to, message, type })
        const prisma = getPrismaInstance();
        const getUser = onlineUsers.get(to);
        if (from && to && message) {
            const newMessage = await prisma.messages.create({
                data: {
                    sender: { connect: { id: from } },
                    receiver: { connect: { id: to } },
                    messageStatus: getUser ? "delivered" : "sent",
                    type: type,
                    message,
                },
                include: { sender: true, receiver: true },
            });
            console.log('message sent',newMessage)
            return res.status(201).json({ message: newMessage });
        } else {
            return res.status(404).json({ message: "from, to, message required" });
        }
    } catch (error) {
        console.log('error starting', error);
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.params;
        const prisma = getPrismaInstance();
        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {
                        receiverId: from,
                        senderId: to
                    },
                    {
                        receiverId: to,
                        senderId: from
                    }
                ]
            },
            orderBy: { id: "asc" }
        });

        let unreadMessages = [];

        messages.forEach((message, index) => {
            if (message.messageStatus !== "read" && message.senderId == to) {
                messages[index].messageStatus = "read";
                unreadMessages.push(message.id);
            }
        })

        await prisma.messages.updateMany({
            where: { id: { in: unreadMessages } },
            data: { messageStatus: "read" }
        });

        // console.log(messages)

        res.status(201).json({ messages })


    } catch (error) {
        console.log(error)
    }
} 
