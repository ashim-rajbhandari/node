
const Service = require('../../../services/api/employeeService')
const EmployeeTransformers = require('../../../transformers/employeeTransformers')
const process = require('process')


class employeeController {

    constructor() {
        this.service = new Service();
        this.get = this.get.bind(this);  //Bind the method to the instance of the class
        this.store = this.store.bind(this); 
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.getDetail = this.getDetail.bind(this);
        this.upload = this.upload.bind(this);
        this.employeeTransformer = new EmployeeTransformers();
    }

    async get (req , res) {
        try{
           let data = await this.service.getAll(req.query);

           let value = await this.employeeTransformer.multipleData(data.docs);
           let newValue = {
            'meta' : {
                'email' : 'ash.rbd',
                'pagination' : {
                    pages : data.pages,
                    total : data.total,
                    nextUrl : process.env.APP_URL+'/employees?pages='+(1)+'&perPage='+data.perPage,
                }
            },
            'data' : value
           }
           return res.status(200).json(newValue);
        }catch(err) {
            console.log(err);
            return res.status(err.statusCode).json({ errors: err.message });
        }
    }

    async store (req , res) {
        try{
           await this.service.store(req.body);
           
           return res.status(200).json({ message: "Successful Created" });
        }catch(err) {
            return res.status(400).json({ errors: err.message });
        }
    }

    async update (req , res) {
        try{
           await this.service.update(req.params.id , req.body);
           
           return res.status(200).json({ message: "Successfully Updated" });
        }catch(err) {
            return res.status(400).json({ errors: err.message });
        }
    }

    async delete (req , res) {
        try{
           let data = await this.service.delete(req.params.id);
        
           return res.status(200).json({ message: "Successfully Deleted" });
        }catch(err) {
            return res.status(err.statusCode).json({ errors: err.message });
        }
    }

    async getDetail (req , res) {
        try{
           let data = await this.service.getDetail(req.params.id);

           let value = await this.employeeTransformer.singleData(data);
          
           let newValue = {
            'meta' : {
                'email' : 'ash.rbd',
            },
            'data' : value
           }
           return res.status(200).json(newValue);
        }catch(err) {
            console.log(err);
            return res.status(err.statusCode).json({ errors: err.message });
        }
    }

    async upload (req , res) {
        try{
        
           await this.service.upload(req.params.id , req.body , req.file);
           
           return res.status(200).json({ message: "Successfully Uploaded" });
        }catch(err) {
            return res.status(400).json({ errors: err.message });
        }
    }

}

module.exports = employeeController