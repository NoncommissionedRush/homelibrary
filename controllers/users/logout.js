/** logout user and destroy session
 * @return {Boolean}
 */
const logout = async (req, res) => {
  new Promise((resolve) => {
    req.session.destroy((err) => {
      if (err) {
        resolve(false);
      }
      res.clearCookie("qid");
      resolve(true);
    });
  }).then((result) => {
    res.send(result);
  });
};

export default logout;
