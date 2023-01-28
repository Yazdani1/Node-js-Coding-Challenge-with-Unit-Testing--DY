const Player = require("../model/player");
const ObjectId = require("mongoose").Types.ObjectId;


exports.createPlayerList = async (req, res) => {
  const { name, jerseyNumber } = req.body;

  try {
    if (!name) {
      return res.status(422).json({ error: "please add palyer name" });
    }

    if (!jerseyNumber) {
      return res.status(422).json({ error: "please add palyer jersey number" });
    }

    const alreadyExist = await Player.findOne({ jerseyNumber });

    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "jersey number already exit. try a new one" });
    }

    const playerDetails = Player({
      name,
      jerseyNumber,
      postedBy: req.user,
    });

    const savePlayerList = await Player.create(playerDetails);

    res.status(201).json(savePlayerList);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// to get players

exports.getPlayers = async (req, res) => {
  try {
    const playerlists = await Player.find({ postedBy: req.user._id })
      .populate("postedBy", "teamname _id")
      .sort({
        date: -1,
      });

    res.status(200).json(playerlists);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// to delete player

exports.deletePlayer = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };

    const singlePlayer = await Player.findById(deleteQuery);

    if (!singlePlayer) {
      return res.status(400).json({ error: "Player could not found" });
    }

    if (req.user._id === singlePlayer.postedBy._id.toString()) {
      const deletePlayer = await Player.findByIdAndDelete(deleteQuery);
      res.status(200).json(deletePlayer);
    } else {
      return res
        .status(422)
        .json({ error: "You can't delete other users player" });
    }

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
