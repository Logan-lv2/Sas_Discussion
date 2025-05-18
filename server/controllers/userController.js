const User = require('../models/User');

// @desc    Récupérer les infos utilisateur
// @route   GET /api/users/me
// @access  Privé
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Changer le thème
// @route   PUT /api/users/theme
// @access  Privé
exports.changeTheme = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { themePreference: req.body.theme },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Changer le mot de passe
// @route   PUT /api/users/password
// @access  Privé
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { currentPassword, newPassword } = req.body;
    
   
    if (!(await user.correctPassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Mot de passe actuel incorrect'
      });
    }
    
 
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Mot de passe mis à jour avec succès'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};