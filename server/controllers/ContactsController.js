import getPrismaInstance from "../utils/PrismaClient.js";

export const getListContacts = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const prisma = getPrismaInstance();
        const listContacts = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                sentMessages: {
                    include: {
                        receiver: true
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                },
                receivedMessages: {
                    include: {
                        sender: true
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                },
            }
        });
        const allUsers = [];
        const uniqueIds = new Set();

        listContacts.sentMessages.length && [listContacts.sentMessages].flat(1).forEach((message) => {
            if (!uniqueIds.has(message.receiver.id)) {
                uniqueIds.add(message.receiver.id)
                allUsers.push(message.receiver)
            }
        })
        listContacts.receivedMessages.length && [listContacts.receivedMessages].flat(1).forEach((message) => {
            if (!uniqueIds.has(message.sender.id)) {
                uniqueIds.add(message.sender.id)
                if (message.messageStatus === "read") {
                    allUsers.push({ ...message.sender, unSeen: 0 })
                } else {
                    allUsers.push({ ...message.sender, unSeen: 1 })
                }
            } else {
                const existingUser = allUsers.find((u) => u.id == message.sender.id);
                if (existingUser && message.messageStatus !== "read") {
                    existingUser.unSeen += 1
                }
            }

        })



        res.status(200).json({ list: allUsers })
    } catch (error) {
        console.log("error", error);
        next();
    }
}