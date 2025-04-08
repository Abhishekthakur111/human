const db = require("../../models");
const helper = require("../../helper/helper");
const bcrypt = require("bcrypt");


module.exports={
user_list: async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const offset = (page - 1) * limit;
          const { count, rows } = await db.users.findAndCountAll({
            where: {
              role: "1",
              deletedAt: null,
            },
    
            limit,
            offset,
            order: [["id", "DESC"]],
          });
    
          const totalPages = Math.ceil(count / limit);
    
          res.render("user/userlist.ejs", {
            title: "Users",
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
view: async (req, res) => {
        try {
          const view = await db.users.findOne({
            where: { id: req.params.id },
    
          });
    
          res.render("user/userview.ejs", {
            session: req.session.admin,
            view,
            title: 'User Details',
          });
        } catch (error) {
          throw error
        }
},
user_delete: async (req, res) => {
        try {
          const userId = req.params.id;
          const user = await db.users.findByPk(userId);
          await db.users.destroy({ where: { id: userId } });
          res.json({ success: true, message: "User deleted successfully" });
        } catch (error) {
          throw error;
        }
},
user_status: async (req, res) => {
        try {
          const result = await db.users.update(
            { status: req.body.status },
            { where: { id: req.body.id } }
          );
          if (result[0] === 1) {
            res.json({ success: true });
          } else {
            res.json({ success: false, message: "Status change failed" });
          }
        } catch (error) {
          throw error;
        }
},
}