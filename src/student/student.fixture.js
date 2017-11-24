module.exports = {
    post:{
        student:{
            fulname: "Alberto Gonzales",
            cid: "1094533533",
            birthday: "1990-03-21",
            phone_number: "3205654335",
            email: "esuncorreo@domain.com",
            address: "Calle falsa 123"
        },
        wrong_student:{
            fulname: "Alberto Gonzales",
            cid: 1094533533,
            birthday: "1990-03-21",
            phone_number: "320565433",
            email: "esuncorreo@domain.com",
            address: "Calle falsa 123"
        },
        wrong_student_email:{
            fulname: "Alberto Gonzales",
            cid: "1094533532",
            birthday: "1990-03-21",
            phone_number: "3205654333",
            email: "@domain.comand",
            address: "Calle falsa 123"
        },
        wrngflds_student_email:{
            fulname: "Alberto Gonzales",
            birthday: "1990-03-21",
            phone_number: "3205654333",
            email: "@domain.comand",
            address: "Calle falsa 123"
        }
    }
}