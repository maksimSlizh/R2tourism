// server/src/controllers/placeController.js

exports.getAllPlaces = async (req, res, next) => {
  try {
    const places = [{ id: '1', name: 'Hotel A', description: 'This is a hotel' }];
    res.status(200).json({ data: places });
  } catch (error) {
    next(error);
  }
};

exports.getPlaceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const place = { id, name: 'Hotel A', description: 'This is a hotel' };
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(200).json({ data: place });
  } catch (error) {
    next(error);
  }
};
