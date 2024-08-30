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
