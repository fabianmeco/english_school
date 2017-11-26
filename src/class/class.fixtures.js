module.exports = {
    rooms: [{
        id: 1,
        name: "AZ1",
        capacity: 5
    },
    {
        id: 2,
        name: "AY1",
        capacity: 4
    }],
    teachers: [{
        id: 1,
        fullname: "Alberto Gonzales",
        cid: "1094533533",
        birthday: "1990-03-21",
        phone_number: "3205654335",
        email: "esuncorreo@domain.com",
        address: "Calle falsa 123"
    }, {
        id: 2,
        fullname: "Alberto Moreno",
        cid: "1094533534",
        birthday: "1990-03-21",
        phone_number: "3205654335",
        email: "esuncorreo@domain.com",
        address: "Calle falsa 123"
    },
    {
        id: 3,
        fullname: "Alberto Rodriguez",
        cid: "1094533536",
        birthday: "1990-03-21",
        phone_number: "3205654335",
        email: "esuncorreo@domain.com",
        address: "Calle falsa 123"
    }],
    post: {
        newclass: {
            id: 1,
            date: "2017-11-29 10:00",
            teacher_id: 1,    
            room_id: 1                    
        },
        classNoExistRoom: {
            id: 2,
            teacher_id: 1,
            room_id: 666,
            date: "2017-11-29 11:00"
        },
        classSameRoomAndHour: {
            id: 4,
            teacher_id: 2,
            room_id: 1,
            date: "2017-12-06 10:00"
        },
        classSameTeacherHour: {
            id: 4,
            teacher_id: 1,
            room_id: 2,
            date: "2017-11-29 10:00"
        },
        classPastSchedule: {
            id: 4,
            teacher_id: 1,
            room_id: 2,
            date: "2016-11-30 10:00"
        },
        classOnHoliday: {
            id: 4,
            teacher_id: 2,
            room_id: 2,
            date: "2017-12-08 10:00"
        },
        classWrongFormat: {
            id: 4,
            teacher_id: "1",
            room_id: 2,
            date: "2017-12-08 10:00"
        },
        classWithoutRequired: {
            teacher_id: 1
        },
        classWrongHour: {
            id: 4,
            teacher_id: 1,
            room_id: 2,
            date: "2017-12-08 6:00 AM"
        },
        classNoRegTeacher: {
            id: 3,
            teacher_id: 1111234,
            room_id: 1,
            date: "2017-11-30 6:00 AM"
        }

    },
    put: {
        classRight: {
            teacher_id: 3,
            room_id: 2
        },

    }
}