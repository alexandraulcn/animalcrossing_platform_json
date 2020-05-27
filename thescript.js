function solicitare()
		{
			adresa = "http://localhost:4000/game?callback=?"
			$.getJSON(adresa, function(raspuns)
			{
				/**$.each(raspuns,function(id,game)
				{
					continut="<div><i>"+game.name+"</i></div>"
					$(continut).appendTo(document.body)
				})**/
				//slocalstorage.setItem("Games", JSON.stringify(raspuns));
				
				for(var i = 0; i < raspuns.length; i++){
					
					/*var div = document.getElementById('sectionA');

					var listIfExists = div.getElementsByTagName("li");
					for(var i = 0; i < listIfExists.length; i++)
					{
						if (document.getElementById(listIfExists[i]).innerHTML == raspuns[i].name){
							break;
						}
					}*/
					continut="<li id = "+ raspuns[i].id + " onclick = getCharacters(id)>" + raspuns[i].name + "</li>"
					//$(continut).appendTo(document.body)
					$("#gamesList").append(continut);    
				}			
			})
		
			document.getElementById("onlyonce").disabled=true;
		}
		

	function sendinfo(){
		let name = document.querySelector('#name').value;
		let species = document.querySelector('#species').value;
		let personality = document.querySelector('#personality').value;
		let gameId = document.querySelector('#gameId').value;
		let img = document.querySelector('#img').value;
		let about = document.querySelector('#about').value;
		let gender = document.querySelector('#gender').value;
	
		if(name === ''){
			alert("Empty field!")
		}
		
		else{
			proprietati = {"name": name, "gender": gender, "species": species, "personality":personality, "birthday": "-", "gameId": gameId, "img": img, "about":about}
			serializare = JSON.stringify(proprietati)
			config = {url:"http://localhost:4000/characters", type: "POST", data: serializare, contentType:"application/json", success: correctinfo}
			$.ajax(config)
		}
	}
	
	function correctinfo(request){
		alert('Characted added!');
	}

	function removecharacter(id){
		$.ajax({
			url: 'http://localhost:4000/characters/' + id,
			type: 'DELETE',
			contentType: 'application/json',
			success: function(result) {
				location.reload();
			},
			error: function(request,msg,error) {
				// handle failure
			}
		}
		);
	}
	
	/*function myFunction() {
		var x = document.getElementById("sectionB");
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	} */

		
	function getCharacters(id){
			//var games = JSON.parse(localstorage.getItem("Games");
			
			document.querySelector('#sectionB').innerHTML='';
			var div = document.getElementById('sectionB');
					
			adresa = "http://localhost:4000/characters?callback=?"
			list = " <ul id = cList" + id + "></ul>"
			$(list).appendTo(div)
			$.getJSON(adresa, function(raspuns)
			{
				for(var i = 0; i < raspuns.length; i++){
					if(id == raspuns[i].gameId){
						continut = "<table id = "+ raspuns[i].id + ">" + "<tr>" + "<td>" + "<img src = " + raspuns[i].img + ">" + "</td>" + "<td width='80%'>" + "<input id =" + raspuns[i].id + " type = 'submit' class = 'remove' onclick = 'removecharacter(this.id)' value = 'Remove'>" + "</td>" +"</tr>" + "<tr>" + "<td>" + 'Name' + "</td>" + "<td>" + raspuns[i].name + "</td>" + "<tr>" + "<td>" + 'Gender' + "</td>" + "<td>" + raspuns[i].gender + "</td>" + "<tr>" + "<td>" + 'Species' + "</td>" + "<td>" + raspuns[i].species + "</td>" + "</tr>" + "<tr>" + "<td>" + 'Personality' + "</td>" + "<td>" + raspuns[i].personality + "</td>" + "</tr>" + "<tr>" + "<td>" + 'Birthday' + "</td>" + "<td>" + raspuns[i].birthday + "</td>" + "</tr>" + "<tr>" + "<td>" + 'About' + "</td>" + "<td>" + raspuns[i].about + "</td>" + "</tr>" + "</table>"
						// creare buton de delete + delete functiotu cu id u ca paramaetru
						 
						$("#cList" + id).append(continut); 
					}
				}
			});	
	}
	