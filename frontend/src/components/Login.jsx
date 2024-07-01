import {useState} from "react";
import {Helmet} from "react-helmet";
// import '../css/Login.css';

import '../css/main.css';
import '../css/noscript.css';
// import '../js/breakpoints.min.js';
// import '../js/browser.min.js';
// import '../js/jquery.min.js';
// import '../js/jquery.scrollex.min.js';
// import '../js/jquery.scrolly.min.js';
// import '../js/main.js';
// import '../js/util.js';

function Login(props) {
    let [usernameInput, setUsernameInput] = useState("");
    let [passwordInput, setPasswordInput] = useState("");

    function changeUsernameInput(event) {
        setUsernameInput(event.target.value);
    }
    function changePasswordInput(event) {
        setPasswordInput(event.target.value);
    }

    function submitUser(event) {
        event.preventDefault();
        if (usernameInput === "") {
            alert("Empty username!");
        } else if (passwordInput === "") {
            alert("Empty password!");
        } else {
            login({username: usernameInput, password: passwordInput});
        }
    }

    function login(args){  //for doing a post request
        console.log(args);
        fetch("http://localhost:3000/loginuser", {
            method: 'POST',
            mode: 'cors',
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({username: args.username, password: args.password}) //accept is not necessary
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.message === "Success"){
                localStorage.setItem('username', usernameInput);
                window.location.reload();
                alert("Success");
            }
            else{
                alert("Something went wrong");
            }
        });
    }

  return (
    <div className="Login">
        {/* <form className="d-flex" onSubmit={submitUser}>
            <input onChange={changeUsernameInput} className="username-input" placeholder="Enter your name!" /> <br />
            <input onChange={changePasswordInput} className="password-input" placeholder="Enter your password!" /> <br />
            <button className="login-btn" type="submit">Start</button>
        </form> */}
    <head>
        <title>Comradery Login</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="css/main.css" />
        <noscript><link rel="stylesheet" href="css/noscript.css" /></noscript>
    </head>
    <body className="is-preload">

        {/* <!-- Wrapper --> */}
        <div id="wrapper">
            <section id="main" className="wrapper">
                <div className="full">
                    <form onSubmit={submitUser}>
                        <h1 className="major">Enter Comradery</h1>
                        <p>
                            Friends on a website can create a sense of community and belonging, which keeps users engaged and coming back. This can be through features like social forums, messaging, or even just following each other's activity.
                            People are more likely to use a site where they feel connected to others.
                        </p>
                        <div className="row gtr-uniform">
                            <div className="col-6 col-12-xsmall">
                                <input type="text" name="demo-name" id="demo-name" value={usernameInput} placeholder="Name" onChange={changeUsernameInput} />
                            </div>
                            <div className="col-6 col-12-xsmall">
                                <input type="text" name="demo-email" id="demo-email" value={passwordInput} placeholder="Email" onChange={changePasswordInput} />
                            </div>
                        </div>
                        <br/>
                        <div className="col-6 col-12-medium">
                            <ul className="actions stacked">
                                <li><button href="index.html" className="button fit" type="submit">Login</button></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </section>
        </div>

    <Helmet>
        <script src="../js/jquery.min.js" type="text/babel"></script>
        <script src="../js/jquery.scrollex.min.js" type="text/babel"></script>
        <script src="../js/jquery.scrolly.min.js" type="text/babel"></script>
        <script src="../js/browser.min.js" type="text/babel"></script>
        <script src="../js/breakpoints.min.js" type="text/babel"></script>
        <script src="../js/util.js" type="text/babel"></script>
        <script src="../js/main.js" type="text/babel"></script>
    </Helmet>

    </body>
    </div>
  );
}

export default Login;
