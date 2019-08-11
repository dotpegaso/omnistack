const Dev = require("../models/Dev");

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { id } = request.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(id);

    if (!targetDev)
      return response.status(400).json({ error: `DEV ${id} not exists` });

    loggedDev.dislikes.push(targetDev._id);
    loggedDev.save();

    return response.json(loggedDev);
  }
};
