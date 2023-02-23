import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';

function DR(){

	const [project, setProject] = useState([]);

	function postDesp(project){
		fetch('http://localhost:4000/despesa/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project)
		})
		.then((resp) => resp.json())
		.then((data) => {
			alert("Cadatrado com Sucesso")
		})
		.catch((err) => console.log(err))
};

function submit(e) {
	e.preventDefault()
	postDesp(project)
}

function handleChange(e){
	setProject({...project, [e.target.name] : e.target.value})
	console.log(e.target.value)
}


	return(
		<div>
		<Form onSubmit={submit}>
		<h2>Despesas- Cadastro</h2><br/>
		<Form.Group className="mb-3" >
		  <Form.Label >Fornecedor</Form.Label>
		  <Form.Control name ="name" type="text" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Nome completo.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label >Telefone</Form.Label>
		  <Form.Control name ="contact" type="number" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Telefone de contato.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" >
		  <Form.Label>Despesa</Form.Label>
		  <Form.Control name ="service" type="text" onChange={handleChange}/>
		  <Form.Text className="text-muted">
			Despesas realizadas.
		  </Form.Text>
		</Form.Group>
	
		<Form.Group className="mb-3">
		  <Form.Label>Valor</Form.Label>
		  <Form.Control name ="value" type="number" onChange={handleChange}/>
		</Form.Group>
  
		<Form.Group className="mb-3">
		  <Form.Label>Data</Form.Label>
		  <Form.Control name ="date" type="date" onChange={handleChange} />
		</Form.Group>
	

		<Form.Group className="mb-3" controlId="formBasicCheckbox">
		  <Form.Check type="checkbox" label="Check" />
		</Form.Group>
		<Button variant="primary" type="submit">
		  Salvar
		</Button>
	  </Form>
	  </div>

	);
}

export default DR;