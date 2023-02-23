import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useEffect} from 'react';

function Services(){
	
	const [project, setProject] = useState([]);


	function createPost(project){
			fetch('http://localhost:4000/service/',{
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
		createPost(project)
	}

	function handleChange(e){
		setProject({...project, [e.target.name] : e.target.value})
		console.log(project)
	}
	console.log(project)
	return(
		<div>
		<Form onSubmit={submit}>
		<h2>Agendamento de serviços</h2><br/>
		<Form.Group className="mb-3" >
		  <Form.Label >Cliente</Form.Label>
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

		<Form.Label >Serviço</Form.Label>
		<Form.Select aria-label="Default select example" name="service" type="text" onChange={handleChange}>
			<option>Clique e selecione uma opção</option>
			<option value="Cabelo">Cabelo</option>
			<option value="Barba">Barba</option>
			<option value="Cabelo/Barba">Cabelo/Barba</option>
		</Form.Select><br/>

		<Form.Group className="mb-3">
		  <Form.Label>Valor</Form.Label>
		  <Form.Control name ="value" type="number" onChange={handleChange}/>
		</Form.Group>
  
		<Form.Group className="mb-3">
		  <Form.Label>Data</Form.Label>
		  <Form.Control name ="date" type="datetime-local" onChange={handleChange} />
		</Form.Group>

		{/* <Form.Group className="mb-3">
		  <Form.Label>Horário</Form.Label>
		  <Form.Control name ="date" type="time" />
		</Form.Group> */}

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

export default Services;