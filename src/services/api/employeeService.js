const { employees } = require("../../models");
const ApiError = require("../../errors/api/apiError");
const { sequelize , Op } = require("sequelize");
const fs = require('fs');

class EmployeeService {
  async getAll(query) {
    try {
      
      const where = {};
      if (query.firstName) {
        where.first_name = {
          [Op.iLike]: `%${query.firstName.trim()}%`,
        };
      }
      if (query.lastName) {
        where.last_name = {
          [Op.iLike]: `%${query.lastName.trim()}%`,
        };
      }
      if (query.username) {
        where.username = {
          [Op.iLike]: `%${query.username.trim()}%`,
        };
      }

      const options = {
        attributes: ["id", "first_name","last_name", "username" , "email"],
        page: query.page || 1, // Default 1
        paginate: query.perPage || 1, // Default 25
        order: [["created_at", "DESC"]],
        where,
      };

      const { docs, pages, total } = await employees.paginate(options);
     
      return { 
        docs , 
        pages , 
        total,
        perPage : query.perPage || 1
    };
    } catch (err) {
      throw new ApiError(err.message, 400);
    }
  }

  async store(req) {
    try {
      let data = await employees.create(req);
      return data;
    } catch (err) {
      console.log(err.name);
      throw new ApiError(err.message, 400);
    }
  }

  async update(param, body) {
    try {
      let data = await employees.findByPk(param);

      if (data == null) {
        throw new ApiError("Data not found", 422);
      }

      return data.update(body);
    } catch (err) {
      throw new ApiError(err.message, err.statusCode);
    }
  }

  async delete(param) {
    try {
      let data = await employees.findByPk(param);

      if (data == null) {
        throw new ApiError("Data not found", 422);
      }

      if (fs.existsSync('src/public/storage/'+data.image)) {
        fs.unlink('src/public/storage/'+data.image , (err) => {
          if(err) {
            console.log(err);
          }
        });
      }

      return data.destroy();
    } catch (err) {
      throw new ApiError(err.message, err.statusCode);
    }
  }

  async getDetail(id) {
    try {
      const data = await employees.findOne({ where: { id : id }});

      return data;
    } catch (err) {
      console.log(err);
      throw new ApiError(err.message, 400);
    }
  }

  async upload(param, body , file) {
    try {
      let data = await employees.findByPk(param);

      if (data == null) {
        throw new ApiError("Data not found", 422);
      } 
      
      if (fs.existsSync('src/public/storage/'+data.image)) {
        fs.unlink('src/public/storage/'+data.image , (err) => {
          if(err) {
            console.log(err);
          }
        });
      }


    
      body.image = file.filename;
    
      return data.update(body);
    } catch (err) {
      throw new ApiError(err.message, err.statusCode);
    }
  }
}

module.exports = EmployeeService;
