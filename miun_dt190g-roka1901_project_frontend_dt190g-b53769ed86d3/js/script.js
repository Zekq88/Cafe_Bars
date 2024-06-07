
const baseUrl = "https://roka1901-project-backend-dt190g-ht23.azurewebsites.net/api/v1/";
const beerUrl = 'https://roka1901-project-backend-dt190g-ht23.azurewebsites.net/api/v1/beers';
//var baseUrl = "http://localhost:3000/api/v1/";
//const beerUrl = "http://localhost:3000/api/v1/beers";
//const  baseUrl = "mongodb://localhost:27017/api/v1/";
//const beerUrl = "mongodb://localhost:27017/api/v1/beers"

/*headers: {
      "Accept": "*",
      "Content-Type": "application/json; charset=utf-8",
      "Credentials": "true"
    }
    */     

function fixBeers(array, element){

  for (let i = 0; i < array.length; i++) {
    const beerLink = document.createElement("a");
    beerLink.href = baseUrl + "beers/" + array[i].name;
    beerLink.innerHTML = "<b>" + array[i].name + "</b>";
    const beerDefinition = document.createElement("dd");

      if(beerDefinition !== null){
      beerDefinition.appendChild(beerLink);
      element.appendChild(beerDefinition);
      };
  };
};


async function loadBeers() {

  const res = await fetch(baseUrl + "beers", {
    method: 'GET'
  });
    
  const birData = await res.json();

  let oneKenta = [];
  let twoKenta = [];
  let threeKenta = [];
  let fourKenta = [];
  let fiveKenta = [];

  for (let i = 0; i < birData.length; i++) {
    if (birData[i].grade === ("Fem Kenta")) {
      fiveKenta.push(birData[i]);
    } else if (birData[i].grade === ("Fyra Kenta")) {
      fourKenta.push(birData[i]);
    } else if (birData[i].grade === ("Tre Kenta")) {
      threeKenta.push(birData[i]);
    } else if (birData[i].grade === ("Två Kenta")) {
      twoKenta.push(birData[i]);
    } else {
      oneKenta.push(birData[i]);
    };
  };

  const element1 = document.getElementById("oneKenta");
  const element2 = document.getElementById("twoKenta");
  const element3 = document.getElementById("treKenta");
  const element4 = document.getElementById("fourKenta");
  const element5 = document.getElementById("fiveKenta");

  fixBeers(oneKenta,element1);
  fixBeers(twoKenta,element2);
  fixBeers(threeKenta,element3);
  fixBeers(fourKenta,element4);
  fixBeers(fiveKenta, element5); 
};
    
async function beerGrades(){
    const res = await fetch(baseUrl + "grades", {
    method: 'GET'
    });
    
    const gradeData = await res.json();
  
    const gradeDropdown = document.querySelector("#birGrades");
    const gradeDropdown2 = document.querySelector("#birGradesUp");
  
    for (let i = 0; i < gradeData.length; i++) {
      let option = document.createElement("option");
      let option2 = document.createElement("option");
      option.text = gradeData[i][i];
      option2.text = gradeData[i][i];
      gradeDropdown.appendChild(option);
      gradeDropdown2.appendChild(option2);
    };
};
    
    
async function deleBeer(){
  try{
    const id = document.getElementById("birNameDel").value;
    const res = await fetch(beerUrl, {
    method: 'DELETE',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(
      {
        "name": id
      }
    )});
    
  if (!res.ok) {
    
    if (res.status === 400) {
      console.log("Bad request. Please check your input.");
      alert("Bad request. Please check your input.");
    } else if (res.status === 401) {
      console.log("Unauthorized. You are not allowed to delete beer.");
      alert("Unauthorized. You are not allowed to delete beer.");
    } else {
      console.log('Failed to deleted from beer!' + res.status);
      throw new Error('Failed to deleted from beer!' + res.status);
    };
  } else {
      
      console.log("Beer deleted from the Beer Bible!");
      alert("Beer deleted from the Beer Bible!");
  };
    } catch (error){
    alert("Error: " + error);
    };
};
    
