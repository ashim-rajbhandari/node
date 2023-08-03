class EmployeeTransformer {
    async singleData (employee) {
        return await transform(employee);
    }

    async multipleData (employee) {
        let data = [];
        for (let i = 0; i < employee.length; i++) {
          data.push(await transform(employee[i]));
        }
        return data;
    }
}

module.exports = EmployeeTransformer

const transform = async (employee) => {
    return {
        'id' : employee.id,
        'name' : employee.last_name ? employee.first_name +' '+ employee.last_name : employee.first_name,
        'username' : employee.username || null,
        'email' : employee.email || null,
    };
}