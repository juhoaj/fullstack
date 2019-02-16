const dummy = (blogs) => {
    return 1
}

const totalLikes = function(blogs) {
    return blogs.reduce((summa, bloggaus) => summa + bloggaus.likes, 0) || 0
} 

module.exports = {
    dummy, 
    totalLikes
}