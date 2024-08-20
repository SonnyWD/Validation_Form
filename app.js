/* stockage du formulaire et initialisation de la fonction à l'évenement submit
 A l'intérieur je créer un objet pour stocker les entrées de l'utilisateur
 J'apelle ainsi toutes mes fonctions qui gérent chaque validation d'input
 */

const form = document.querySelector("form")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    const formData = {
        name: document.querySelector("input#name").value,
        email: document.querySelector("input#email").value,
        password: document.querySelector("input#password").value,
        confirmPassword: document.querySelector("input#confirm-password").value
    }

    handleValidationName(formData.name)
    handleValidationEmail(formData.email)
    handleValidationPassword(formData.password)
    handleValidationConfirmPassword(formData.password, formData.confirmPassword)

}

function showValidation({index, validation}){
    if(validation){
        allImgErrors[index].style.display = "inline"
        allImgErrors[index].src = "ressources/check.svg"
    }
    else {
        allImgErrors[index].style.display = "inline"
        allImgErrors[index].src = "ressources/error.svg"
    }
}

// J'initialise la fonction qui gére l'input name et gére la validation avec une regex

const allImgErrors = document.querySelectorAll(".img-validation")

function handleValidationName(name){

    const errorMsgName = document.querySelector("#error-name");
    const regexName = /[A-Za-z\s]+/;

    if(name.length < 3 || !regexName.test(name)){
        errorMsgName.textContent = `Entrez au moins 3 caractères de type lettre dans le champ.`;
        allImgErrors[0].style.display = "inline";
        allImgErrors[0].src = "ressources/error.svg";
    }
}

const nameInput = document.querySelector(".group-inputs:nth-child(1) input")
nameInput.addEventListener("blur", userValidation)
nameInput.addEventListener("input", userValidation)

function userValidation(){

    if(nameInput.value.length >= 3){
        showValidation({index: 0, validation: true})
    }
    else {
        showValidation({index: 0, validation: false})
    }
}

// J'initialise la fonction qui gére l'input mail et gére la validation avec une regex

const regexEmail = /^[\w-\.]+@([\w-]+\.)[\w]{2,4}$/;

function handleValidationEmail(email){

    const errorMsgEmail = document.querySelector("#error-email")

    if(!regexEmail.test(email)){
        errorMsgEmail.textContent = `Votre email n'est pas valide.`;
        allImgErrors[1].style.display = "inline";
        allImgErrors[1].src = "ressources/error.svg";
    }
}

const emailInput = document.querySelector(".group-inputs:nth-child(2) input")

emailInput.addEventListener("blur", emailValidation)
emailInput.addEventListener("input", emailValidation)

function emailValidation(){

    if(regexEmail.test(emailInput.value)){
        showValidation({index: 1, validation: true})
    }
    else {
        showValidation({index: 1, validation: false})
    }
}
// J'initialise la fonction qui gére l'input password et gére la validation avec une regex

const passwordRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{9,}$/;

function handleValidationPassword(password){

    if(!passwordRegex.test(password)){
        allImgErrors[2].style.display = "inline";
        allImgErrors[2].src = "ressources/error.svg";
    }
}

const passwordInput = document.querySelector("input#password")
passwordInput.addEventListener("blur", passwordValidation)
passwordInput.addEventListener("input", passwordValidation)

function passwordValidation(){

    if(passwordRegex.test(passwordInput.value)){
        showValidation({index: 2, validation: true})
    }
    else {
        showValidation({index: 2, validation: false})
    }
}
// J'initialise la fonction qui gére l'input de confirmation du mot de passe et gére la validation en comparant l'input mot de passe et l'input de confirmation


function handleValidationConfirmPassword(password, confirmation){
    
    const errorMsgConfirmPassword = document.querySelector("#error-confirm-password")

    if(password !== confirmation){
        errorMsgConfirmPassword.textContent = `Votre mot de passe ne correspond pas.`
        allImgErrors[3].style.display = "inline";
        allImgErrors[3].src = "ressources/error.svg"; 
    }
    if(confirmation === ""){
        allImgErrors[3].style.display = "inline";
        allImgErrors[3].src = "ressources/error.svg";
    }
}

