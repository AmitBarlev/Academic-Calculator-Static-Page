function fieldValidation(textBox){
    if (textBox.value === "" || textBox === "") {
        textBox.style.borderColor = "red";
        $(textBox).popover('show');
    }
    else {
        $(textBox).popover('hide');
        textBox.style.borderColor = "green";
    }
}

function formValidation(){
    var fields = document.getElementsByClassName("personal").length;
    var current, check = true;
    for (var index = 0; index < fields ; index++) {
        current = document.getElementsByClassName("personal")[index];
        if(current.value === "") {
            fieldValidation(current);
            check = false;
        }
    }
    if (!check)
        return;
    start();
}
function start () {
    $(".row").append("<div class=buttons>" + "<div class='col-lg-1 col-md-2 col-sm-2 col-xs-12'>" +
        "<button type='button' onclick='createNewCourses()'>Add Course</button>" + "</div>" +
        "<div class='col-lg-1 col-md-2 col-sm-2 col-xs-12'>" +
        "<button type='button' onclick='averageAux()'>Calculate Average</button>" + "</div>" +
        "<div class='col-lg-1 col-md-2 col-sm-2 col-xs-12'>" +
        "<button type='button' onclick='clearScreen()'>Clear Screen</button>" + "</div></div>");
    $(".start-btn").remove();
}
function createNewCourses() {
    if (!$(".table").length) {
        $(".courses").append("<div class='course-single col-lg-1'><form>" +
            "<div>Course Name:<br><input class='course-name'><br></div>" +
            "<div>Points:<br><input type='number' class=points-input><br></div>" +
            "<div>Grade:<br><input type='number' class='grades-input'></div></form></div>");
    }
}
function averageAux () {
    var courses;
    courses = createCoursesArray();
    if (courses.length > 0) {
        printTables(courses);
        $(".container-fluid").append("<div><h2 class='output'>Your Average is : " + calculateAverage(courses) + "</h2>");
    }
}
function calculateAverage (courses){
    var average = 0;
    var totalPoints = calculateTotalPoints(courses);
    for (var index = 0; index < courses.length ; index++) {
        average += ((courses[index].grade)*(courses[index].points))/totalPoints;
    }
    return (average);
}
function readOnlyInputs() {

}
function createCoursesArray () {
    var courses = [];
    var course = { name:"",points:"",grade:""};
    var numOfCourses = document.getElementsByClassName("grades-input").length;
    for (var index = 0; index < numOfCourses; index++) {
        course.name = document.getElementsByClassName("course-name")[index].value;
        course.points = parseInt(document.getElementsByClassName("points-input")[index].value);
        course.grade = parseInt(document.getElementsByClassName("grades-input")[index].value);
        if (checkCourse(course)) {
            courses.push({name: course.name, points: course.points, grade:course.grade});
        }
    }
    return (courses);
}
function calculateTotalPoints(courses){
    var sum = 0;
    for (var index = 0; index < courses.length; index++) {
        sum += courses[index].points;
    }
    return(sum);
}
function printTables (courses) {
    $(".course-single").remove();
    $(".container-fluid").append("<div class = table><table><thead ><tr>" +
        "<th>Course Name</th>" + "<th>Points</th>"+
        "<th>Grade</th></tr></thead>" + "<tbody class='table-body'></tbody>"+ "</table></div>");

    for (var index = 0; index < courses.length; index++) {
            $(".table-body").append("<tr><td class='course-name-table'>" + courses[index].name + "</td>" +
                "<td class = 'points-table'>" + courses[index].points + "</td>" +
                "<td class ='grades-table'>" + courses[index].grade + "</td></tr>");
    }
}
function clearScreen() {
   $(".course-single").remove();
   $(".table").remove();
   $(".output").remove();
}
function checkCourse(course) {
    if (isName(course.name) && isNumber(course.points) && isNumber(course.grade)) {
        return (true);
    }
    return(false);
}
function isName(name) {
    if (name !== "") {
        return(true);
    }
    return(false);
}
function isNumber(num) {
    if (0 > num || num > 100) {
        return(false);
    }
        return(true);
}