async function upBeer(){
  console.log("upBeer()");
  try{
    const id = document.getElementById("birNameUp").value;
    const res = await fetch(beerUrl, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(
      {
        "name": document.getElementById("birNameUp").value,
        "type": "",
        "information": "",
        "grade": document.getElementById("birGradesUp").value
      }
  )});
    
  console.log(res.body);
  console.log(res);
      
  if (!res.ok) {
    
    if (res.status === 400) {
      console.log("Bad request. Please check your input.");
      alert("Bad request. Please check your input.");
    } else if (res.status === 401) {
      console.log("Unauthorized. You are not allowed to Updated a beer.");
      alert("Unauthorized. You are not allowed to Updated a beer.");
    } else {
    
      console.log('Failed to Updated beer!');
      throw new Error('Failed to Updated beer!');
    };

  } else {
  
    console.log("Beer Updated to the Beer Bible!");
    alert("Beer Updated to the Beer Bible!");
  };
    } catch (error){
       alert("Error: " + error);
    };
};
  


async function locoBeer(){
      // Specify the API endpoint for user data
//const apiUrl = beerUrl;

// Make a GET request using the Fetch API
//let headersList = {
 // "mode": "cors",
 // "Accept": "*",
 // "Content-Type": "application/json; charset=utf-8",
 // "Credentials": "true"
 //}
 
  let bodyContent = {
    name: document.getElementById("birName").value,
    type: document.getElementById("birType").value,
    information: document.getElementById("birInfo").value,
    grade: document.getElementById("birGrades").value
  };

  fetch(beerUrl, {
    method: "POST", // Specify the HTTP verb to use
    headers: {
      // Tell the server what type of data is sent
      "Content-Type": "application/json",
      },
    // Add the body with data for the new user to be added
      body: JSON.stringify(bodyContent),
  }).then(async (res) => {

    alert("Jesus Krist, förvandla mig!")
    // Is the respons ok (in the range 200-299), then the user was added.
    if (res.ok) {
      console.log('A Beer was added!');
      alert("det gick!!!")
      // Recreate the table (will fetch all users)
    }
    else {
      // Something went wrong when adding the user
      const err = await res.json();
      console.error(`Error adding user to the API. Error is: ${err.error}`);
      console.log(err.error, 'error');
    };
  }).catch((err) => {       // Catch errors from the Fetch API like 404 or 500 errors
    console.error(err.message);
    console.log('Error adding user', 'error');
  
  });
};

async function addBeer(){

  const id = document.getElementById("birName").value;
  return pitt = await fetch(beerUrl, {
  method: 'POST',
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(
    {
      "name": document.getElementById("birName").value,
      "type": document.getElementById("birType").value,
      "information": document.getElementById("birInfo").value,
      "grade": document.getElementById("birGrades").value
    }
  )}).then((res) => {
    if (!res.ok) {
    
      if (res.status === 400) {
        console.log("Bad request. Please check your input.");
        alert("Bad request. Please check your input.");
      } else if (res.status === 401) {
        console.log("Unauthorized. You are not allowed to add a beer.");
        alert("Unauthorized. You are not allowed to add a beer.");
      } else {
        console.log('Failed to add beer!');
      };
    } else {
      
      console.log("Beer added to the Beer Bible!");
      alert("Beer added to the Beer Bible!");
    }}).catch((err) => {
      alert("Error: " + err);
    });     
}; 
        

function webUrl(){
  const url = window.location.pathname;

  if (url.includes('admin')){
  
    beerGrades();
    document.getElementById("addBir").addEventListener("click", locoBeer);
    document.getElementById("upBir").addEventListener("click", upBeer);
    document.getElementById("deleBir").addEventListener("click", deleBeer);
    } else {
      loadBeers();
    };
};
  
window.addEventListener('DOMContentLoaded', webUrl); 