const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const {generateAccessToken,generateRefreshToken} = require('../utility/security');


let refreshTokens = [];


const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '15m' }
    );
};


const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '7d' }
    );
    refreshTokens.push(refreshToken);
    return refreshToken;
};

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'Utilisateur enregistré' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({ user,accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

const refresh = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Refresh token invalide' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateAccessToken(decoded);
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error("Refresh error", error);
        res.status(403).json({ message: 'Token expiré ou invalide' });
    }
};


const logout = (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(200).json({ message: "Déconnexion réussie" });
};

// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

module.exports = {
    register,
    login,
    refresh,
    logout,
    updateUser
};
