async function fetchData(){
	try{
		const response=await fetch("/data");
		if(!response.ok) throw new Error("Network response was not ok");
		const data=await response.json();

		const insert_html=document.getElementById("TODO");
		tableBody.innerHTML=""; //clears existing data

		data.forEach(row=> {
				const msg=document.createElement("div");
				tr.innerHTML=`
				<td>${row.id}</td>
				<td>${row.name}</td>
				<td>${row.age}</td>`;
				insert_html.appendChild(msg);
				});
	}catch(error){
		console.error("Error fetching data: ", error);
	}
}

//fetch data when page loads
window.onload=fetchData;

// --------- FRONT END JS --------- //

//Input variables
let msgInput = document.getElementById('msg-input');
let userInput = document.getElementById('user-input');
let emailInput = document.getElementById('email-input');
let pwordInput = document.getElementById('pword-input');
let pwordConfirm = document.getElementById('pword-confirm')

//Modal variables
let firstModal = document.getElementById('first-modal');
let signupModal = document.getElementById('signup-modal');
let loginModal = document.getElementById('login-modal');

//Button variables
let msgBtn = document.getElementById('msg-btn');
let loginBtn = document.getElementById('to-login-btn');
let signupBtn = document.getElementById('to-signup-btn');
let signupSubmit = document.getElementById('signup-submit');
let loginSubmit = document.getElementById('login-submit');

//makes modal popup when website opens
firstModal.showModal();

loginBtn.addEventListener('click', function() {
    loginModal.showModal();
});

signupBtn.addEventListener('click', function() {
    signupModal.showModal();
});

