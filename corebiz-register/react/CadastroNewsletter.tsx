import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import axios from 'axios';

const CSS_HANDLES = ['cadastroNewsletter', 'formGroup', 'newsletterTitle', 'newsletterSubTitle', 'newsletterForm', 'labelGroup', 'inputGroup', 'buttonGroup', 'error', 'success'] as const


const CadastroNewsletter: StorefrontFunctionComponent = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [erro, setErro] = useState(false);
	const [success, setSuccess] = useState(false);
	
	const handles = useCssHandles(CSS_HANDLES);
	
	async function handleSubmit(e: any) {
		e.preventDefault();
		if(name === '' || email === '') {
			setErro(true);
			setSuccess(false);
		} else {

			await axios({
				method: 'post',
				url: 'https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads',
				data: {
					name,
					email,
					phone: "-",
					dateLead: new Date(),
					formOrigin: "Newsletter"
				}
			})
			setErro(false);
			setSuccess(true);
			setName('');
			setEmail('');
		}
	};

	return (
		<>	
			<div className={`${handles.cadastroNewsletter}`}>
						
				<h2 className={`${handles.newsletterTitle}`}>.newsletter</h2>
				<h3 className={`${handles.newsletterSubTitle}`}>Para receber notificações sobre novos produtos</h3>
				<br />
				
				<form className={`${handles.newsletterForm}`}>
					<div className={`${handles.formGroup}`}>
						<input className={`${handles.inputGroup}`} placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
					</div>
					<div className={`${handles.formGroup}`}>
						<input className={`${handles.inputGroup}`} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<button className={`${handles.buttonGroup}`} onClick={handleSubmit}>Enviar</button>
				</form>
				{ erro ? <p className={`${handles.error}`} >Ocorreu um erro. Tente novamente.</p> : ''}
				{ success ? <p className={`${handles.success}`} >Cadastrado realizado com sucesso</p> : ''}
			</div>
		</>
	)
}

export default CadastroNewsletter
