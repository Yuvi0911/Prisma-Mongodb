const getJwtToken = require('../helpers/getJwtToken')

// hum token kyu generate krte h?
// jab bhi user signup krta h toh usne jo data diya h ushe hum db me save kr lete h aur data ki jo primary key hoti h, vo kuch bhi ho skti h jaise ki _id ya username jo ki unique hoti h, ushe hum token me store krva dete h. Ab hum is token me se us primary key ko extract kr k us user ki sbhi fields ko apni website me kahi bhi access kr skte h.
// aur hum token ko cookie me store krva skte h kuch time k liye jisse user ko baar baar login krne ki jrurt nhi h yadi vo token cookie me present h toh. Jab bhi token cookie se delete ho jaiye ga kuch time k baad toh user ko dobara login krne ki jrurt pdegi aur cookie ka time renew ho jaiye ga.
const cookieToken = (user, res) => {

    // getJwtToken package ki help se token generate krege aur us token me user ki id daal dege.
    const token = getJwtToken(user.id);

    // options me humne bta diya ki cookie kitne time k baad expire ho gi aur cookie ko keval http se hi manipulate kr skte h.
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    // hum response me user ka data bhejege toh hum password ko encrypt nhi kr rhe h toh hum ushe keval response me undefined set krdege isse db me koi farak nhi pdega.
    user.password = undefined;
    
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user,
    })
}

module.exports = cookieToken;