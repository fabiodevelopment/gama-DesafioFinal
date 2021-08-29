import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios';

// import { Container, Button, Form } from 'react-bootstrap';

interface CadastroProps {}

const CSS_HANDLES = ['cadastroLead', 'formGroup', 'modalTitle', 'modalSubTitle', 'labelGroup', 'inputGroup', 'buttonGroup', 'modalOverlay', 'error', 'success', 'modalImage', 'modalForm', 'modalClose'] as const


const Cadastro: StorefrontFunctionComponent<CadastroProps> = ({ }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [erro, setErro] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isLead, setIsLead] = useState(false);
	const [isProspect, setIsProspect] = useState('');
	
	const handles = useCssHandles(CSS_HANDLES);
	
	useEffect(() => {
		console.log("valor do LocalStorage", localStorage.getItem('prospect'))
		console.log("setIsLead", setIsLead);
		setIsProspect(localStorage.getItem('prospect'));

	}, [])

	async function handleSubmit(e: any) {
		e.preventDefault();
		if(name === '' || email ==='' || phone ==='') {
			setErro(true);
			setSuccess(false);
		} else {

			await axios({
				method: 'post',
				url: 'https://azzk045g2g.execute-api.us-east-2.amazonaws.com/leads',
				data: {
					name,
					email,
					phone,
					dateLead: new Date(),
				}
			})
			console.log("Cadastro realizado com sucesso");
			setErro(false);
			setSuccess(true);
			setName('');
			setEmail('');
			setPhone('');
			localStorage.setItem('prospect', JSON.stringify('prospect'))
			setIsLead(true)
		}
	};

	return (
		<>	
			<div className={`${handles.cadastroLead}`} 
			style={{display: isLead || isProspect === '"prospect"' ? "none" : "flex" }} 
			>
				<div className={`${handles.modalImage}`}></div>
				<div className={`${handles.modalForm}`}>
					
					<button className={`${handles.modalClose}`} onClick={() => setIsLead(true)}>+</button>
					
					<h2 className={`${handles.modalTitle}`}>Cadastre-se</h2>
					<h3 className={`${handles.modalSubTitle}`}>Para receber notificações sebre novos produtos</h3>
					<br />
					<form>

						{ erro ? <p className={`${handles.error}`} >Ocorreu um erro. Tente novamente.</p> : ''}
						{ success ? <p className={`${handles.success}`} >E-mail Cadastrado com sucesso</p> : ''}
						<div className={`${handles.formGroup}`}>
							<label className={`${handles.labelGroup}`}>Nome:</label>
							<input className={`${handles.inputGroup}`} placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
						</div>
						<div className={`${handles.formGroup}`}>
							<label className={`${handles.labelGroup}`}>Email:</label>
							<input className={`${handles.inputGroup}`} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
						</div>
						<div className={`${handles.formGroup}`}>
							<label className={`${handles.labelGroup}`}>Telefone:</label>
							<input className={`${handles.inputGroup}`} placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} />
						</div>
						<button className={`${handles.buttonGroup}`} onClick={handleSubmit}>Enviar</button>
					</form>
				</div>
			</div>
			<div className={`${handles.modalOverlay}`}
			style={{display: isLead || isProspect === '"prospect"' ? "none" : "block" }} 
			></div>

		</>
	)
}

Cadastro.schema = {
	title: 'editor.cadastro.title',
	description: 'editor.cadastro.description',
	type: 'object',
	properties: {},
}

export default Cadastro
