import React, {useState} from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const[pseudo, setPseudo] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfirmError.innerHTML="";
        termsError.innerHTML="";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
            passwordConfirmError.innerHTML="Taper deux fois le même mot c'est si compliqué???";
            if(!terms.checked)
            termsError.innerHTML="Veuillez cocher la case!";
        } else {
            await axios({
                method:"post",
                url: `http://localhost:5000/api/user/register`,
                data: {
                    pseudo: pseudo.toUpperCase(),
                    email,
                    password
                }
            })
            .then((res) => {
                if(res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                  setFormSubmit(true);
                }

            })
            .catch((err) => console.log('Signup-error ' + err));
        }
    }

    return (
      <>
        {formSubmit ? (
          <>
            <SignInForm />
            <span></span>
            <h4 className="success">Ça y est tu es dans la team, maintenant</h4>
          </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              id="pseudo"
              name="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              autoComplete="off"
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de Passe</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer Mot de Passe</label>
            <br />
            <input
              type="password"
              id="password-conf"
              name="password"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" id="conditions">
              Accepte les{" "}
              <a href="/" target="_blank" rel="noopener, noreferrer">
                Conditions Générales
              </a>
              , tu seras gentil!
            </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="Inscris-toi" />
          </form>
        )}
      </>
    );
};

export default SignUpForm;