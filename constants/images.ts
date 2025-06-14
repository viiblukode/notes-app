const Images = {
    settings: require('../assets/settings.png'),
    pencil: require('../assets/pencil.png'),
    clock: require('../assets/clock.png'),
    health: require('../assets/health.png'),
    serveFood: require('../assets/serve-food.png'),
    home: require('../assets/home.png'),
    add: require('../assets/add.png'),
    summary: require('../assets/summary.png'),
    headphones: require('../assets/headphones.png'),
    paper: require('../assets/paper.png'),
    book: require('../assets/book.png'),
    info: require('../assets/info.png'),
}

export type ImageName = keyof typeof Images;

export const getImage = (name: string) => {
    return Images[name as ImageName];
}