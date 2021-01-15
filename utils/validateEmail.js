const validateEmail = function(email) {
    let regex =  /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
    return regex.test(email);
}

module.exports = {validateEmail};