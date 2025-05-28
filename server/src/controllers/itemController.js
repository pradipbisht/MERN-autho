const Item = require("../models/Item");

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const imagePaths = req.files.map((files) => files.path);

    const item = new Item({
      ...req.body,
      images: imagePaths,
      listedBy: req.user.id,
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("listedBy");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("listedBy");
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