const passwordConfirmInput = document.querySelector("input#confirm-password")
passwordConfirmInput.addEventListener("blur", confirmValidation)
passwordConfirmInput.addEventListener("input", confirmValidation)

function confirmValidation(){

    if(passwordInput.value === passwordConfirmInput.value){
        showValidation({index: 3, validation: true})
    }
    else {
        showValidation({index: 3, validation: false})
    }

    if(passwordConfirmInput.value === ""){
        allImgErrors[3].style.display = "inline";
        allImgErrors[3].src = "ressources/error.svg";
    }

    if(passwordInput.value !== passwordConfirmInput.value){
        allImgErrors[3].style.display = "inline";
        allImgErrors[3].src = "ressources/error.svg"; 
    }
}

// Ici je gére dynamiquement l'affichage des messages d'érreur pour les effacer dés que l'utilisateur écrit dans un input

const inputGroup = document.querySelectorAll("input")
inputGroup.forEach(el => el.addEventListener("input", handleErrors))

function handleErrors(){

    const handleErrorsMsg = document.querySelectorAll(".error-msg");

    handleErrorsMsg.forEach(msg => msg.textContent = "");

}

// Enfin dans cette dernière partie je vais gérer l'affichage de la force du mdp en fonction des entrées de l'utilisateur 

const redBloc = document.querySelector(".red-bloc")
const orangeBloc = document.querySelector(".orange-bloc")
const greenBloc = document.querySelector(".green-bloc")

//  Je commence par faire disparaitre les blocs de couleur

function hideBlocks() {
    redBloc.style.display = "none";
    orangeBloc.style.display = "none";
    greenBloc.style.display = "none";
}

// Ensuite dans ma fonction je compare les situations en fonction du mot de passe le plus sécure (donc qui remplit toute les conditions) au mot de passe le moins sécure, pour ainsi afficher les barres de rouge à vert

function passwordPower(password){

    const length = password.length;
    const hasNumbers = /\d+/g.test(password);
    const hasSymbols = /[!@#\$%\^\&*\)\/\(+=._-]+/g.test(password);

    // Je réinitialise l'affichage des blocs 
    hideBlocks();

    // Block vert 
    if (length >= 9 && hasNumbers && hasSymbols){

        greenBloc.style.display = "block";
        orangeBloc.style.display = "block";
        redBloc.style.display = "block";
    }

    // Block orange
    else if ((length >= 6 && (hasNumbers || hasSymbols)) || ( hasNumbers && ( length >= 6|| hasSymbols)) || ( hasSymbols && ( length >= 6|| hasNumbers))){

        orangeBloc.style.display = "block";
        redBloc.style.display = "block";
    }

    // Block rouge
    else if(length >= 6 || (hasNumbers || hasSymbols)){

        redBloc.style.display = "block";
    }

}

//  Je créer un évenement de type input pour gérer dynamiquement les entrées de l'utilisateur dans l'input mdp en apellant ma fonction passwordPower et ainsi modifier l'affichage des barres de couleurs 

passwordInput.addEventListener("input", handlePasswordPower) 

function handlePasswordPower(){
    passwordPower(passwordInput.value)
}

//  la fonction hideBlocks masque les blocs de couleur lors du chargement de la page
hideBlocks();

// J'ajoute une animation au click sur le boutton pour l'UX et montrer à l'utilisateur s'il y a encore une erreur sinon j'envoie une alert pour lui dire que les données sont envoyées correctement 

const submitButton = document.querySelector("button")
const container = document.querySelector(".container")

submitButton.addEventListener("click", handleClick)

function handleClick(){

    let hasEmptyInput = false;

    inputGroup.forEach(input => {
        if(input.value === ""){
            hasEmptyInput = true;
        }
    })
    if(hasEmptyInput){
        container.classList.add("shake")

        setTimeout(() => {
        container.classList.remove("shake")
        }, 500);
    }
    else {
        alert("Données envoyées avec succès.")
    }
}