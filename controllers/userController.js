function loadHomepage(req, res) {
    res.render("index");
}

function loadRegisterPage(req, res) {
    res.render("register");
}

function loadLoginPage(req, res) {
    res.render("login");
}

module.exports = {
    loadHomepage,
    loadRegisterPage,
    loadLoginPage
};