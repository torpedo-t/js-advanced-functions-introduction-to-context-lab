// returns Javascript object with keys
// loads array elements into corresponding object properties firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents
// additionally, initialize empty arrays on the properties timeInEvents, timeOutEvents
function createEmployeeRecord(ary){
    let record
    return record = { 
        firstName: ary[0],
        familyName: ary[1],
        title: ary[2],
        payPerHour: ary[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

// returns an array of objects 
// converts each nested array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arys){
    return arys.map(createEmployeeRecord)
}

// returns the employee record
// add an object with keys to the timeInEvents array on the record Object:
// type set to "TimeIn", hour derived from the argument, date derived from the argument
function createTimeInEvent(obj, dateStamp){
    obj.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return obj
}

function createDSObj(getType, dateStamp) {
    // console.log(dateStamp)
    // console.log(dateStamp.slice(0,10))
    // console.log(parseInt(dateStamp.slice(-3)))
    // console.log(parseInt(dateStamp.slice(-4)))
    // console.log(parseInt(dateStamp.slice(-5)))
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

// returns the employee record
// add an object with keys to the timeOutEvents array on the record object:
// type set to "TimeOut", hour derived from the argument, date derived from the argument
function createTimeOutEvent(obj, dateStamp){
    obj.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return obj
}

// returns hourse worked, an Integer
// given a date, find the number of hours elapse between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(obj, dateYMD){
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

// returns pay owed, an Integer
// using hoursWorkedOnDate, multiply the hours by the record's payRate to determine the amount owed.
function wagesEarnedOnDate(obj, dateYMD){

    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

// pay owed for all dates
// using wagesEarnedOnDate, accumulate the values of all dates worked by the employee in the record. 
// amount should be returned as an integer
// you will need to find the available dates somehow....
function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

// returns matching record or undefined
// test the firstName field for a match withe the firstName argument
function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((record) => record.firstName === firstName)
}

// returns sum of pay owed to all employees for all dates as an integer
// using allWagesFor, accumulate the value of all dates worked by the employee in the record used as context
function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    console.log(allPay)
    return allPay.reduce((acc, cv) => acc + cv)
    
}




// what is the job of this function? is it supposed to return a string, modify an array?

// each function needs a single, clear purpose...............................................

// what data/info does it need in order to do it's job? what arguments, parameters is necessary?

// what am i expecting as a return value? Should be pretty distinct