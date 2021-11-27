const router = require("express").Router();
const { User } = require("../../models");

// THIS ROUTE TO AWAIT USER LOGIN BEFORE POSTING
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// THIS ROUTE FOR INCORRECT / INSUFFICIENT USER DATA WHEN POSTING
// IF NO VALID PASSWORD OR USERNAME, THEN ERROR
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
        res
            .status(400)
            .json({ message: "INCORRECT LOGIN; Try again!" });
    return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
        res
            .status(400)
            .json({ message: "INCORRECT LOGIN; Try again!" });
    return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: "Successful login! ✨" });
    });

    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGOUT ROUTE
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
    });
    } else {
        res.status(404).end();
    }
});

module.exports = router;