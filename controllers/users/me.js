/** return user if there is userId in session
 * @return {Object} user
 */
const me = async (req, res) => {
  const user = res.locals.user;
  if (user) {
    res.send(user);
  } else {
    res.send(undefined);
  }
};

export default me;
