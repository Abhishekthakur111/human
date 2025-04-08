const db = require("../../models");
const helper = require("../../helper/helper");
module.exports = {
create_Prompt: async (req, res, next) => {
    try {
      const data = await db.prompt.create({
        text: req.body.text,
      });

      req.flash("success", "Prompt added successfully");
      res.redirect("/prompt");
    } catch (error) {
      next(error);
    }
},
get_Prompt: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const { count, rows } = await db.prompt.findAndCountAll({
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      const totalPages = Math.ceil(count / limit);

      res.render("prompt/promptlist.ejs", {
        title: "Prompt",
        data: rows,
        session: req.session.admin,
        currentPage: page,
        totalPages,
        limit,
      });
    } catch (error) {
      throw error;
    }
},
deletePrompt: async (req, res) => {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ success: false, message: "prompt ID is required" });
      }
      const prompt = await db.prompt.findByPk(req.params.id);
      await db.prompt.destroy({ where: { id: req.params.id } });
      return res.json({
        success: true,
        message: "prompt deleted successfully",
      });
    } catch (error) {
      throw error;
    }
},
editpage: async (req, res) => {
    try {
      const data = await db.prompt.findOne({ where: { id: req.params.id } });
      res.render("prompt/promptedit.ejs", {
        session: req.session.admin,
        title: "Edit Prompt",
        data,
      });
    } catch (error) {
      throw error;
    }
},
Promptedit: async (req, res) => {
    try {
      await db.prompt.update(
        {
          text: req.body.text,
        },
        {
          where: { id: req.params.id },
        }
      );
      req.flash("success", "Prompt updated successfully");
      res.redirect("/prompt");
    } catch (error) {
      throw error;
    }
},
addPrompt: async (req, res) => {
    try {
      res.render("prompt/promptadd", {
        session: req.session.admin,
        title: "Add Prompt",
      });
    } catch (error) {
      throw error;
    }
},
promtView: async (req, res) => {
        try {
          const data = await db.prompt.findOne({
            where: { id: req.params.id },
    
          });
 
          res.render("prompt/promtview.ejs", {
            session: req.session.admin,
            data,
            title: 'Promt Details',
          });
        } catch (error) {
          throw error
        }
},
};
