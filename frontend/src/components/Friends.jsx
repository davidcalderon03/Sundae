import {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import Friend from './Friend'
// import '../css/Friends.css';

import '../css/main.css';
import '../css/noscript.css';
// import '../js/breakpoints.min.js';
// import '../js/browser.min.js';
// import '../js/jquery.min.js';
// import '../js/jquery.scrollex.min.js';
// import '../js/jquery.scrolly.min.js';
// import '../js/main.js';
// import '../js/util.js';


function Friends(props) {

    let [dataLoaded, setDataLoaded] = useState(false);
    let [friendList, setFriendList] = useState([]);
    let [newFriend, setNewFriend] = useState("");

	useEffect(() => {
		(function newGreet() {
			var comments = ["Lets Rock!","I'm down","U up?","I'm ready","Squad Up!"];
			var randomGreet = Math.floor(Math.random() * comments.length);
			document.getElementById('random').innerHTML = comments[randomGreet];
		})();
	});
	function showNext(open, close) {
		// var item = document.getElementById(open);
		// var closeitem = document.getElementById(close);
		// if (item !== null && closeitem != null) {
		// 	item.style.display='block';
		// 	closeitem.style.display='none';
		// }
	};
	  
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function searchPlace(confirm) {
		if(confirm) {
		  var close = document.getElementById("nextDescription");
		  var search = document.getElementById("nextSearch");
		  var found = document.getElementById("nextFound");
		  var button = document.getElementById("mainButton");
		  if (!(close === null || search === null || found === null || button === null)) {
			

		  close.style.display='none';
		  search.style.display='block';
		  found.style.display='none';
		   button.style.display='none';
			let waiting = ""
			for (let i = 0; i < 10; i++) {
				let display = "searching";
				display = display.concat(waiting);
			  document.getElementById('replace').innerText = display;
			  // simulate delay
			  await sleep(500);
			  // check if waiting has exceeded amount
			  if (waiting.length > 2) {
				  waiting = ""
			  } else {
				  waiting = waiting.concat(".");
			  }
			}
		  search.style.display='none';
		  found.style.display='block';
		   button.style.display='block';
		  // set random place
		  var picture = [	"https://cdn.discordapp.com/attachments/1257065866902638693/1257074520624205875/sausalito.jpg?ex=66831561&is=6681c3e1&hm=9da43e2e9c9fa377b5f75ad2feb61543481b3aa2febed30477e3764272139430&",
										  "https://cdn.discordapp.com/attachments/1257065866902638693/1257076669957804196/salesforce.jpg?ex=66831761&is=6681c5e1&hm=89dcc2ecbbe04bebfc13dc512b70c001c616f4219df1e99ae36372a9e18b4c5f&",
										  "https://cdn.discordapp.com/attachments/1257065866902638693/1257078246021791764/japantown.jpg?ex=668318d9&is=6681c759&hm=f95a3536e6a5e08d8e91dd2b4e9c1bae9842c85bc9e6cb35abf1cfee8d922312&"];
		  var address = 	["1 Ferry Building",
										  "425 Mission St",
										  "1610 Geary Blvd"];
		  var friends = [	"You are going with David!",
										  "Jacob is who you will see!",
										  "Be prepared to see Stephan!",
										  "Have fun with Yash!",
										  "You are going with Zade!"]
		  var randomplace = Math.floor(Math.random() * address.length);
		   var randomfriend = Math.floor(Math.random() * friends.length);
		  document.getElementById('address').innerHTML = address[randomplace];
		  document.getElementById('whotogo').innerHTML = friends[randomfriend];
		  document.getElementById('mainImage').src = picture[randomplace];
		  }
		}
	}   



    function changeFriendInput(event) {
        setNewFriend(event.target.value);
    }
    function addFriend(args){
        console.log(args);
        fetch("http://localhost:3000/addfriend", {
            method: 'POST',
            mode: 'cors',
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({originUsername: args.originUsername, destinationUsername: args.destinationUsername})
        }).then(res => res.json())
        .then(res => {
            if(res.message === "Success"){
                alert("Success");
                window.location.reload();
            } else if (res.message === "FriendDoesNotExist") {
                alert("Friend does not exist");
            } else if (res.message === "AlreadyFriends") {
                alert("You are already friends with this person");
            }
            else{
                alert("Something went wrong");
            }
        });
    }

    function findFriends(args) {
        fetch("http://localhost:3000/findfriends", {
            method: 'POST',
            mode: 'cors',
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({originUsername: args.originUsername})
        }).then(res => res.json())
        .then(res => {
            console.log(res.message);
            if(res.message === "Success"){
                console.log("Friends loaded");
                setFriendList(res.result);
            }
            else{
                alert("Something went wrong");
            }
        });
    }

    if (!dataLoaded) {
        findFriends({originUsername: localStorage.getItem('username')});
        setDataLoaded(true);
    }

    return (
    <div className="Friends">


        {/* <p>Hi {localStorage.getItem('username')}</p>
        <p><b>Welcome to your To-Do List!</b></p>
        {friendList.map((friend, index) =>
            <Friend key={index} text={friend.destinationUsername} />
        )}
        <form className="d-flex" onSubmit={(event) => {
                    event.preventDefault();
                    addFriend({originUsername: localStorage.getItem('username'), destinationUsername: newFriend});
                }}>
            <input onChange={changeFriendInput} className="task-input" placeholder="Add a new To-Do!" />
            <button className="item-btn" type="submit">Add Item</button>
        </form> */}




	<head>
		<title>Comradery - Main</title>
		<meta charSet="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="css/main.css" />
		<noscript><link rel="stylesheet" href="css/noscript.css" /></noscript>
	</head>
	<body className="is-preload">

		{/* <!-- Sidebar --> */}
			<section id="sidebar">
				<div className="inner">
					<nav>
						<ul>
							<li><a href="#" onClick={() => {
								// showNext('nextFriends','nextGroups')
								var item = document.getElementById('nextFriends');
								var closeitem = document.getElementById('nextGroups');
								if (item !== null && closeitem != null) {
									item.style.display='block';
									closeitem.style.display='none';
								}
								}}>Friends</a></li>
							<div id="nextFriends" className="friends">
								<div className="col-6 col-12-xsmall">
									<input type="text" value="" placeholder="Add Friend" />
								</div>
								<br />
								<section>
									<div className="table-wrapper">
										<table>
											<tbody>
												{friendList.map((friend, index) =>  
													<tr><td>{friend.destinationUsername}</td></tr>
												)}
											</tbody>
										</table>
									</div>
								</section>
							</div>
							<li href="#" onClick={() => localStorage.clear()}>Logout</li>
							<li><a href="#" onClick={() => {
								// showNext('nextGroups','nextFriends')
								var item = document.getElementById('nextGroups');
		var closeitem = document.getElementById('nextFriends');
		if (item !== null && closeitem != null) {
			item.style.display='block';
			closeitem.style.display='none';
		}

							}}>Groups</a></li>
							<div id="nextGroups" className="groups">
								<div className="col-6 col-12-xsmall">
									<input type="text" value="" placeholder="Add Group" />
								</div>
								<br />
								<section>
									<div className="table-wrapper">
										<table>
											<tbody>
												<tr>
													<td>Interns</td>
												</tr>
												<tr>
													<td>San Fransico</td>
												</tr>
											</tbody>
										</table>
									</div>
								</section>
							</div>
						</ul>
					</nav>
				</div>
			</section>

		{/* <!-- Wrapper --> */}
			<div id="wrapper">
				{/* <!-- Intro --> */}
					<section id="intro" className="wrapper style1 fullscreen fade-up">
						<div className="inner">
							<div id="nextDescription" className="description">
								<h1>Comradery</h1>
								<p>Hang out with your friends without the stress of planning. Press the pair up button to begin!</p>
							</div>
							<div id="nextSearch" className="search">
								<h2 style={{color: 'rgb(158, 132, 217)'}} id="replace">searching</h2>
							</div>
							<div id="nextFound" className="found">
								<ul className="actions stacked">
									<div className="col-12"><span className="image fit"><img src="https://cdn.discordapp.com/attachments/1257065866902638693/1257074520624205875/sausalito.jpg?ex=66831561&is=6681c3e1&hm=9da43e2e9c9fa377b5f75ad2feb61543481b3aa2febed30477e3764272139430&" alt="" id="mainImage"/></span></div>
									<li><a href="#" className="button small fit" id="address"></a></li>
								</ul>
								<h3 id="whotogo"></h3>
							</div>
						</div>
						<div className="inner">
							<div id="mainButton" className="kahuna">
								<ul sytle="display: flex; align-items: center; justify-content: center;" className="actions">
									<li><a href="#" className="button large" id="random" onClick={() => {searchPlace(true);}}></a></li>
								</ul>
							</div>
						</div>
					</section>
			</div>

		{/* <!-- Footer --> */}
			<footer id="footer" className="wrapper style1-alt">
				<div className="inner">
					<ul className="menu">
						<li>&copy; Untitled. All rights reserved.</li>
					</ul>
				</div>
			</footer>
	</body>


    <Helmet>
        <script src="../js/jquery.min.js" type="text/babel"></script>
        <script src="../js/jquery.scrollex.min.js" type="text/babel"></script>
        <script src="../js/jquery.scrolly.min.js" type="text/babel"></script>
        <script src="../js/browser.min.js" type="text/babel"></script>
        <script src="../js/breakpoints.min.js" type="text/babel"></script>
        <script src="../js/util.js" type="text/babel"></script>
        <script src="../js/main.js" type="text/babel"></script>
    </Helmet>
    </div>
    );
}

export default Friends;
