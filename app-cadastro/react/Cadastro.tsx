import React, { useState, useEffect } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import axios from 'axios';
import InputMask from 'react-input-mask';

// import { Container, Button, Form } from 'react-bootstrap';

interface CadastroProps {}

const CSS_HANDLES = ['cadastroLead', 'formGroup', 'modalTitle', 'modalSubTitle', 'labelGroup', 'inputGroup', 'buttonGroup', 'modalOverlay', 'error', 'success', 'modalImage', 'modalForm', 'modalClose'] as const


const Cadastro: StorefrontFunctionComponent<CadastroProps> = ({ }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [erro, setErro] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isLead, setIsLead] = useState(true);
	
	const handles = useCssHandles(CSS_HANDLES);
	
	useEffect(() => {
		const closeDateLS = localStorage.getItem('@corebiz/popUpCloseDate');
		const isLeadLS = localStorage.getItem('@corebiz/isLead');
		if(closeDateLS) {
			const closeDate = new Date(JSON.parse(closeDateLS));
			if(new Date().valueOf() - closeDate.valueOf() > 86400000){
				isLeadLS ? setIsLead(true) : setIsLead(false);
			} else {
				setIsLead(true);
			};
		} else {
			isLeadLS ? setIsLead(true) : setIsLead(false);
		}
	}, [])

	async function handleSubmit(e: any) {
		e.preventDefault();
		if(name === '' || email === '' || phone.match(/_/)) {
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
					formOrigin: "Pop-Up"
				}
			})
			console.log("Cadastro realizado com sucesso");
			setErro(false);
			setSuccess(true);
			setName('');
			setEmail('');
			setPhone('');
			localStorage.setItem('@corebiz/isLead', 'true');
			setTimeout(() => {setIsLead(true)},1500);
		}
	};

	function handleClose() {
		localStorage.setItem('@corebiz/popUpCloseDate', JSON.stringify(new Date()));
		setIsLead(true);
	};

	return (
		<>	
			<div className={`${handles.cadastroLead}`} 
			style={{display: isLead ? "none" : "flex" }} 
			>
				<div className={`${handles.modalImage}`}></div>
				<div className={`${handles.modalForm}`}>
					
					<button className={`${handles.modalClose}`} onClick={handleClose}>+</button>
					
					<h2 className={`${handles.modalTitle}`}>Cadastre-se</h2>
					<h3 className={`${handles.modalSubTitle}`}>Para receber notificações sobre novos produtos</h3>
					<br />
					<form>

						{ erro ? <p className={`${handles.error}`} >Ocorreu um erro. Tente novamente.</p> : ''}
						{ success ? <p className={`${handles.success}`} >Cadastrado realizado com sucesso</p> : ''}
						<div className={`${handles.formGroup}`}>
							<label className={`${handles.labelGroup}`}>Nome:</label>
							<input className={`${handles.inputGroup}`} placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
						</div>
						<div className={`${handles.formGroup}`}>
							<label className={`${handles.labelGroup}`}>E-mail:</label>
							<input className={`${handles.inputGroup}`} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
						</div>
						<div className={`${handles.formGroup}`}>
							<label className={`${handles.labelGroup}`}>Telefone:</label>
							<InputMask className={`${handles.inputGroup}`} placeholder="Telefone" value={phone} mask='(99) 99999-9999' /*maskChar=""*/ onChange={e => setPhone(e.target.value)} />
						</div>
						<button className={`${handles.buttonGroup}`} onClick={handleSubmit}>Enviar</button>
					</form>
				</div>
			</div>
			<div className={`${handles.modalOverlay}`}
			style={{display: isLead ? "none" : "block" }} 
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
