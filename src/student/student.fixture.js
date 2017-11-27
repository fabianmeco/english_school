module.exports = {
    post:{
        student:{
            id: 1,
            fullname: "Alberto Gonzales",
            cid: "1094533533",
            birthday: "1990-03-21",
            phone_number: "3205654335",
            email: "esuncorreo@domain.com",
            address: "Calle falsa 123"
        },
        student2:{
            id: 2,
            fullname: "Alberto Moreno",
            cid: "1094533534",
            birthday: "1990-03-21",
            phone_number: "3205654335",
            email: "esuncorreo@domain.com",
            address: "Calle falsa 123"
        },
        wrong_student:{
            id: 2,
            fullname: "Alberto Gonzales",
            cid: 1094533533,
            birthday: "1990-03-21",
            phone_number: "320565433",
            email: "esuncorreo@domain.com",
            address: "Calle falsa 123"
        },
        wrong_student_email:{
            id: 3,
            fullname: "Alberto Gonzales",
            cid: "1094533532",
            birthday: "1990-03-21",
            phone_number: "3205654333",
            email: "@domain.comand",
            address: "Calle falsa 123"
        },
        wrngflds_student_email:{
            id: 4,
            fullname: "Alberto Gonzales",
            birthday: "1990-03-21",
            phone_number: "3205654333",
            email: "@domain.comand",
            address: "Calle falsa 123"
        }
    },
    put:{
        student:{
            fullname: "Alberto Gonzales",
            cid: "1094533533",
            birthday: "1990-03-05",
            phone_number: "3205654335",
            email: "erauncorreo@domain.com",
            address: "Calle falsa 123"
        },
        student2:{
            fullname: "Alberto Gonzales",
            cid: "1094533533",
            birthday: "1990-03-05",
            phone_number: "3205654335",
            email: "erauncorreo@domain.com",
            address: "Calle falsa 123"
        }
    }
}