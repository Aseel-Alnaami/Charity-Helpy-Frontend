let data = [];

fetch("data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        data = jsonData;
        fillTable();
    })
    .catch(function(error) {
        console.error('Error fetching the JSON data:', error);
    });

function fillTable() {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let odata of data) {
        out += `<tr>
            <td>${odata.id}</td>
           
            <td>${odata.name}</td>
            <td>${odata.birthday}</td>
            <td>${odata.age}</td>
            <td>${odata.email}</td>
            <td>${odata.mobile}</td>
        </tr>`;
    }
    placeholder.innerHTML = out;
}

function showGmailUsers() {
    const gmailUsers = data.filter(odata => odata.email.includes("gmail")).map(odata => ({
        name: odata.name,
        email: odata.email
    }));
    displayResult("Gmail Users:", gmailUsers);
}

// function showAvgAgeAbove25() {
//     const agesAbove25 = data.filter(odata => odata.age > 25).map(odata => odata.age);
//     // alert('nnnnnn');
//     const avgAgeAbove25 = (agesAbove25.reduce((acc, age) => acc + age, 0) / agesAbove25.length);
//     displayResult("Average Age Above 25:", avgAgeAbove25);
//     alert("hhhhhhhhey");

// }
function showAvgAgeAbove25() {
    fetch("data.json")
        
            const agesAbove25 = data
                .filter(odata => odata.age > 25)
                .map(odata => parseInt(odata.age));
            
            const avgAgeAbove25 = agesAbove25.reduce((acc, age) => acc + age, 0) / agesAbove25.length;
            displayResult("Average Age Above 25:", avgAgeAbove25.toFixed(2));
        }

  

// function showNonMondayBornx() {
//     function isBornOnMonday(birthday) {
//         const date = new Date(birthday.split('-').reverse().join('-'));
//         return date.getDay() === 1; // Monday is 1
//     }
//     // alert(" tessst heyyyyyyyyyyyyyy");
//     const nonMondayBorn = data.filter(odata => !isBornOnMonday(odata.birthday)).map(odata => ({
//         name: odata.name,
//         birthday: odata.birthday
//     }));
//     displayResult("Non-Monday Born:", nonMondayBorn);
// }

function showNamesStartingWithA() {
    const namesStartingWithA = data.filter(odata => odata.name.startsWith('A')).map(odata => odata.name);
    displayResult("Names Starting with A:", namesStartingWithA);
}

function showUniqueBirthdays() {
    const uniqueBirthdays = [...new Set(data.map(odata => odata.birthday))];
    displayResult("Unique Birthdays:", uniqueBirthdays);
}

function showMobilesWithZero() {
    const mobilesWithZero = data.filter(odata => odata.mobile.includes('0')).map(odata => ({
        name: odata.name,
        mobile: odata.mobile
    }));
    displayResult("Mobiles with 0:", mobilesWithZero);
}

function showWinnersAbove30() {
    const winnersAbove30 = data.filter(odata => odata.age > 30).map(odata => odata.name);
    displayResult("Winners Above 30:", winnersAbove30);
}

function showSuggestedPasswords() {
    const suggestedPasswords = data.map(odata => ({
        name: odata.name,
        password: (odata.name + odata.birthday + odata.mobile).split('').sort(() => Math.random() - 0.5).join('')
    }));
    displayResult("Suggested Passwords:", suggestedPasswords);
}

function showIdOddNumbers() {
    const idOddNumbers = data.map(odata => ({
        name: odata.name,
        winner: odata.id % 2 !== 0 ? "True" : "False"
    }));
    displayResult("ID Odd Numbers:", idOddNumbers);
}

function displayResult(title, result) {
    const output = document.querySelector("#result-output");
    let listContent = `<h2>${title}</h2><ul class="list-group">`;
    if (Array.isArray(result)) {
        result.forEach(item => {
            if (typeof item === 'object') {
                listContent += `<li  class="list-group-item" >${JSON.stringify(item, null, 2)}</li>`;
            } else {
                listContent += `<li  class="list-group-item">${item}</li>`;
            }
        });

    } else {
        listContent += `<li class="list-group-item">${result}</li>`;
    }
    listContent += '</ul>';
    output.innerHTML = listContent;
}


function showAvgScoresAbove60() {
    fetch("data.json")
    // alert("tesssst");
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(data) {
            const scoresAbove60 = data.filter(odata => odata.score > 60).map(odata => parseInt(odata.score));
            const avgScoreAbove60 = scoresAbove60.reduce((acc, score) => acc + score, 0) / scoresAbove60.length;
            displayResult("Average Score Above 60:", avgScoreAbove60);
        
}
function Top3Students() {
    fetch("data.json")
        
            const top3Students = data
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map(odata => ({
                    name: odata.name,
                    score: odata.score
                }));
            displayResult("Top 3 Students:", top3Students);
        }
        
        function showNonMondayBorn() {
            fetch("data.json")
              
                    const nonMondayBorn = data
                        .filter(odata => odata.birthday !== "Mon")
                        .map(odata => ({
                            name: odata.name,
                            birthday: odata.birthday
                        }));
        
                    displayResult("Non-Monday Born:", nonMondayBorn);
               
        }