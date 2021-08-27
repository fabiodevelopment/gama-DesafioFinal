import React, {useState} from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios';
// import { Container, Button, Form } from 'react-bootstrap';

interface CadastroProps {}

const CSS_HANDLES = ['cadastroLead', 'formGroup', 'labelGroup', 'inputGroup', 'buttonGroup', 'modalOverlay'] as const


const Cadastro: StorefrontFunctionComponent<CadastroProps> = ({ }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	
	const handles = useCssHandles(CSS_HANDLES);

	async function handleSubmit() {
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

		alert("Cadastro realizado com sucesso");
	};

	return (
		<>
			
			<div className={`${handles.cadastroLead}`}>
				<h2>Cadastre-se</h2>
				<h3>Para receber notificações sebre novos produtos</h3>
				<br />
				<form>
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
