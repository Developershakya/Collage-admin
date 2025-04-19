const locationService = require("../services/locationService");

const createLocation = async (req, res) => {
  try {
    const location = await locationService.createLocation(req.body);
    res.status(201).json({ message: "location is created" }, location);
  } catch (error) {
    console.error("❌ Error creating location:", error);

    // if (error.name === "ValidationError") {
    //   return res
    //     .status(400)
    //     .json({ message: "Validation Error", error: error.message });
    // }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const updated = locationService.updateLocation(
      req.params.id,
      req.body
    );
    if (!updated)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteLocation = async (req, res) => {
  try {
    const location = locationService.deleteLocation(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLocation = async (req, res) => {
  try {
    const location = await locationService.getAllLocation();
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateLocation,
  createLocation,
  deleteLocation,
  getAllLocation,
};
