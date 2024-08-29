async function fetch_data(){
	try{
		const response=await fetch("/data");
		if(!response.ok) throw new Error("Network response was not ok");
		const data=await response.json();

		const tableBody=document.getElementById("show_rows_from_table00");
		tableBody.innerHTML=""; //clears existing data

		data.forEach(row=> {
				const tr=document.createElement("tr");
				tr.innerHTML=`
				<td>${row.id}</td>
				<td>${row.name}</td>
				<td>${row.age}</td>`;
				tableBody.appendChild(tr);
				});
	}catch(error){
		console.error("Error fetching data: ", error);
	}
}

//fetch data when page loads
window.onload=fetch_data;
