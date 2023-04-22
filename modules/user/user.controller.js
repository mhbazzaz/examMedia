const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const userController = {
  async login(req, res) {
    try {
      const { phone, password } = req.body;
      const user = await userService.getUserByPhoneNumber(phone);
      if (!user) {
        return res.status(403).json({
          message: "Invalid ceridential",
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(403).json({
          message: "Invalid ceridential",
        });
      }

      const token = jwt.sign({ phone: user.phone }, process.env.SECRET_KEY, {
        expiresIn: parseInt(process.env.TOKEN_EXPIRE_TIME),
      });

      //jwt refresh token
      const { refreshToken } = req.body;

      if (!refreshToken) {
        const expiredAt = new Date();
        expiredAt.setSecond(
          expiredAt.getSecond() + parseInt(process.env.JWT_REFRESH_EXPIRE_TIME)
        );
        const _token = uuid();
        const userJwt = req.user;
        const createdToken = await userService.createRefresh({
          token: _token,
          expiryDate: expiredAt,
          user_id: userJwt.id,
        });
        res.send({
          access_token: token,
          refresh_token: createdToken,
        });
      }
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(parseInt(id));
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getUserByPhoneNumber(req, res) {
    try {
      const { phone } = req.params;
      const user = await userService.getUserByPhoneNumber(phone);
      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      const allUser = await userService.getAll();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },

  async register(req, res) {
    try {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userService.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).send("Registered!");
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  },
  async updated(req, res) {
    try {
      const { id } = req.params;
      const updated = await userService.update(parseInt(id), req.body);
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await userService.delete(parseInt(id));
      res.status(205).json(deleted);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getUserWallet(req, res) {
    try {
      const { id } = req.params;
      const wallet = await userService.getWalletBalance(id);
      res.status(200).json(wallet);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async increaseWalletBalance(req, res) {
    try {
      const { user_id, amount } = req.body;
      const wallet = await userService.increaseWallet({ user_id, amount });
      res.status(200).json(wallet);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },
  async getAllUserOrders(req, res) {
    try {
      const { id } = req.params;
      const orders = await userService.getAllUserOrders(id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(403).json({
        error: true,
        message: error.message,
      });
    }
  },

  async RefreshJwtToken(req, res) {
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
      const refreshToken = await userService.findRefresh(token);
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
      }

      if (refreshToken.verifyExpiration(refreshToken)) {
        const deleted = await userService.deleteRefresh(refreshToken.id);
        res.status(403).json({
          message:
            "Refresh token was expired. Please make a new signin request",
        });
      }

      let newAccessToken = jwt.sign(
        { id: refreshToken.user_id },
        config.secret,
        {
          expiresIn: config.jwtExpiration,
        }
      );

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },
};

module.exports = userController;
