export class Client{

    constructor(id, name, surname, age, username, password){
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.age=age;
        this.username=username;
        this.password=password;
        this.kont=null;
    }
    Draw(host)
    {

        let title=document.createElement("h1");
        title.innerHTML="WELCOME";
        host.appendChild(title);

        this.kont=document.createElement("div");
        this.kont.className="main";
        host.appendChild(this.kont);
        

        let clientDiv=document.createElement("div");
        clientDiv.className="clientDiv";
        this.kont.appendChild(clientDiv);


        let btnClient = document.createElement("button");
        btnClient.className = "btnClient";
        btnClient.innerHTML = "LOG IN";
        btnClient.onclick=(ev)=>this.showLoginPopUp(host);
        clientDiv.appendChild(btnClient);
        
    }

    showLoginPopUp(host) {
        const popupDiv = document.createElement("div");
        popupDiv.className = "login-popup";
    
        popupDiv.innerHTML = `
            <h2>Login</h2>
            <!-- Add your login form or any other content here -->
        `;
    
        popupDiv.style.position = "fixed";
        popupDiv.style.top = "50%";
        popupDiv.style.left = "50%";
        popupDiv.style.transform = "translate(-50%, -50%)";
        popupDiv.style.padding = "20px";
        popupDiv.style.border = "1px solid #ccc";
        popupDiv.style.backgroundColor = "#fff";
        popupDiv.style.zIndex = "1000";
        

        let divUserName= document.createElement("div");
        divUserName.className="divUserName";
        popupDiv.appendChild(divUserName);

        var usernameLabel =  document.createElement("label");
        usernameLabel.innerHTML="Username";
        divUserName.appendChild(usernameLabel);

        var usernameText = document.createElement("input");
        usernameText.type="text";
        usernameText.className = "userNameClass";
        divUserName.appendChild(usernameText);


        let divPassword= document.createElement("div");
        divPassword.className="divPassword";
        popupDiv.appendChild(divPassword);

        var passwordLabel =  document.createElement("label");
        passwordLabel.innerHTML="Password";
        divPassword.appendChild(passwordLabel);

        var passwordText = document.createElement("input");
        passwordText.type="text";
        passwordText.className = "passwordClass";
        divPassword.appendChild(passwordText);

        let btnLogIn = document.createElement("button");
        btnLogIn.className = "btnLogIn";
        btnLogIn.innerHTML = "OK";
        btnLogIn.onclick=(ev)=>this.ClientPage();
        popupDiv.appendChild(btnLogIn);

        document.body.appendChild(popupDiv);
    }
    
    ClientPage()
    {
        
        let usernameInput = document.querySelector(".userNameClass");
        var y=usernameInput.value;
        
        let passwordInput = document.querySelector(".passwordClass");
        var z=passwordInput.value;
        
        console.log(y);
        console.log(z);

        fetch("https://localhost:5001/Client/Login/"+y+"/"+z,{
            method: "GET"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Nije moguće izvršiti prijavljivanje.');
                alert("GRESKA");
            }
        }).then(data => {
            console.log(data);
            if (data === true) {
                alert("User successfully logged in.");
                this.NewWindow();
            } else {          
                alert("Incorrect username or password.");
            }
        });

    }
    NewWindow()
    {
        const newWindow = window.open("", "_blank");
        
        //Name
        let divName= document.createElement("div");
        divName.className="divInfo";
        newWindow.document.body.appendChild(divName);

        var nameLabel =  document.createElement("label");
        nameLabel.innerHTML="Name";
        divName.appendChild(nameLabel);

        var nameText = document.createElement("input");
        nameText.type="text";
        nameText.className = "nameTextClass";
        divName.appendChild(nameText);
        
        //Surname
        let divSurname= document.createElement("div");
        divSurname.className="divInfo";
        newWindow.document.body.appendChild(divSurname);

        var SurnameLabel =  document.createElement("label");
        SurnameLabel.innerHTML="Surname";
        divSurname.appendChild(SurnameLabel);

        var SurnameText = document.createElement("input");
        SurnameText.type="text";
        SurnameText.className = "SurnameText";
        divSurname.appendChild(SurnameText);

        //Age
        let divAge= document.createElement("div");
        divAge.className="divInfo";
        newWindow.document.body.appendChild(divAge);

        var AgeLabel =  document.createElement("label");
        AgeLabel.innerHTML="Age";
        divAge.appendChild(AgeLabel);

        var AgeText = document.createElement("input");
        AgeText.type="number";
        AgeText.className = "ageText";
        divAge.appendChild(AgeText);

        //Dugme za unos informacija klijenta
        let btnClientInfo = document.createElement("button");
        btnClientInfo.className = "btnClientInfo";
        btnClientInfo.innerHTML = "OK";
        btnClientInfo.onclick=()=>{
            newWindow.console.log("Button clicked");
            
            this.PutInfoClient(newWindow);}
        newWindow.document.body.appendChild(btnClientInfo);
    }
    PutInfoClient(newWindow)
    {
        let NameInput = newWindow.document.querySelector(".nameTextClass");
        var x=NameInput.value;
        
        let SurnameInput = newWindow.document.querySelector(".SurnameText");
        var y=SurnameInput.value;
        newWindow.console.log(y);
        
        let AgeInput = newWindow.document.querySelector(".ageText");
        var z=AgeInput.value;
        newWindow.console.log(z);

        newWindow.fetch("https://localhost:5001/Client/AddClientInfo/"+1+"/"+x+"/"+y+"/"+z,{
            method: "POST"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Nije moguće.');
            }
        }).then(data => {
            console.log(data);
            if (data) {
                newWindow.alert("Uspesno promenjeno.");
            } else {          
                newWindow.alert("Incorrect.");
            }
        });
    }
}