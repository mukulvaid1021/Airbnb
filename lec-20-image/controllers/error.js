exports.pagenotfound = (req, res, next) => {
  res
  .status(404)
  .render('404',
    {
      pageTitle: '404 Page is not found in Airbnb',
      currentPage: "404",
      isLoggedIn: req.isLoggedIn,
       user: req.session.user,
    });
};