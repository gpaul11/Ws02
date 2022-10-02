var employees=[];
var departments=[];
var fs = require("fs");
module.exports.initialize=()=>{
    return new Promise((resolve, reject) => {
        fs.readFile('./data/employees.json',(err,data)=>{
            if (err) reject("unable to read file");
            employees = JSON.parse(data);
            fs.readFile('./data/departments.json',(err1,data1)=>{
                if (err1) reject("unable to read file");
                departments=JSON.parse(data1);
                resolve();
        });
    });
});
}

module.exports.getAllEmployees=function(){
    return new Promise((resolve, reject) => {
        if(employees.length==0){
            reject("no results returned");
        }
        resolve(employees);
    })
}

module.exports.getManagers=function(){
    return new Promise((resolve, reject) => {
        let managers=[];
        for(i in employees){
            if(employees[i]["isManager"]==true)
            managers.push(employees[i]);
        }
        if(managers.length==0){
            reject("no results returned");
        }
        resolve(managers);
    })
}

module.exports.getDepartments=function(){
    return new Promise((resolve, reject) => {
        if(departments.length==0){
            reject("no results returned");
        }
        resolve(departments);
    })
}
