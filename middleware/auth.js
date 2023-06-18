const auth = async (req,res,next) => {
    const userId = req.session?.userId;
    if(userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = auth;