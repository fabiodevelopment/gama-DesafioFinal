import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
// import { Container, Button, Form } from 'react-bootstrap';

interface CadastroProps {}

const CSS_HANDLES = ['cadastroLead', 'formGroup', 'labelGroup', 'inputGroup', 'buttonGroup', 'modalOverlay'] as const


const Cadastro: StorefrontFunctionComponent<CadastroProps> = ({ }) => {
	
	const handles = useCssHandles(CSS_HANDLES)

	async function addContact() {
		const data = {
			body: {
				name: formState.name,
				email: formState.email,
				phone: formState.phone
			}
		};
		

		console.log(data);
		const apiData = await API.post('formApi', '/contact', data);
		console.log({ apiData });
		alert("Cadastro realizado com sucesso");
	}
	
	const formState = { name: '', email: '', phone: '' };
	
	function updateFormState(key: string, value: string) {
		formState[key] = value;
	}

	return (
		<>
			
			<div className={`${handles.cadastroLead}`}>
				<h2>Cadastre-se</h2>
				<h3>Para receber notificações sebre novos produtos</h3>
				<br />
				<form>
					<div className={`${handles.formGroup}`}>
						<label className={`${handles.labelGroup}`}>Nome:</label>
						<input className={`${handles.inputGroup}`} placeholder="Nome" onChange={e => updateFormState('name', e.target.value)} />
					</div>
					<div className={`${handles.formGroup}`}>
						<label className={`${handles.labelGroup}`}>Email:</label>
						<input className={`${handles.inputGroup}`} placeholder="Email" onChange={e => updateFormState('email', e.target.value)} />
					</div>
					<div className={`${handles.formGroup}`}>
						<label className={`${handles.labelGroup}`}>Telefone:</label>
						<input className={`${handles.inputGroup}`} placeholder="Telefone" onChange={e => updateFormState('phone', e.target.value)} />
					</div>
					<button className={`${handles.buttonGroup}`} onClick={addContact}>Enviar</button>
				</form>
			</div>
			<div className={`${handles.modalOverlay}`}></div>
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
