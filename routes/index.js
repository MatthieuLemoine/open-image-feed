

exports.index = function(req, res){
    res.render('index');
};

exports.partials = function (req, res) {
    res.render('partials/home');
};

exports.dialog = function (req, res) {
    res.render('partials/posts/dialog');
};

exports.loginPartial = function (req, res) {
    res.render('partials/users/login');
};

