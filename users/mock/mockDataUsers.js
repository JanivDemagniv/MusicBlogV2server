const User = require("../models/mongodb/User");

const mockUsers = [
    {
        userName: 'tunaparkinglot',
        password: 'abcD1122!',
        email: 'tuna@tuna.co.il',
        name: {
            first: 'itay',
            middle: '',
            last: 'zvulon'
        },
        profilePic: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/%d7%90%d7%99%d7%aa%d7%99_%d7%96%d7%91%d7%95%d7%9c%d7%95%d7%9f_%d7%98%d7%95%d7%a0%d7%94.jpg',
            alt: 'profilePicture'
        },
        isAdmin: true,
        isCreator: true
    },
    {
        userName: 'lil d dave',
        password: 'bbccAA1212!',
        email: 'lildicky@dicky.com',
        name: {
            first: 'david',
            middle: 'andrew',
            last: 'burd'
        },
        profilePic: {
            url: 'https://www.heyalma.com/wp-content/uploads/2020/03/lil-dicky.jpg',
            alt: 'profilelildicky'
        },
        isAdmin: false,
        isCreator: true
    },
    {
        userName: 'the robert of the zepplin',
        password: 'abaB332211!',
        email: 'robert@plant.com',
        name: {
            first: 'robert',
            middle: 'anthony',
            last: 'plant'
        },
        profilePic: {
            url: 'https://townsquare.media/site/295/files/2019/05/plant.jpg',
            alt: 'profilepic'
        },
        isAdmin: false,
        isCreator: false
    },

]

const createUserMockData = async () => {
    let users = await User.find();

    if (users.length == 0) {
        mockUsers.forEach(async (mockUser) => {
            await createUser(mockUser);
        });
        console.log(chalk.blue('users mock data has been created'));

        return
    };

    return
};

module.exports = createUserMockData;