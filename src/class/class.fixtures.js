module.exports = {
    rooms:[{},{}],
    teachers: [{},{}],
    post:{
        newclass:{
            room: 1,
            teacher: 1,
            date: "2017-11-30 10:00"            
        },
        classNoExistRoom:{
            teacher: 1,
            room: 666,
            date: "2017-11"
        },
        classSameRoomAndHour:{
            teacher: 2,
            room: 1,
            date: "2017-11-30 10:00"
        },
        classSameTeacherHour:{
            teacher: 1,
            room: 2,
            date: "2017-11-30 10:00"
        },
        classPastSchedule:{
            teacher: 1,
            room: 2,
            date: "2016-11-30 10:00"
        },
        classOnHoliday:{
            teacher: 2,
            room:  2,
            date: "2017-12-08 10:00"
        },
        classWrongFormat:{
            teacher: "1",
            room: 2,
            date: "2017-12-08 10:00"
        },
        classWithoutRequired:{
            teacher: 1            
        },
        classWrongHour:{
            teacher: 1,
            room: 2,
            date: "2017-12-08 6:00 AM"
        },
        classNoRegTeacher: {
            teacher: 1111234,
            room:1,
            date:  "2017-11-30 6:00 AM"
        }
        
    },
    put:{
        classRight:{
            teacher:3,
            room: 2
        },

    }
}