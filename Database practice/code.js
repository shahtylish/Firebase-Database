//save data to firebase database:
function saveData() {
    var name = document.getElementById("name");
    var age = document.getElementById("age");
    var key = Math.round(Math.random() * 100);

    if (name.value == "" && age.value == "") {
        alert("Doesn't create empty data!");
    }
    else {
        var profile = {
            name: name.value,
            age: age.value
        };

        firebase.database().ref('Students/Profile/' + key).set(profile);
        name.value = null;
        age.value = null;

        console.log(key);
    }
}

//get data from firebase database:
function getData() {
    var editKey = document.getElementById("editKey");
    var editName = document.getElementById("editName");
    var editAge = document.getElementById("editAge");
    var getID = document.getElementById("getID");

    if (getID.value == "") {
        alert("Enter Unique ID");
    }
    else {
        document.getElementById("editDiv").style.display = 'block';
        firebase.database().ref('Students/Profile/' + getID.value).once('value', function (data) {
            var getText = data.val();
            editKey.value = getID.value;
            editName.value = getText.name;
            editAge.value = getText.age;
            getID.value = null;
        });

        firebase.database().ref('Students/Profile/' + getID.value).once('value', function (data) {
            console.log(data.val());
        });
    }
}

//get all data from firebase database:
function getAllData() {
    var textArea = document.getElementById("textArea");
    firebase.database().ref('Students/Profile').once('value', function (data) {
        console.log(data.val());
    });
}

//remove data from firebase database:
function deleteData() {
    var uniq = document.getElementById("uniqNo");
    if (uniq.value == "") {
        alert("Enter Unique ID!");
    }
    else {
        firebase.database().ref('Students/Profile/' + uniq.value).remove();
        uniq.value = null;
    }
}

//edit data from firebase database:
function editData() {
    var editKey = document.getElementById("editKey");
    var editName = document.getElementById("editName");
    var editAge = document.getElementById("editAge");

    var profile = {
        name: editName.value,
        age: editAge.value
    };

    firebase.database().ref('Students/Profile/' + editKey.value).set(profile);

    document.getElementById("editDiv").style.display = 'none';
}


