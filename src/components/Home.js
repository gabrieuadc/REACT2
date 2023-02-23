import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


function Home(){

	const [project, setProject] = useState([]);
	const navigate = useNavigate();

	function handleChange(e){
		setProject({...project, [e.target.name] : e.target.value})
	}

	function submit() {
		createPost1(project);
	}

	function createPost1(project){
		fetch('http://localhost:4000/login/user',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(project)
		})
		.then((resp) => {if (resp.ok) navigate('/Empregados')})
		.catch((err) => {console.log(err)})

};


	return(
		<div>
		<h2>Bem vindo ao melhor APP de gestão de serviços</h2>
		<Form >
		<Form.Group className="mb-3" >
		<Form.Label >E-mail</Form.Label>
		<Form.Control name="email" type="email" onChange={handleChange}/>
		<Form.Text className="text-muted" >
		  Email de acesso.
		</Form.Text>
	  </Form.Group>

	  <Form.Group className="mb-3" >
		<Form.Label >Senha</Form.Label>
		<Form.Control name="password" type="password" onChange={handleChange}/>
		<Form.Text className="text-muted">
		  Senha.
		</Form.Text>
	  </Form.Group>
	  <Button variant="primary" onClick={()=>submit()}>
		  Login
		</Button>
		</Form>
	  </div>
	);
}

export default Home;